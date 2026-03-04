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
    coverImage?: string;
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
    coverImage: "",
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
        coverImage: defaultValues.coverImage || "",
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
      [name]:
        name === "isActive"
          ? value === "true"
          : value,
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

      /* Upload logo */

      if (logoFile) {
        const upload = await uploadToCloudinarySigned(
          logoFile,
          "ministries/logos"
        );

        logoUrl = upload.secure_url;
      }

      /* Upload cover */

      if (coverFile) {
        const upload = await uploadToCloudinarySigned(
          coverFile,
          "ministries/covers"
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
      className="w-full max-w-[750px] bg-[#0b0f0b] border border-green-700/30 rounded-2xl p-6 space-y-5"
    >

      <h2 className="text-xl font-semibold text-green-300">
        {mode === "create" ? "Create Ministry" : "Edit Ministry"}
      </h2>

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
        placeholder="Slug"
        className="input"
      />

      {/* Short Description */}

      <textarea
        name="shortDesc"
        value={form.shortDesc}
        onChange={handleChange}
        rows={3}
        placeholder="Short description"
        className="input"
      />

      {/* Logo Upload */}

      <div>
        <label className="text-sm text-gray-300">Logo</label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setLogoFile(e.target.files?.[0] || null)
          }
          className="input"
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

      {/* Cover Image */}

      <div>
        <label className="text-sm text-gray-300">
          Cover Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setCoverFile(e.target.files?.[0] || null)
          }
          className="input"
        />

        {(coverFile || form.coverImage) && (
          <img
            src={
              coverFile
                ? coverPreview
                : cloudinaryAutoWebp(form.coverImage)
            }
            className="w-full max-w-[300px] mt-3 rounded-xl"
          />
        )}
      </div>

      {/* Status */}

      <select
        name="isActive"
        value={String(form.isActive)}
        onChange={handleChange}
        className="input"
      >
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>

      {/* Buttons */}

      <div className="flex gap-3 pt-3">

        <button
          type="submit"
          disabled={loading}
          className="px-5 py-3 bg-green-600 rounded-lg"
        >
          {loading ? "Saving..." : "Save Ministry"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/admin/ministries")}
          className="px-5 py-3 border border-gray-700 rounded-lg"
        >
          Cancel
        </button>

      </div>

    </form>
  );
}