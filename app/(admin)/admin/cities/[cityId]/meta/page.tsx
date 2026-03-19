"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

import {
  getCityByIdClient,
  updateCityClient,
  deleteCityClient,
} from "@/lib/api/admin/cityBlog.client";

import ImagePicker from "@/components/admin/common/ImagePicker";

/* ================= TYPES ================= */

type CityForm = {
  cityName: string;
  citySlug: string;

  /* IMAGE */
  cityImage: string;
  cityImageAlt?: string;
  cityImagePublicId?: string;

  /* CONTENT */
  heading: string;
  description: string;

  /* META */
  tag: string;
  order: number;
  isActive: boolean;
};

export default function CityMetaPage() {
  const router = useRouter();
  const { cityId } = useParams<{ cityId: string }>();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ================= FORM STATE ================= */

  const [form, setForm] = useState<CityForm>({
    cityName: "",
    citySlug: "",

    cityImage: "",
    cityImageAlt: "",
    cityImagePublicId: "",

    heading: "",
    description: "",

    tag: "ARTICLE",
    order: 0,
    isActive: true,
  });

  const handleChange = (key: keyof CityForm, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  /* ================= FETCH CITY ================= */

  useEffect(() => {
    const fetchCity = async () => {
      try {
        if (!cityId) return;

        const data = await getCityByIdClient(cityId);

        setForm({
          cityName: data.city?.cityName || "",
          citySlug: data.city?.citySlug || "",

          cityImage: data.city?.cityImage || "",
          cityImageAlt: data.city?.cityImageAlt || "",
          cityImagePublicId: data.city?.cityImagePublicId || "",

          heading: data.city?.heading || "",
          description: data.city?.description || "",

          tag: data.city?.tag || "ARTICLE",
          order: data.city?.order ?? 0,
          isActive: data.city?.isActive ?? true,
        });
      } catch (err: any) {
        toast.error(err?.message || "Failed to load city");
      } finally {
        setLoading(false);
      }
    };

    fetchCity();
  }, [cityId]);

  /* ================= UPDATE ================= */

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
      toast.error(err?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  /* ================= DELETE ================= */

  const handleDelete = async () => {
    if (!confirm("Delete this city permanently?")) return;

    try {
      if (!cityId) return toast.error("City ID missing");

      await deleteCityClient(cityId);

      toast.success("City deleted");
      router.push("/admin/cities");
    } catch (err: any) {
      toast.error(err?.message || "Delete failed");
    }
  };

  if (loading) {
    return <div className="text-white/60">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}
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

      {/* ================= FORM ================= */}
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

        {/* ================= IMAGE PICKER ================= */}
        <div>
          <p className="text-sm text-white/70 mb-2">City Image</p>

          <ImagePicker
            value={
              form.cityImage
                ? {
                    url: form.cityImage,
                    alt: form.cityImageAlt,
                    publicId: form.cityImagePublicId,
                  }
                : null
            }
            folder="nishad-gateway/cities"
            onChange={(img) =>
              setForm((prev) => ({
                ...prev,
                cityImage: img?.url || "",
                cityImageAlt: img?.alt || "",
                cityImagePublicId: img?.publicId || "",
              }))
            }
          />
        </div>

        {/* ================= CONTENT ================= */}
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

        {/* ================= ACTIVE + SUBMIT ================= */}
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

/* ================= INPUTS ================= */

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