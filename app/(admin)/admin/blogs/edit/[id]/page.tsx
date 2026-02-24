"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type BlogStatus = "draft" | "published";

type Blog = {
  _id: string;
  title: string;
  slug: string; // ✅ Added
  excerpt: string;
  coverImage: {
    url: string;
    alt: string;
  };
  tags: string[];
  content: string;
  status: BlogStatus;
  metaTitle?: string;
  metaDescription?: string;
};

/* ================= SLUG HELPER ================= */
const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState(""); // ✅ Added
  const [isSlugEdited, setIsSlugEdited] = useState(false);

  const [excerpt, setExcerpt] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [coverAlt, setCoverAlt] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<BlogStatus>("draft");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  /* ---------------- Fetch Blog ---------------- */

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const res = await fetch(
          `${API}/blogs/admin/${id}`,
          { credentials: "include" }
        );

        if (!res.ok) throw new Error("Blog not found");

        const blog: Blog = await res.json();

        setTitle(blog.title);
        setSlug(blog.slug); // ✅ Load slug
        setExcerpt(blog.excerpt);
        setCoverUrl(blog.coverImage?.url || "");
        setCoverAlt(blog.coverImage?.alt || "");
        setTags(blog.tags?.join(", ") || "");
        setContent(blog.content);
        setStatus(blog.status);
        setMetaTitle(blog.metaTitle || "");
        setMetaDescription(blog.metaDescription || "");
      } catch (err: any) {
        setError(err.message);
      } finally {
        setFetching(false);
      }
    };

    fetchBlog();
  }, [id, API]);

  /* ---------------- Auto Slug From Title ---------------- */

  useEffect(() => {
    if (!isSlugEdited) {
      setSlug(slugify(title));
    }
  }, [title, isSlugEdited]);

  /* ---------------- Submit ---------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${API}/blogs/admin/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            title,
            slug, // ✅ Send slug
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
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Update failed"
        );
      }

      router.push("/admin/blogs");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="p-10 text-white text-center">
        Loading blog...
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold text-white mb-8">
        Edit Blog
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
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* SLUG */}
        <div>
          <Input
            label="Slug"
            value={slug}
            onChange={(e) => {
              setIsSlugEdited(true);
              setSlug(slugify(e.target.value));
            }}
          />
          <p className="text-xs text-white/50 mt-1">
            {isSlugEdited
              ? "Manually edited"
              : "Auto-generated from title"}
          </p>
        </div>

        <Textarea
          label="Excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />

        <Input
          label="Cover Image URL"
          value={coverUrl}
          onChange={(e) => setCoverUrl(e.target.value)}
        />

        <Input
          label="Cover Image Alt"
          value={coverAlt}
          onChange={(e) => setCoverAlt(e.target.value)}
        />

        <Input
          label="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

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

        <Textarea
          label="Content"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="border-t border-white/10 pt-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            SEO Settings
          </h2>
          <Input
            label="Meta Title"
            value={metaTitle}
            onChange={(e) =>
              setMetaTitle(e.target.value)
            }
          />
          <Textarea
            label="Meta Description"
            value={metaDescription}
            onChange={(e) =>
              setMetaDescription(e.target.value)
            }
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </main>
  );
}

/* Reusable Inputs */

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