"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  adminGetBlogById,
  adminUpdateBlog,
} from "@/lib/api/admin/adminBlogs.api";
import toast from "react-hot-toast";
import Image from "next/image";
import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

type BlogStatus = "draft" | "published";

type HeadingBlock = {
  type: "heading";
  level: 1 | 2 | 3;
  text: string;
};

type ParagraphBlock = {
  type: "paragraph";
  text: string;
};

type ImageItem = {
  url: string;
  alt: string;
  publicId?: string;
  caption?: string;
  width?: number;
  height?: number;
};

type GalleryBlock = {
  type: "gallery";
  images: ImageItem[];
};

type TableBlock = {
  type: "table";
  headers: string[];
  rows: string[][];
};

type ListBlock = {
  type: "list";
  style: "unordered" | "ordered";
  items: string[];
};

type Block =
  | HeadingBlock
  | ParagraphBlock
  | GalleryBlock
  | TableBlock
  | ListBlock;

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

  const id = params?.id as string;

  const API = process.env.NEXT_PUBLIC_API_URL;

  /* ================= STATES ================= */

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugEdited, setIsSlugEdited] = useState(false);

  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState<{
    url: string;
    alt: string;
    publicId?: string;
  } | null>(null);

  const [uploading, setUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);
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
        const blog: Blog = await adminGetBlogById(id);

        setTitle(blog.title);
        setSlug(blog.slug);
        setExcerpt(blog.excerpt);
        setCoverImage(
          blog.coverImage
            ? {
              url: blog.coverImage.url,
              alt: blog.coverImage.alt,
            }
            : null
        );
        setTags(blog.tags?.join(", ") || "");
        setStatus(blog.status);
        setMetaTitle(blog.metaTitle || "");
        setMetaDescription(blog.metaDescription || "");
        setBlocks(blog.blocks.map((b) => b.data));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setFetching(false);
      }
    };

    fetchBlog();
  }, [id]);

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

      setCoverImage({
        url: cloudinaryAutoWebp(uploaded.secure_url),
        alt: title || "",
        publicId: uploaded.public_id, // ✅ IMPORTANT
      });

      toast.success("Uploaded", { id: "upload" });
    } catch {
      toast.error("Upload failed", { id: "upload" });
    } finally {
      setUploading(false);
    }
  };

  const handleCoverDelete = async () => {
    if (!coverImage?.publicId) {
      setCoverImage(null);
      return;
    }

    try {
      await fetch(`${API}/cloudinary/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          publicId: coverImage.publicId,
        }),
      });

      setCoverImage(null);
      toast.success("Cover image deleted");
    } catch {
      toast.error("Delete failed");
    }
  };
  /* ================= SUBMIT ================= */


  /* ================= SUBMIT ================= */

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!id) {
      setError("Invalid blog ID");
      return;
    }

    if (!title || !excerpt) {
      setError("Title and excerpt are required");
      return;
    }
    if (!coverImage) {
      setError("Cover image is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await adminUpdateBlog(id, {
        title,
        slug,
        excerpt,
        status,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        coverImage: {
          url: coverImage.url,
          alt: coverImage.alt || title,
          publicId: coverImage.publicId,
        },

        metaTitle: metaTitle || title,
        metaDescription: metaDescription || excerpt,

        blocks: blocks.map((b) => ({
          type: b.type,
          data: b,
        })),
      });

      // Optional: success feedback
      toast.success("Blog updated successfully");

      router.push("/admin/blogs");
    } catch (err: any) {
      setError(
        err?.message || "Something went wrong while updating"
      );
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

          {coverImage?.url && (
            <div className="relative h-48 mt-4">
              <Image
                src={coverImage.url}
                alt={coverImage.alt}
                fill
                className="object-cover rounded-lg"
              />

              <button
                type="button"
                onClick={handleCoverDelete}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 text-xs"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <Input
          label="Cover Alt Text"
          value={coverImage?.alt || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCoverImage((prev) =>
              prev
                ? { ...prev, alt: e.target.value }
                : prev
            )
          }
        />



        {/* BLOCK CONTROLS */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Content Blocks *
          </h2>

          <div className="flex gap-3 flex-wrap">
            <button type="button" onClick={() => addBlock({ type: "heading", level: 2, text: "" })} className="btn">+ Heading</button>
            <button type="button" onClick={() => addBlock({ type: "paragraph", text: "" })} className="btn">+ Paragraph</button>
            <button type="button" onClick={() => addBlock({ type: "gallery", images: [] })} className="btn">+ Image</button>
            <button
              type="button"
              onClick={() =>
                addBlock({
                  type: "table",
                  headers: [],
                  rows: [],
                })
              }
              className="btn"
            >
              + Table
            </button>          </div>
          <button
            type="button"
            onClick={() =>
              addBlock({
                type: "list",
                style: "unordered",
                items: [""],
              })
            }
            className="btn"
          >
            + List
          </button>

          {blocks.map((block, i) => (
            <div key={i} className="border p-4 rounded-lg bg-black/30 space-y-3">

              {block.type === "heading" && (
                <>
                  <select
                    value={block.level}
                    onChange={(e) =>
                      updateBlock(i, { ...block, level: Number(e.target.value) as 1 | 2 | 3 })
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

              {block.type === "gallery" && (
                <div className="space-y-4">

                  {/* Upload Button */}
                  <label className="px-3 py-2 bg-emerald-600 text-white rounded text-sm cursor-pointer inline-block disabled:opacity-50">
                    {galleryUploading ? "Uploading..." : "+ Upload Image"}
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      disabled={galleryUploading}
                      onChange={async (e) => {
                        if (!e.target.files) return;

                        const file = e.target.files[0];

                        if (!file.type.startsWith("image/")) {
                          toast.error("Only image files allowed");
                          return;
                        }

                        try {
                          setGalleryUploading(true);

                          const uploaded = await uploadToCloudinarySigned(
                            file,
                            "nishad-gateway/blogs"
                          );

                          const newImages = [
                            ...block.images,
                            {
                              url: cloudinaryAutoWebp(uploaded.secure_url),
                              alt: "",
                              publicId: uploaded.public_id,
                            },
                          ];

                          updateBlock(i, {
                            ...block,
                            images: newImages,
                          });

                          toast.success("Image uploaded");
                        } catch {
                          toast.error("Upload failed");
                        } finally {
                          setGalleryUploading(false);
                        }
                      }}
                    />
                  </label>

                  {/* Image Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {block.images.map((img, imgIndex) => (
                      <div key={imgIndex} className="relative group">

                        {/* Image Preview */}
                        <div className="relative h-40 rounded overflow-hidden">
                          <Image
                            src={img.url}
                            alt={img.alt || ""}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Alt Text */}
                        <input
                          value={img.alt}
                          onChange={(e) => {
                            const newImages = [...block.images];
                            newImages[imgIndex] = {
                              ...newImages[imgIndex],
                              alt: e.target.value,
                            };

                            updateBlock(i, {
                              ...block,
                              images: newImages,
                            });
                          }}
                          placeholder="Alt text"
                          className="w-full mt-2 bg-black border border-white/10 p-1 text-sm rounded"
                        />

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              if (img.publicId) {
                                await fetch(`${API}/cloudinary/delete`, {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  credentials: "include",
                                  body: JSON.stringify({
                                    publicId: img.publicId,
                                  }),
                                });
                              }

                              const newImages = block.images.filter(
                                (_, idx) => idx !== imgIndex
                              );

                              updateBlock(i, {
                                ...block,
                                images: newImages,
                              });

                              toast.success("Image deleted");
                            } catch {
                              toast.error("Delete failed");
                            }
                          }}
                          className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {block.type === "table" && (
                <div className="space-y-4">

                  {/* COLUMN CONTROLS */}
                  <div className="flex gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => {
                        const newHeaders = [
                          ...block.headers,
                          `Column ${block.headers.length + 1}`,
                        ];

                        const newRows = block.rows.map((row) => [
                          ...row,
                          "",
                        ]);

                        updateBlock(i, {
                          ...block,
                          headers: newHeaders,
                          rows: newRows,
                        });
                      }}
                      className="px-3 py-1 bg-emerald-600 text-white text-sm rounded"
                    >
                      + Add Column
                    </button>

                    {block.headers.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newHeaders =
                            block.headers.slice(0, -1);



                          const newRows =
                            newHeaders.length === 0
                              ? []
                              : block.rows.map((row) =>
                                row.slice(0, -1)
                              );

                          updateBlock(i, {
                            ...block,
                            headers: newHeaders,
                            rows: newRows,
                          });
                        }}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded"
                      >
                        Remove Column
                      </button>
                    )}
                  </div>

                  {/* HEADER INPUTS */}
                  {block.headers.length > 0 && (
                    <div className="flex gap-2">
                      {block.headers.map((header, colIndex) => (
                        <input
                          key={colIndex}
                          value={header}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const newHeaders = [...block.headers];
                            newHeaders[colIndex] =
                              e.target.value;

                            updateBlock(i, {
                              ...block,
                              headers: newHeaders,
                            });
                          }}
                          placeholder={`Header ${colIndex + 1}`}
                          className="bg-black border p-2 text-white"
                        />
                      ))}
                    </div>
                  )}

                  {/* ROW CONTROLS */}
                  {block.headers.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newRow = Array(
                          block.headers.length
                        ).fill("");

                        updateBlock(i, {
                          ...block,
                          rows: [...block.rows, newRow],
                        });
                      }}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
                    >
                      + Add Row
                    </button>
                  )}

                  {/* ROW INPUTS */}
                  {block.rows.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-2">
                      {row.map((cell, cellIndex) => (
                        <input
                          key={cellIndex}
                          value={cell}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const newRows = [...block.rows];
                            newRows[rowIndex][cellIndex] =
                              e.target.value;

                            updateBlock(i, {
                              ...block,
                              rows: newRows,
                            });
                          }}
                          className="bg-black border p-2 text-white"
                        />
                      ))}

                      <button
                        type="button"
                        onClick={() => {
                          const newRows =
                            block.rows.filter(
                              (_, r) => r !== rowIndex
                            );

                          updateBlock(i, {
                            ...block,
                            rows: newRows,
                          });
                        }}
                        className="text-red-400 text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {block.type === "list" && (
                <div className="space-y-3">

                  {/* Style Selector */}
                  <select
                    value={block.style}
                    onChange={(e) =>
                      updateBlock(i, {
                        ...block,
                        style: e.target.value as "unordered" | "ordered",
                      })
                    }
                    className="bg-black border p-2 text-white"
                  >
                    <option value="unordered">Bullet List</option>
                    <option value="ordered">Numbered List</option>
                  </select>

                  {/* List Items */}
                  {block.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex gap-2">
                      <input
                        value={item}
                        onChange={(e) => {
                          const newItems = [...block.items];
                          newItems[itemIndex] = e.target.value;

                          updateBlock(i, {
                            ...block,
                            items: newItems,
                          });
                        }}
                        className="flex-1 bg-black border p-2 text-white"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          const newItems = block.items.filter(
                            (_, idx) => idx !== itemIndex
                          );

                          updateBlock(i, {
                            ...block,
                            items: newItems,
                          });
                        }}
                        className="text-red-400"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() =>
                      updateBlock(i, {
                        ...block,
                        items: [...block.items, ""],
                      })
                    }
                    className="text-sm text-emerald-400"
                  >
                    + Add Item
                  </button>
                </div>
              )}


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

        <div className="pt-5">
          <button
            type="submit"
            disabled={uploading || galleryUploading || loading}
            className="px-6 py-3 bg-emerald-500 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Blog"}
          </button>
        </div>
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