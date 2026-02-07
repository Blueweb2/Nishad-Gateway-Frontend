"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { UploadCloud, Trash2 } from "lucide-react";

import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import { cloudinaryAutoWebp } from "@/utils/cloudinary";
import {
  getCityByIdClient,
  updateCityClient,
  deleteCityClient,
} from "@/lib/api/admin/cityBlog.client";

type CityForm = {
  cityName: string;
  citySlug: string;
  cityImage: string;
  heading: string;
  description: string;
  tag: string;
  order: number;
  isActive: boolean;
};

export default function CityMetaPage() {
  const router = useRouter();
  const { cityId } = useParams<{ cityId: string }>();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState<CityForm>({
    cityName: "",
    citySlug: "",
    cityImage: "",
    heading: "",
    description: "",
    tag: "ARTICLE",
    order: 0,
    isActive: true,
  });

  const handleChange = (key: keyof CityForm, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  /* ========================= FETCH CITY ========================= */
  useEffect(() => {
    const fetchCity = async () => {
      try {
        if (!cityId) return;

        const data = await getCityByIdClient(cityId);

        setForm({
          cityName: data.city?.cityName || "",
          citySlug: data.city?.citySlug || "",
          cityImage: data.city?.cityImage || "",
          heading: data.city?.heading || "",
          description: data.city?.description || "",
          tag: data.city?.tag || "ARTICLE",
          order: data.city?.order ?? 0,
          isActive: data.city?.isActive ?? true,
        });
      } catch (err: any) {
        toast.error(err?.response?.data?.message || "Failed to load city");
      } finally {
        setLoading(false);
      }
    };

    fetchCity();
  }, [cityId]);

  /* ========================= IMAGE UPLOAD ========================= */
  const handleUploadImage = async (file: File) => {
    try {
      setUploading(true);

      const uploaded = await uploadToCloudinarySigned(
        file,
        "nishad-gateway/cities"
      );

      handleChange(
        "cityImage",
        cloudinaryAutoWebp(uploaded.secure_url)
      );

      toast.success("Image uploaded");
    } catch (err: any) {
      toast.error(err?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* ========================= UPDATE CITY ========================= */
  const handleUpdate = async () => {
    try {
      if (!cityId) return toast.error("City ID missing");
      if (!form.cityName.trim()) return toast.error("City name required");
      if (!form.citySlug.trim()) return toast.error("City slug required");
      if (!form.heading.trim()) return toast.error("Heading required");

      setSaving(true);

      await updateCityClient(cityId, {
        ...form,
        order: Number(form.order) || 0,
      });

      toast.success("City updated");

      router.push(`/admin/cities/${cityId}`);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  /* ========================= DELETE CITY ========================= */
  const handleDelete = async () => {
    if (!confirm("Delete this city permanently?")) return;

    try {
      if (!cityId) return toast.error("City ID missing");

      await deleteCityClient(cityId);

      toast.success("City deleted");
      router.push("/admin/cities");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return <div className="text-white/60">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">
            City Meta
          </h1>
          <p className="text-sm text-white/60 mt-2">
            Update city core information.
          </p>
        </div>

        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-200 text-sm font-semibold transition flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Delete City
        </button>
      </div>

      {/* Form */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-5">

        <Input
          label="City Name"
          value={form.cityName}
          onChange={(v: string) => handleChange("cityName", v)}
        />

        <Input
          label="City Slug"
          value={form.citySlug}
          onChange={(v: string) => handleChange("citySlug", v)}
        />

        {/* Image */}
        <div>
          <p className="text-sm text-white/70 mb-2">City Image</p>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                value={form.cityImage}
                onChange={(e) => handleChange("cityImage", e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white text-sm"
              />

              <label className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 cursor-pointer">
                <UploadCloud className="w-4 h-4" />
                {uploading ? "Uploading..." : "Upload Image"}
                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    e.target.files && handleUploadImage(e.target.files[0])
                  }
                />
              </label>
            </div>

            {form.cityImage && (
              <div className="relative w-[220px] h-[140px] rounded-xl overflow-hidden border border-white/10">
                <Image
                  src={form.cityImage}
                  alt="City"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* NEW FIELDS */}
        <Textarea
          label="Heading"
          value={form.heading}
          onChange={(v: string) => handleChange("heading", v)}
        />

        <Textarea
          label="Description"
          value={form.description}
          onChange={(v: string) => handleChange("description", v)}
        />

        {/* Active Toggle */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-white/70">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => handleChange("isActive", e.target.checked)}
            />
            Active
          </label>

          <button
            onClick={handleUpdate}
            disabled={saving}
            className="px-5 py-2 rounded-lg bg-emerald-500 text-black font-semibold disabled:opacity-50"
          >
            {saving ? "Updating..." : "Update City"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- inputs ---------- */

function Input({ label, value, onChange }: any) {
  return (
    <div>
      <p className="text-sm text-white/70 mb-2">{label}</p>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white"
      />
    </div>
  );
}

function Textarea({ label, value, onChange }: any) {
  return (
    <div>
      <p className="text-sm text-white/70 mb-2">{label}</p>
      <textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white"
      />
    </div>
  );
}
