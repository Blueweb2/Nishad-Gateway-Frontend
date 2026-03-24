"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  adminCreateMinistry,
  adminUpdateMinistry,
} from "@/lib/api/admin/ministries.api";

import { Ministry } from "@/lib/types/ministry";
import ImagePicker from "@/components/admin/common/ImagePicker";

type Props = {
  mode: "create" | "edit";
  ministryId?: string;
  initialData?: Ministry;
};

export default function MinistryForm({
  mode,
  ministryId,
  initialData,
}: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    shortDesc: "",

    logo: "",
    logoPublicId: undefined as string | undefined,
    logoAlt: "",

    coverImage: "",
    coverPublicId: undefined as string | undefined,
    coverAlt: "",

    isActive: true,
  });

  const [loading, setLoading] = useState(false);

  /* ---------------- Prefill ---------------- */
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm({
        title: initialData.title || "",
        slug: initialData.slug || "",
        shortDesc: initialData.shortDesc || "",

        logo: initialData.logo || "",
        logoPublicId: initialData.logoPublicId,
        logoAlt: initialData.logoAlt || "",

        coverImage: initialData.coverImage || "",
        coverPublicId: initialData.coverPublicId,
        coverAlt: initialData.coverAlt || "",

        isActive: initialData.isActive ?? true,
      });
    }
  }, [mode, initialData]);

  /* ---------------- Auto slug ---------------- */
  useEffect(() => {
    if (mode !== "create") return;

    const slug = form.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    setForm((prev) => ({ ...prev, slug }));
  }, [form.title, mode]);

  /* ---------------- Change ---------------- */
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "isActive" ? value === "true" : value,
    }));
  };

  /* ---------------- Submit ---------------- */
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.title.trim()) {
      return toast.error("Title required");
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        logoAlt:
          form.logoAlt || form.title || "Ministry logo",
        coverAlt:
          form.coverAlt || form.title || "Ministry cover image",
      };

      if (mode === "create") {
        await adminCreateMinistry(payload);
        toast.success("Ministry created");
      } else {
        await adminUpdateMinistry(ministryId!, payload);
        toast.success("Ministry updated");
      }

      router.push("/admin/ministries");
      router.refresh();

    } catch (err: any) {
      toast.error(err?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto bg-[#0b0f0b] border border-green-700/30 rounded-2xl p-8 space-y-6"
    >
      <h2 className="text-2xl font-semibold text-green-300">
        {mode === "create" ? "Create Ministry" : "Edit Ministry"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Title */}
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="input"
        />

        {/* Slug */}
        <input
          name="slug"
          value={form.slug}
          onChange={handleChange}
          placeholder="slug"
          className="input"
        />

        {/* Description */}
        <textarea
          name="shortDesc"
          value={form.shortDesc}
          onChange={handleChange}
          placeholder="Short description"
          className="input md:col-span-2"
        />

        {/* ================= LOGO ================= */}
        <div className="space-y-2">
          <p className="text-sm text-gray-300">Logo</p>

          <ImagePicker
            folder="nishad-gateway/ministries/logos"
            value={
              form.logo
                ? {
                    url: form.logo,
                    alt: form.logoAlt,
                    publicId: form.logoPublicId,
                  }
                : null
            }
            onChange={(val) =>
              setForm((prev) => ({
                ...prev,
                logo: val?.url ?? "",
                logoPublicId: val?.publicId,
                logoAlt:
                  val?.alt ||
                  prev.title ||
                  "Ministry logo",
              }))
            }
          />
        </div>

        {/* ================= COVER ================= */}
        <div className="space-y-2">
          <p className="text-sm text-gray-300">Cover Image</p>

          <ImagePicker
            folder="nishad-gateway/ministries/covers"
            value={
              form.coverImage
                ? {
                    url: form.coverImage,
                    alt: form.coverAlt,
                    publicId: form.coverPublicId,
                  }
                : null
            }
            onChange={(val) =>
              setForm((prev) => ({
                ...prev,
                coverImage: val?.url ?? "",
                coverPublicId: val?.publicId,
                coverAlt:
                  val?.alt ||
                  prev.title ||
                  "Ministry cover image",
              }))
            }
          />
        </div>
      </div>

      {/* Status */}
      <select
        name="isActive"
        value={String(form.isActive)}
        onChange={handleChange}
        className="input w-[200px]"
      >
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>

      {/* Buttons */}
      <div className="flex gap-4 pt-6 border-t border-green-900/40">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg"
        >
          {loading ? "Saving..." : "Save"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/admin/ministries")}
          className="px-6 py-3 border border-gray-700 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}