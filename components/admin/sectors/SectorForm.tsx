"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import {
  createSectorAdmin,
  updateSectorAdmin,
} from "@/lib/api/admin/sectors.api";

import ImagePicker from "@/components/admin/common/ImagePicker";

interface Props {
  initialData?: any;
  isEdit?: boolean;
}

export default function SectorForm({
  initialData,
  isEdit = false,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: initialData?.title || "",
    excerpt: initialData?.excerpt || "",
    order: initialData?.order || 0,
    status: initialData?.status || "draft",

    coverImage: {
      url: initialData?.coverImage?.url || "",
      alt: initialData?.coverImage?.alt || "",
      publicId: initialData?.coverImage?.publicId || "",
    },

    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
    metaKeywords:
      initialData?.metaKeywords?.join(", ") || "",
    ogImage: initialData?.ogImage || "",

    blocks: initialData?.blocks || [],
  });

  /* ================= CHANGE ================= */

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        ...form,
        metaKeywords: form.metaKeywords
          ? form.metaKeywords
              .split(",")
              .map((k: string) => k.trim())
          : [],
      };

      if (isEdit && initialData?._id) {
        await updateSectorAdmin(initialData._id, payload);
        toast.success("Sector updated successfully");
      } else {
        await createSectorAdmin(payload);
        toast.success("Sector created successfully");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* TITLE */}
      <input
        type="text"
        name="title"
        placeholder="Sector Title"
        value={form.title}
        onChange={handleChange}
        className="w-full p-3 rounded bg-[#111] border border-gray-700"
      />

      {/* EXCERPT */}
      <textarea
        name="excerpt"
        placeholder="Short description"
        value={form.excerpt}
        onChange={handleChange}
        className="w-full p-3 rounded bg-[#111] border border-gray-700"
      />

      {/* ORDER */}
      <input
        type="number"
        name="order"
        placeholder="Order (0 = top)"
        value={form.order}
        onChange={handleChange}
        className="w-full p-3 rounded bg-[#111] border border-gray-700"
      />

      {/* STATUS */}
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full p-3 rounded bg-[#111] border border-gray-700"
      >
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>

      {/* ================= COVER IMAGE ================= */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400">
          Cover Image (Icon)
        </label>

        <ImagePicker
          folder="nishad-gateway/subservices/icons"
          value={
            form.coverImage.url
              ? {
                  url: form.coverImage.url,
                  alt: form.coverImage.alt,
                  publicId: form.coverImage.publicId,
                }
              : null
          }
          onChange={(val) => {
            if (!val?.url) return;

            setForm((prev) => ({
              ...prev,
              coverImage: {
                url: val.url,
                publicId: val.publicId,
                alt:
                  val.alt ||
                  prev.title ||
                  "Sector icon",
              },
            }));
          }}
        />

        {/* ALT WARNING */}
        {!form.coverImage.alt &&
          form.coverImage.url && (
            <p className="text-xs text-yellow-400">
              ⚠️ Missing alt text
            </p>
          )}
      </div>

      {/* ================= SEO ================= */}
      <div className="border-t border-gray-700 pt-6">
        <h3 className="text-lg font-semibold mb-4">
          SEO Settings
        </h3>

        <input
          type="text"
          name="metaTitle"
          placeholder="Meta Title"
          value={form.metaTitle}
          onChange={handleChange}
          className="w-full p-3 rounded bg-[#111] border border-gray-700 mb-3"
        />

        <textarea
          name="metaDescription"
          placeholder="Meta Description"
          value={form.metaDescription}
          onChange={handleChange}
          className="w-full p-3 rounded bg-[#111] border border-gray-700 mb-3"
        />

        <input
          type="text"
          name="metaKeywords"
          placeholder="Meta Keywords (comma separated)"
          value={form.metaKeywords}
          onChange={handleChange}
          className="w-full p-3 rounded bg-[#111] border border-gray-700 mb-3"
        />

        <input
          type="text"
          name="ogImage"
          placeholder="OG Image URL"
          value={form.ogImage}
          onChange={handleChange}
          className="w-full p-3 rounded bg-[#111] border border-gray-700"
        />
      </div>

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-green-600 px-6 py-3 rounded text-white"
      >
        {loading
          ? "Saving..."
          : isEdit
          ? "Update Sector"
          : "Create Sector"}
      </button>
    </div>
  );
}