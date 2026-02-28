"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";

import {
  createSectorAdmin,
  updateSectorAdmin,
} from "@/lib/api/admin/sectors.api";

interface Props {
  initialData?: any;
  isEdit?: boolean;
}

export default function SectorForm({
  initialData,
  isEdit = false,
}: Props) {
  const [loading, setLoading] = useState(false);
//   Upload State
  const [imageUploading, setImageUploading] = useState(false);

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

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
// Upload Handler
const handleCoverUpload = async (file: File) => {
  try {
    // ✅ 1. Validate BEFORE upload
    if (!file.type.includes("svg")) {
      toast.error("Only SVG icons allowed");
      return;
    }

    

    setImageUploading(true);

    const result = await uploadToCloudinarySigned(
      file,
      "nishad-gateway/subservices/icons",
    );
    

    setForm((prev) => ({
      ...prev,
      coverImage: {
        ...prev.coverImage,
        url: result.secure_url,
        publicId: result.public_id,
      },
    }));

    toast.success("Image uploaded successfully");
  } catch (error: any) {
    toast.error(error.message || "Upload failed");
  } finally {
    setImageUploading(false);
  }
};

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        ...form,
        metaKeywords: form.metaKeywords
          ? form.metaKeywords.split(",").map((k: string) => k.trim())
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

      {/* COVER IMAGE */}
  <div>
  <label className="block text-sm mb-2">
    Cover Image(icon)
  </label>

  <input
    type="file"
    accept=".svg"
    onChange={(e) => {
      if (e.target.files) {
        handleCoverUpload(e.target.files[0]);
      }
    }}
    className="w-full p-3 rounded bg-[#111] border border-gray-700"
  />

  {imageUploading && (
    <p className="text-xs text-gray-400 mt-2">
      Uploading image...
    </p>
  )}

  {form.coverImage.url && (
    <img
      src={form.coverImage.url}
      className="mt-4 h-20 w-20 object-contain"
      alt="Preview"
    />
  )}
</div>

      <input
        type="text"
        placeholder="Cover Image Alt"
        value={form.coverImage.alt}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            coverImage: {
              ...prev.coverImage,
              alt: e.target.value,
            },
          }))
        }
        className="w-full p-3 rounded bg-[#111] border border-gray-700"
      />

      {/* SEO SECTION */}
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