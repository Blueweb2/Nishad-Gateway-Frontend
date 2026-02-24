"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type BlogStatus = "draft" | "published";

type Block =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; url: string; alt: string }
  | { type: "table"; headers: string[]; rows: string[][] };

type Blog = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: {
    url: string;
    alt: string;
  };
  tags: string[];
  blocks: { type: string; data: Block }[];
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
  const params = useParams();
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_URL;

  const id = params?.id as string;

  /* ================= STATES ================= */

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugEdited, setIsSlugEdited] = useState(false);

  const [excerpt, setExcerpt] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [coverAlt, setCoverAlt] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState<BlogStatus>("draft");

  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const [blocks, setBlocks] = useState<Block[]>([]);

  /* ================= FETCH BLOG ================= */

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
        setSlug(blog.slug);
        setExcerpt(blog.excerpt);
        setCoverUrl(blog.coverImage?.url || "");
        setCoverAlt(blog.coverImage?.alt || "");
        setTags(blog.tags?.join(", ") || "");
        setStatus(blog.status);
        setMetaTitle(blog.metaTitle || "");
        setMetaDescription(blog.metaDescription || "");

        // Convert backend blocks to UI blocks
        setBlocks(blog.blocks.map((b) => b.data));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setFetching(false);
      }
    };

    fetchBlog();
  }, [id, API]);

  /* ================= AUTO SLUG ================= */

  useEffect(() => {
    if (!isSlugEdited) {
      setSlug(slugify(title));
    }
  }, [title, isSlugEdited]);

  /* ================= BLOCK FUNCTIONS ================= */

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

  /* ================= SUBMIT ================= */

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    setError("");

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
            slug,
            excerpt,
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
            blocks: blocks.map((b) => ({
              type: b.type,
              data: b,
            })),
          }),
        }
      );

      if (!res.ok) throw new Error("Update failed");

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
    <main className="max-w-4xl mx-auto px-6 py-12 text-white">
      <h1 className="text-3xl font-semibold mb-8">
        Edit Blog
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">

        {error && (
          <div className="text-red-400">{error}</div>
        )}

        <Input
          label="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <Input
          label="Slug"
          value={slug}
          onChange={(e) => {
            setIsSlugEdited(true);
            setSlug(slugify(e.target.value));
          }}
        />

        <Textarea
          label="Excerpt"
          value={excerpt}
          onChange={(e) =>
            setExcerpt(e.target.value)
          }
        />

        <Input
          label="Cover Image URL"
          value={coverUrl}
          onChange={(e) =>
            setCoverUrl(e.target.value)
          }
        />

        <Input
          label="Cover Image Alt"
          value={coverAlt}
          onChange={(e) =>
            setCoverAlt(e.target.value)
          }
        />

        <Input
          label="Tags"
          value={tags}
          onChange={(e) =>
            setTags(e.target.value)
          }
        />

        <select
          value={status}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setStatus(e.target.value as BlogStatus)
          }
          className="bg-black border p-2"
        >
          <option value="draft">Draft</option>
          <option value="published">
            Published
          </option>
        </select>

        {/* BLOCK EDITOR */}

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Content Blocks
          </h2>

          <div className="flex gap-3 flex-wrap">
            <button type="button" onClick={() => addBlock({ type: "heading", level: 2, text: "" })}>+ Heading</button>
            <button type="button" onClick={() => addBlock({ type: "paragraph", text: "" })}>+ Paragraph</button>
            <button type="button" onClick={() => addBlock({ type: "image", url: "", alt: "" })}>+ Image</button>
            <button type="button" onClick={() => addBlock({ type: "table", headers: ["Column 1","Column 2"], rows: [["",""]] })}>+ Table</button>
          </div>

          {blocks.map((block, i) => (
            <div key={i} className="border p-4 bg-black/30 rounded-lg space-y-3">
              
              {block.type === "heading" && (
                <>
                  <select
                    value={block.level}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      updateBlock(i, {
                        ...block,
                        level: Number(e.target.value) as 1|2|3,
                      })
                    }
                  >
                    <option value={1}>H1</option>
                    <option value={2}>H2</option>
                    <option value={3}>H3</option>
                  </select>

                  <input
                    value={block.text}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateBlock(i, {
                        ...block,
                        text: e.target.value,
                      })
                    }
                    className="w-full bg-black border p-2"
                  />
                </>
              )}

              {block.type === "paragraph" && (
                <textarea
                  value={block.text}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    updateBlock(i, {
                      ...block,
                      text: e.target.value,
                    })
                  }
                  className="w-full bg-black border p-2"
                />
              )}

              {block.type === "image" && (
                <>
                  <input
                    value={block.url}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateBlock(i, {
                        ...block,
                        url: e.target.value,
                      })
                    }
                    className="w-full bg-black border p-2"
                  />
                  <input
                    value={block.alt}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateBlock(i, {
                        ...block,
                        alt: e.target.value,
                      })
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-emerald-500 text-black font-semibold rounded-lg"
        >
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </main>
  );
}

/* REUSABLE INPUTS */

function Input({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
}) {
  return (
    <div>
      <label className="block mb-2">
        {label}
      </label>
      <input
        {...props}
        className="w-full bg-black border p-2"
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
      <label className="block mb-2">
        {label}
      </label>
      <textarea
        rows={rows}
        {...props}
        className="w-full bg-black border p-2"
      />
    </div>
  );
}