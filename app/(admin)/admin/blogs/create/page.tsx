"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { UploadCloud, Trash2 } from "lucide-react";
import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

type BlogStatus = "draft" | "published";

type Block =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; url: string; alt: string }
  | { type: "table"; headers: string[]; rows: string[][] };

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function CreateBlogPage() {
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_URL;

  /* ================= BASIC INFO ================= */

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugEdited, setIsSlugEdited] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState<BlogStatus>("draft");

  /* ================= SEO ================= */

  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  /* ================= COVER IMAGE ================= */

  const [coverUrl, setCoverUrl] = useState("");
  const [coverAlt, setCoverAlt] = useState("");
  const [uploading, setUploading] = useState(false);

  /* ================= BLOCKS ================= */

  const [blocks, setBlocks] = useState<Block[]>([]);

  const addBlock = (block: Block) =>
    setBlocks((prev) => [...prev, block]);

  const updateBlock = (index: number, newBlock: Block) => {
    const copy = [...blocks];
    copy[index] = newBlock;
    setBlocks(copy);
  };

  const removeBlock = (index: number) => {
    setBlocks((prev) => prev.filter((_, i) => i !== index));
  };

  /* ================= IMAGE UPLOAD ================= */

  const handleCoverUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files allowed");
      return;
    }

    try {
      setUploading(true);
      toast.loading("Uploading...", { id: "upload" });

      const uploaded = await uploadToCloudinarySigned(
        file,
        "nishad-gateway/blogs"
      );

      setCoverUrl(cloudinaryAutoWebp(uploaded.secure_url));

      toast.success("Uploaded", { id: "upload" });
    } catch {
      toast.error("Upload failed", { id: "upload" });
    } finally {
      setUploading(false);
    }
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !excerpt || !coverUrl || blocks.length === 0) {
      toast.error("All required fields must be filled.");
      return;
    }

    try {
      const res = await fetch(`${API}/blogs/admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          status,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
          coverImage: {
            url: coverUrl,
            alt: coverAlt || title,
          },
          metaTitle: metaTitle || title,
          metaDescription: metaDescription || excerpt,
          blocks: blocks.map((b) => ({
            type: b.type,
            data: b,
          })),
        }),
      });

      if (!res.ok) throw new Error("Creation failed");

      toast.success("Blog created!");
      router.push("/admin/blogs");
    } catch {
      toast.error("Something went wrong");
    }
  };

  /* ================= UI ================= */

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-white">
      <h1 className="text-3xl font-semibold mb-8">Create Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* TITLE */}
        <Input
          label="Title *"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
            if (!isSlugEdited)
              setSlug(slugify(e.target.value));
          }}
        />

        {/* SLUG */}
        <Input
          label="Slug *"
          value={slug}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setIsSlugEdited(true);
            setSlug(slugify(e.target.value));
          }}
        />

        {/* EXCERPT */}
        <Textarea
          label="Excerpt *"
          value={excerpt}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setExcerpt(e.target.value)}
        />

        {/* COVER IMAGE */}
        <div>
          <label className="block mb-2">Cover Image *</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              e.target.files &&
              handleCoverUpload(e.target.files[0])
            }
          />
          {coverUrl && (
            <div className="relative h-48 mt-4">
              <Image
                src={coverUrl}
                alt="Preview"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        <Input
          label="Cover Alt Text"
          value={coverAlt}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCoverAlt(e.target.value)}
        />

        {/* BLOCK CONTROLS */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Content Blocks *
          </h2>

          <div className="flex gap-3 flex-wrap">
            <button type="button" onClick={() => addBlock({ type: "heading", level: 2, text: "" })} className="btn">+ Heading</button>
            <button type="button" onClick={() => addBlock({ type: "paragraph", text: "" })} className="btn">+ Paragraph</button>
            <button type="button" onClick={() => addBlock({ type: "image", url: "", alt: "" })} className="btn">+ Image</button>
            <button type="button" onClick={() => addBlock({ type: "table", headers: ["Column 1","Column 2"], rows: [["",""]] })} className="btn">+ Table</button>
          </div>

          {blocks.map((block, i) => (
            <div key={i} className="border p-4 rounded-lg bg-black/30 space-y-3">
              
              {block.type === "heading" && (
                <>
                  <select
                    value={block.level}
                    onChange={(e) =>
                      updateBlock(i, { ...block, level: Number(e.target.value) as 1|2|3 })
                    }
                  >
                    <option value={1}>H1</option>
                    <option value={2}>H2</option>
                    <option value={3}>H3</option>
                  </select>
                  <input
                    value={block.text}
                    onChange={(e) =>
                      updateBlock(i, { ...block, text: e.target.value })
                    }
                    placeholder="Heading text"
                    className="w-full bg-black border p-2"
                  />
                </>
              )}

              {block.type === "paragraph" && (
                <textarea
                  value={block.text}
                  onChange={(e) =>
                    updateBlock(i, { ...block, text: e.target.value })
                  }
                  placeholder="Paragraph"
                  className="w-full bg-black border p-2"
                />
              )}

              {block.type === "image" && (
                <>
                  <input
                    placeholder="Image URL"
                    value={block.url}
                    onChange={(e) =>
                      updateBlock(i, { ...block, url: e.target.value })
                    }
                    className="w-full bg-black border p-2"
                  />
                  <input
                    placeholder="Alt Text"
                    value={block.alt}
                    onChange={(e) =>
                      updateBlock(i, { ...block, alt: e.target.value })
                    }
                    className="w-full bg-black border p-2"
                  />
                </>
              )}

              {block.type === "table" &&
                block.rows.map((row, r) => (
                  <div key={r} className="flex gap-2">
                    {row.map((cell, c) => (
                      <input
                        key={c}
                        value={cell}
                        onChange={(e) => {
                          const rows = [...block.rows];
                          rows[r][c] = e.target.value;
                          updateBlock(i, { ...block, rows });
                        }}
                        className="bg-black border p-1"
                      />
                    ))}
                  </div>
                ))}

              <button
                type="button"
                onClick={() => removeBlock(i)}
                className="text-red-400 text-sm"
              >
                Remove Block
              </button>
            </div>
          ))}
        </div>

        {/* SEO */}
        <h2 className="text-xl font-semibold">SEO</h2>

        <Input
          label="Meta Title"
          value={metaTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMetaTitle(e.target.value)}
        />

        <Textarea
          label="Meta Description"
          value={metaDescription}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMetaDescription(e.target.value)}
        />

        {/* STATUS */}
        <select
          value={status}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setStatus(e.target.value as BlogStatus)
          }
          className="bg-black border p-2"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>

        <button className="px-6 py-3 bg-emerald-500 text-black font-semibold rounded-lg">
          Create Blog
        </button>
      </form>
    </main>
  );
}

/* ================= REUSABLE INPUTS ================= */

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="block mb-2">{label}</label>
      <input {...props} className="w-full bg-black border p-2" />
    </div>
  );
}

function Textarea({ label, ...props }: any) {
  return (
    <div>
      <label className="block mb-2">{label}</label>
      <textarea {...props} className="w-full bg-black border p-2" />
    </div>
  );
}