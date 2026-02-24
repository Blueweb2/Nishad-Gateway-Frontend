"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { UploadCloud, Trash2 } from "lucide-react";

import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

type BlogStatus = "draft" | "published";

/* ================= SLUG HELPER ================= */
const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function CreateBlogPage() {
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_URL;

  /* ================= STATES ================= */

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugEdited, setIsSlugEdited] = useState(false);

  const [excerpt, setExcerpt] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [coverAlt, setCoverAlt] = useState("");
  const [coverPublicId, setCoverPublicId] = useState<string | null>(null);

  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [status, setStatus] = useState<BlogStatus>("draft");

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  /* ================= IMAGE UPLOAD ================= */

  const handleImageUpload = async (file: File) => {
    if (uploading) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }

    try {
      setUploading(true);
      toast.loading("Uploading image...", { id: "upload" });

      const uploaded = await uploadToCloudinarySigned(
        file,
        "nishad-gateway/blogs"
      );

      const optimizedUrl = cloudinaryAutoWebp(
        uploaded.secure_url
      );

      setCoverUrl(optimizedUrl);
      setCoverPublicId(uploaded.public_id);

      toast.success("Image uploaded", { id: "upload" });
    } catch (err: any) {
      toast.error(err.message || "Upload failed", {
        id: "upload",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setCoverUrl("");
    setCoverPublicId(null);
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !slug || !excerpt || !coverUrl || !content) {
      setError(
        "Title, Slug, Excerpt, Cover Image and Content are required."
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API}/blogs/admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title,
          slug, // ✅ SEND SLUG
          excerpt,
          content,
          status,
          tags: tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),

          coverImage: {
            url: coverUrl,
            alt: coverAlt || title,
          },

          metaTitle: metaTitle || title,
          metaDescription:
            metaDescription || excerpt,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast.success("Blog created successfully");
      router.push("/admin/blogs");

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold text-white mb-8">
        Create Blog
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white/5 border border-white/10 rounded-2xl p-8"
      >
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* TITLE */}
        <Input
          label="Title *"
          value={title}
          onChange={(e) => {
            const value = e.target.value;
            setTitle(value);

            if (!isSlugEdited) {
              setSlug(slugify(value));
            }
          }}
        />

        {/* SLUG */}
        <div>
          <Input
            label="Slug *"
            value={slug}
            onChange={(e) => {
              setIsSlugEdited(true);
              setSlug(slugify(e.target.value));
            }}
            disabled={!title}
          />

          <p className="text-xs text-white/50 mt-1">
            {isSlugEdited
              ? "Manually edited"
              : "Auto-generated from title"}
          </p>
        </div>

        {/* EXCERPT */}
        <Textarea
          label="Excerpt *"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />

        {/* IMAGE UPLOAD */}
        <div>
          <p className="text-sm text-white/70 mb-2">
            Cover Image *
          </p>

          <label
            className={`px-4 py-2 rounded-lg border text-sm font-semibold cursor-pointer transition ${
              uploading
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-white/10 hover:bg-white/20 border-white/10 text-white"
            }`}
          >
            <UploadCloud className="w-4 h-4 inline mr-2" />
            {uploading ? "Uploading..." : "Upload Image"}

            <input
              type="file"
              hidden
              accept="image/*"
              disabled={uploading}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
                e.target.value = "";
              }}
            />
          </label>

          {coverUrl && (
            <div className="relative mt-4 h-56 rounded-xl overflow-hidden border border-white/10">
              <Image
                src={coverUrl}
                alt="Preview"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-3 right-3 bg-black/70 hover:bg-black text-white p-2 rounded-full"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>

        <Input
          label="Cover Image Alt Text"
          value={coverAlt}
          onChange={(e) => setCoverAlt(e.target.value)}
        />

        <Input
          label="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <Textarea
          label="Content (HTML allowed) *"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* STATUS */}
        <div>
          <label className="block text-sm text-white/70 mb-2">
            Status
          </label>
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as BlogStatus)
            }
            className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </main>
  );
}

/* ================= REUSABLE INPUTS ================= */

function Input({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
}) {
  return (
    <div>
      <label className="block text-sm text-white/70 mb-2">
        {label}
      </label>
      <input
        {...props}
        className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white"
      />
    </div>
  );
}

function Textarea({
  label,
  rows = 4,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-sm text-white/70 mb-2">
        {label}
      </label>
      <textarea
        rows={rows}
        {...props}
        className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white"
      />
    </div>
  );
}