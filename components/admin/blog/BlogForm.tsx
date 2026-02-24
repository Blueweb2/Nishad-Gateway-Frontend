"use client";

import { useState } from "react";

type BlogStatus = "draft" | "published";

export type BlogFormValues = {
  title: string;
  excerpt: string;
  coverImage: string;
  tags: string;
  content: string;
  status: BlogStatus;
};

type Props = {
  initialValues?: Partial<BlogFormValues>;
  onSubmit: (values: BlogFormValues) => Promise<void>;
  loading?: boolean;
  error?: string;
};

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
    tags: initialValues?.tags || "",
    content: initialValues?.content || "",
    status: initialValues?.status || "draft",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white/5 border border-white/10 rounded-2xl p-8"
    >
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

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
        label="Tags (comma separated)"
        name="tags"
        value={form.tags}
        onChange={handleChange}
      />

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

      <Textarea
        label="Content"
        name="content"
        rows={10}
        value={form.content}
        onChange={handleChange}
      />

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

/* ---------- Small Inputs ---------- */

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