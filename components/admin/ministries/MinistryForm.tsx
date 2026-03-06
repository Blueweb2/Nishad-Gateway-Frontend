"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  adminCreateMinistry,
  adminUpdateMinistry,
} from "@/lib/api/admin/ministries.api";

import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

type Props = {
  mode: "create" | "edit";
  ministryId?: string;
  defaultValues?: {
    title?: string;
    slug?: string;
    shortDesc?: string;
    logo?: string;
    logoAlt?: string;
    coverImage?: string;
    coverAlt?: string;
    isActive?: boolean;
  };
};

export default function MinistryForm({
  mode,
  ministryId,
  defaultValues,
}: Props) {

  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    shortDesc: "",
    logo: "",
    logoAlt: "",
    coverImage: "",
    coverAlt: "",
    isActive: true,
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  /* ---------------- Prefill ---------------- */

  useEffect(() => {
    if (mode === "edit" && defaultValues) {
      setForm({
        title: defaultValues.title || "",
        slug: defaultValues.slug || "",
        shortDesc: defaultValues.shortDesc || "",
        logo: defaultValues.logo || "",
        logoAlt: defaultValues.logoAlt || "",
        coverImage: defaultValues.coverImage || "",
        coverAlt: defaultValues.coverAlt || "",
        isActive: defaultValues.isActive ?? true,
      });
    }
  }, [mode, defaultValues]);

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

  /* ---------------- Preview URLs ---------------- */

  const logoPreview = useMemo(() => {
    if (!logoFile) return "";
    return URL.createObjectURL(logoFile);
  }, [logoFile]);

  const coverPreview = useMemo(() => {
    if (!coverFile) return "";
    return URL.createObjectURL(coverFile);
  }, [coverFile]);

  /* ---------------- Submit ---------------- */

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    if (!form.title.trim()) {
      return toast.error("Title required");
    }

    try {

      setLoading(true);

      let logoUrl = form.logo;
      let coverUrl = form.coverImage;

      if (logoFile) {
        const upload = await uploadToCloudinarySigned(
          logoFile,
          "nishad-gateway/ministries/logos"
        );
        logoUrl = upload.secure_url;
      }

      if (coverFile) {
        const upload = await uploadToCloudinarySigned(
          coverFile,
          "nishad-gateway/ministries/covers"
        );
        coverUrl = upload.secure_url;
      }

      const payload = {
        ...form,
        logo: logoUrl,
        coverImage: coverUrl,
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

      {/* Grid Layout */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Title */}

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-300">
            Title
          </label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter ministry title"
            className="input"
          />
        </div>

        {/* Slug */}

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-300">
            Slug
          </label>

          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            placeholder="ministry-slug"
            className="input"
          />
        </div>

        {/* Short Description */}

        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-300">
            Short Description
          </label>

          <textarea
            name="shortDesc"
            value={form.shortDesc}
            onChange={handleChange}
            rows={3}
            placeholder="Brief ministry description"
            className="input"
          />
        </div>

        {/* Logo */}

        <div className="flex flex-col gap-2">

          <label className="text-sm font-medium text-gray-300">
            Logo
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setLogoFile(e.target.files?.[0] || null)
            }
            className="text-sm text-gray-300
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:bg-green-600 file:text-white
            hover:file:bg-green-500"
          />

          {(logoFile || form.logo) && (
            <img
              src={
                logoFile
                  ? logoPreview
                  : cloudinaryAutoWebp(form.logo)
              }
              className="w-20 h-20 object-contain mt-2"
            />
          )}

        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-300">
            Logo Alt Text
          </label>

          <input
            name="logoAlt"
            value={form.logoAlt}
            onChange={handleChange}
            placeholder="Describe the logo"
            className="input"
          />
        </div>

        {/* Cover Image */}

        <div className="flex flex-col gap-2">

          <label className="text-sm font-medium text-gray-300">
            Cover Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setCoverFile(e.target.files?.[0] || null)
            }
            className="text-sm text-gray-300
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:bg-green-600 file:text-white
            hover:file:bg-green-500"
          />

          {(coverFile || form.coverImage) && (
            <img
              src={
                coverFile
                  ? coverPreview
                  : cloudinaryAutoWebp(form.coverImage)
              }
              className="w-full max-w-[280px] mt-2 rounded-xl"
            />
          )}

        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-300">
            Cover Image Alt Text
          </label>

          <input
            name="coverAlt"
            value={form.coverAlt}
            onChange={handleChange}
            placeholder="Describe the cover image"
            className="input"
          />
        </div>

      </div>

      {/* Status */}

      <div className="flex flex-col gap-2 w-[220px]">

        <label className="text-sm font-medium text-gray-300">
          Status
        </label>

        <select
          name="isActive"
          value={String(form.isActive)}
          onChange={handleChange}
          className="input"
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

      </div>

      {/* Buttons */}

      <div className="flex gap-4 pt-6 border-t border-green-900/40">

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-medium"
        >
          {loading ? "Saving..." : "Save Ministry"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/admin/ministries")}
          className="px-6 py-3 border border-gray-700 rounded-lg hover:bg-gray-800"
        >
          Cancel
        </button>

      </div>

    </form>
  );
}