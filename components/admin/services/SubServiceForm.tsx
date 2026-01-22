"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  adminCreateSubService,
  adminUpdateSubService,
} from "@/lib/api/subservices.api";

type SubServiceFormProps = {
  mode: "create" | "edit";
  serviceId: string;
  subId?: string;

  defaultValues?: {
    title?: string;
    slug?: string;
    shortDesc?: string;
    thumbnail?: string;
    order?: number;
    isActive?: boolean;
  };
};

export default function SubServiceForm({
  mode,
  serviceId,
  subId,
  defaultValues,
}: SubServiceFormProps) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    shortDesc: "",
    thumbnail: "",
    order: 1,
    isActive: true,
  });

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Prefill in edit mode
  useEffect(() => {
    if (mode === "edit" && defaultValues) {
      setForm({
        title: defaultValues.title || "",
        slug: defaultValues.slug || "",
        shortDesc: defaultValues.shortDesc || "",
        thumbnail: defaultValues.thumbnail || "",
        order: defaultValues.order ?? 1,
        isActive: defaultValues.isActive ?? true,
      });
    }
  }, [mode, defaultValues]);

  //  Auto slug generator (only create mode)
  useEffect(() => {
    if (mode === "create") {
      setForm((prev) => ({
        ...prev,
        slug: prev.title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-"),
      }));
    }
  }, [form.title, mode]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "order"
          ? Number(value)
          : name === "isActive"
          ? value === "true"
          : value,
    }));
  };

  //  Preview URL (avoid memory leak)
  const previewUrl = useMemo(() => {
    if (!thumbnailFile) return "";
    return URL.createObjectURL(thumbnailFile);
  }, [thumbnailFile]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  //  Backend URL for edit mode image preview
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  const thumbnailSrc = thumbnailFile
    ? previewUrl
    : form.thumbnail?.startsWith("http")
    ? form.thumbnail
    : form.thumbnail
    ? `${BACKEND_URL}${form.thumbnail}`
    : "";

  const handleThumbnailSelect = (file: File | null) => {
    if (!file) return;

    // Validate type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    // Validate size (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("Image too large. Max size is 5MB");
      return;
    }

    setThumbnailFile(file);
    toast.success("Image selected  (will upload on submit)");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim()) return toast.error("Title is required");
    if (!form.slug.trim()) return toast.error("Slug is required");

    // create mode requires thumbnail
    if (mode === "create" && !thumbnailFile && !form.thumbnail) {
      return toast.error("Thumbnail is required");
    }

    try {
      setLoading(true);

      //  ONE REQUEST: send form data + file
      const formData = new FormData();
      formData.append("title", form.title.trim());
      formData.append("slug", form.slug.trim());
      formData.append("shortDesc", form.shortDesc.trim());
      formData.append("order", String(form.order));
      formData.append("isActive", String(form.isActive));

      //  file fieldname must match backend: "thumbnail"
      if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
      }

      if (mode === "create") {
        await adminCreateSubService(serviceId, formData);
        toast.success("Subservice created successfully ");
      } else {
        if (!subId) return toast.error("Missing subservice id");
        await adminUpdateSubService(subId, formData);
        toast.success("Subservice updated successfully ");
      }

      router.push(`/admin/services/${serviceId}/subservices`);
      router.refresh();
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || err?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[750px] bg-[#0b0f0b] border border-green-700/30 rounded-2xl p-6 space-y-5"
    >
      <div>
        <h2 className="text-xl font-semibold text-green-300">
          {mode === "create" ? "Create Subservice" : "Edit Subservice"}
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Subservices like Entity Types, Licensing, Ownership, etc.
        </p>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Example: Entity Types"
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
        />
      </div>

      {/* Slug */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300">Slug</label>
        <input
          name="slug"
          value={form.slug}
          onChange={handleChange}
          placeholder="Example: entity-types"
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
        />
        {mode === "create" && (
          <p className="text-xs text-gray-500">
            Slug auto-generates from title (you can edit manually)
          </p>
        )}
      </div>

      {/* Short Description */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300">Short Description</label>
        <textarea
          name="shortDesc"
          value={form.shortDesc}
          onChange={handleChange}
          placeholder="Small description shown in list page..."
          rows={3}
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500 resize-none"
        />
      </div>

      {/* Thumbnail */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300">Thumbnail</label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleThumbnailSelect(e.target.files?.[0] || null)}
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white"
        />

        {/* Selected file name */}
        {thumbnailFile && (
          <p className="text-xs text-gray-400">
            Selected:{" "}
            <span className="text-green-300">{thumbnailFile.name}</span>
          </p>
        )}

        {/* Preview */}
        {(thumbnailFile || form.thumbnail) && (
          <div className="mt-3">
            <p className="text-xs text-gray-400 mb-2">Preview:</p>

            <img
              src={thumbnailSrc}
              alt="Thumbnail preview"
              className="w-[220px] h-[130px] object-cover rounded-xl border border-green-700/30"
            />

            {/* Clear button */}
            {thumbnailFile && (
              <button
                type="button"
                onClick={() => setThumbnailFile(null)}
                className="mt-3 px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition text-sm"
              >
                Remove Selected Image
              </button>
            )}
          </div>
        )}

        <p className="text-xs text-gray-500">
          Any image type is allowed. It will be converted to <b>WEBP</b> for SEO.
        </p>
      </div>

      {/* Order */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300">Order</label>
        <input
          type="number"
          name="order"
          value={form.order}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
        />
      </div>

      {/* Status */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300">Status</label>
        <select
          name="isActive"
          value={String(form.isActive)}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-3 rounded-lg bg-green-600 hover:bg-green-700 transition font-semibold disabled:opacity-50"
        >
          {loading
            ? mode === "create"
              ? "Creating..."
              : "Updating..."
            : mode === "create"
            ? "Create Subservice"
            : "Update Subservice"}
        </button>

        <button
          type="button"
          onClick={() => router.push(`/admin/services/${serviceId}/subservices`)}
          className="px-5 py-3 rounded-lg border border-gray-700 hover:bg-gray-800 transition font-semibold"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
