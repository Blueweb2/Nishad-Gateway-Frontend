"use client";

import { useState } from "react";

/* ================= TYPES ================= */

type BlogStatus = "draft" | "published";

export type Block =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; url: string; alt: string };

export type BlogFormValues = {
  title: string;
  excerpt: string;
  coverImage: string;
  coverAlt: string;
  tags: string;
  blocks: Block[];
  status: BlogStatus;
  metaTitle: string;
  metaDescription: string;
};

type Props = {
  initialValues?: Partial<BlogFormValues>;
  onSubmit: (values: BlogFormValues) => Promise<void>;
  loading?: boolean;
  error?: string;
};

/* ================= COMPONENT ================= */

export default function BlogForm({
  initialValues,
  onSubmit,
  loading,
  error,
}: Props) {
  const [form, setForm] = useState<BlogFormValues>({
    title: initialValues?.title || "",
    excerpt: initialValues?.excerpt || "",
    coverImage: initialValues?.coverImage || "",
    coverAlt: initialValues?.coverAlt || "",
    tags: initialValues?.tags || "",
    blocks: initialValues?.blocks || [],
    status: initialValues?.status || "draft",
    metaTitle: initialValues?.metaTitle || "",
    metaDescription: initialValues?.metaDescription || "",
  });

  /* ================= FIELD CHANGE ================= */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ================= BLOCK LOGIC ================= */

  const addBlock = (block: Block) => {
    setForm((prev) => ({
      ...prev,
      blocks: [...prev.blocks, block],
    }));
  };

  const updateBlock = (index: number, block: Block) => {
    const updated = [...form.blocks];
    updated[index] = block;

    setForm((prev) => ({
      ...prev,
      blocks: updated,
    }));
  };

  const removeBlock = (index: number) => {
    setForm((prev) => ({
      ...prev,
      blocks: prev.blocks.filter((_, i) => i !== index),
    }));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    await onSubmit(form);
  };

  /* ================= UI ================= */

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white/5 border border-white/10 rounded-2xl p-8"
    >
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* BASIC INFO */}

      <Input
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
      />

      <Textarea
        label="Excerpt"
        name="excerpt"
        value={form.excerpt}
        onChange={handleChange}
      />

      <Input
        label="Cover Image URL"
        name="coverImage"
        value={form.coverImage}
        onChange={handleChange}
      />

      <Input
        label="Cover Image Alt"
        name="coverAlt"
        value={form.coverAlt}
        onChange={handleChange}
      />

      <Input
        label="Tags (comma separated)"
        name="tags"
        value={form.tags}
        onChange={handleChange}
      />

      {/* STATUS */}

      <div>
        <label className="block text-sm text-white/70 mb-2">
          Status
        </label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* BLOCK EDITOR */}

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">
          Content Blocks
        </h2>

        <div className="flex gap-3 flex-wrap">
          <button
            type="button"
            onClick={() =>
              addBlock({ type: "heading", level: 2, text: "" })
            }
            className="btn"
          >
            + Heading
          </button>

          <button
            type="button"
            onClick={() =>
              addBlock({ type: "paragraph", text: "" })
            }
            className="btn"
          >
            + Paragraph
          </button>

          <button
            type="button"
            onClick={() =>
              addBlock({ type: "image", url: "", alt: "" })
            }
            className="btn"
          >
            + Image
          </button>
        </div>

        {form.blocks.map((block, i) => (
          <div
            key={i}
            className="border border-white/10 p-4 rounded-lg bg-black/30 space-y-3"
          >
            {block.type === "heading" && (
              <>
                <select
                  value={block.level}
                  onChange={(
                    e: React.ChangeEvent<HTMLSelectElement>
                  ) =>
                    updateBlock(i, {
                      ...block,
                      level: Number(e.target.value) as 1 | 2 | 3,
                    })
                  }
                  className="bg-black border border-white/10 px-2 py-1 rounded text-white"
                >
                  <option value={1}>H1</option>
                  <option value={2}>H2</option>
                  <option value={3}>H3</option>
                </select>

                <input
                  value={block.text}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement>
                  ) =>
                    updateBlock(i, {
                      ...block,
                      text: e.target.value,
                    })
                  }
                  className="w-full bg-black border border-white/10 px-3 py-2 rounded text-white"
                />
              </>
            )}

            {block.type === "paragraph" && (
              <textarea
                value={block.text}
                onChange={(
                  e: React.ChangeEvent<HTMLTextAreaElement>
                ) =>
                  updateBlock(i, {
                    ...block,
                    text: e.target.value,
                  })
                }
                className="w-full bg-black border border-white/10 px-3 py-2 rounded text-white"
              />
            )}

            {block.type === "image" && (
              <>
                <input
                  placeholder="Image URL"
                  value={block.url}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement>
                  ) =>
                    updateBlock(i, {
                      ...block,
                      url: e.target.value,
                    })
                  }
                  className="w-full bg-black border border-white/10 px-3 py-2 rounded text-white"
                />
                <input
                  placeholder="Alt Text"
                  value={block.alt}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement>
                  ) =>
                    updateBlock(i, {
                      ...block,
                      alt: e.target.value,
                    })
                  }
                  className="w-full bg-black border border-white/10 px-3 py-2 rounded text-white"
                />
              </>
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

      {/* SEO SECTION */}

      <div className="border-t border-white/10 pt-6 space-y-4">
        <h2 className="text-lg font-semibold text-white">
          SEO Settings
        </h2>

        <Input
          label="Meta Title"
          name="metaTitle"
          value={form.metaTitle}
          onChange={handleChange}
        />

        <Textarea
          label="Meta Description"
          name="metaDescription"
          value={form.metaDescription}
          onChange={handleChange}
        />
      </div>

      {/* SUBMIT */}

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Blog"}
      </button>
    </form>
  );
}

/* ================= SMALL INPUT COMPONENTS ================= */

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