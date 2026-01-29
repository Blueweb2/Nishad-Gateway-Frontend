"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { UploadCloud, Trash2, ArrowLeft } from "lucide-react";

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
  bestSuitedFor: string;
  focus: string;
  tag: string;
  order: number;
  isActive: boolean;
};

export default function EditCityPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const cityId = params?.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState<CityForm>({
    cityName: "",
    citySlug: "",
    cityImage: "",
    bestSuitedFor: "",
    focus: "",
    tag: "ARTICLE",
    order: 0,
    isActive: true,
  });

  const handleChange = (key: keyof CityForm, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  /* =========================
     FETCH CITY
  ========================= */
  const fetchCity = async () => {
    try {
      if (!cityId) return;

      setLoading(true);
      const data = await getCityByIdClient(cityId);

      setForm({
        cityName: data.city?.cityName || "",
        citySlug: data.city?.citySlug || "",
        cityImage: data.city?.cityImage || "",
        bestSuitedFor: data.city?.bestSuitedFor || "",
        focus: data.city?.focus || "",
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

  useEffect(() => {
    fetchCity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityId]);

  /* =========================
     IMAGE UPLOAD
  ========================= */
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

  /* =========================
     UPDATE CITY
  ========================= */
  const handleUpdate = async () => {
    try {
      if (!cityId) return toast.error("City ID missing");
      if (!form.cityName.trim()) return toast.error("City name required");
      if (!form.citySlug.trim()) return toast.error("City slug required");

      setSaving(true);
      await updateCityClient(cityId, form);

      toast.success("City updated");
      router.push("/admin/cities");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  /* =========================
     DELETE CITY
  ========================= */
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
    return (
      <main className="min-h-screen">
        <div className="max-w-3xl mx-auto px-6 pt-10 pb-16 text-white/70">
          Loading...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 pt-10 pb-16">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link
              href="/admin/cities"
              className="text-white/70 hover:text-white flex items-center gap-2 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>

            <h1 className="text-3xl font-semibold text-white mt-3">
              Edit City
            </h1>
            <p className="text-sm text-white/60 mt-2">
              Update city details used in Home and Service blogs.
            </p>
          </div>

          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-200 text-sm font-semibold transition flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>

        {/* Form */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 space-y-5">
          <Input label="City Name" value={form.cityName} onChange={(v: string) => handleChange("cityName", v)} />
          <Input label="City Slug" value={form.citySlug} onChange={(v: string) => handleChange("citySlug", v)} />

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
                    onChange={(e) => e.target.files && handleUploadImage(e.target.files[0])}
                  />
                </label>
              </div>

              <div className="relative w-[220px] h-[140px] rounded-xl overflow-hidden border border-white/10">
                {form.cityImage && (
                  <Image src={form.cityImage} alt="City" fill className="object-cover" />
                )}
              </div>
            </div>
          </div>

          <Textarea label="Best Suited For" value={form.bestSuitedFor} onChange={(v: string) => handleChange("bestSuitedFor", v)} />
          <Textarea label="Focus" value={form.focus} onChange={(v: string) => handleChange("focus", v)} />

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
              className="px-5 py-2 rounded-lg bg-emerald-500 text-black font-semibold"
            >
              {saving ? "Updating..." : "Update City"}
            </button>
          </div>
        </div>
      </div>
    </main>
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