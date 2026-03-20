"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { CityTag, CITY_TAGS, CityForm } from "@/lib/types/city";
import ImagePicker from "@/components/admin/common/ImagePicker";

/* ---------- slug helper ---------- */
const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export default function CreateCityPage() {
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  const [isSlugEdited, setIsSlugEdited] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /* ✅ FORM STATE */
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

  /* ---------- handle change ---------- */
  const handleChange = <K extends keyof CityForm>(
    key: K,
    value: CityForm[K]
  ) => {
    setForm((prev) => {
      const updated = { ...prev, [key]: value };

      if (key === "cityName" && !isSlugEdited) {
        updated.citySlug = slugify(value as string);
      }

      return updated;
    });
  };

  /* ---------- submit ---------- */
  const handleSubmit = async () => {
    if (submitting) return;

    try {
      if (!form.cityName.trim())
        return toast.error("City name required");

      if (!form.citySlug.trim())
        return toast.error("City slug required");

      if (!form.heading.trim())
        return toast.error("Heading required");

      if (!form.cityImage)
        return toast.error("City image required");

      setSubmitting(true);

      const res = await fetch(`${API_URL}/cities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...form,
          order: Number(form.order) || 0,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        toast.error(data?.message || "Failed to create city");
        return;
      }

      toast.success("City created successfully");
      router.push(`/admin/cities/${data.city._id}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create city");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 pt-10 pb-16">
        <h1 className="text-3xl font-semibold text-white">
          Add City
        </h1>

        <p className="text-sm text-white/60 mt-2">
          Create a new city to manage its content.
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 space-y-5">

          {/* City Name */}
          <Input
            label="City Name"
            value={form.cityName}
            onChange={(v) => handleChange("cityName", v)}
            placeholder="Jeddah"
          />

          {/* Slug */}
          <div>
            <Input
              label="City Slug"
              value={form.citySlug}
              onChange={(v) => {
                setIsSlugEdited(true);
                handleChange("citySlug", slugify(v));
              }}
              placeholder="jeddah"
              disabled={!form.cityName}
            />
            <p className="text-xs text-white/50 mt-1">
              {isSlugEdited
                ? "Manually edited"
                : "Auto-generated from city name"}
            </p>
          </div>

          {/* ✅ IMAGE PICKER (FIXED) */}
          <div>
            <p className="text-sm text-white/70 mb-2">
              City Image
            </p>

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

          {/* Heading */}
          <Input
            label="Heading"
            value={form.heading}
            onChange={(v) => handleChange("heading", v)}
            placeholder="Business Hub of the Red Sea"
          />

          {/* Description */}
          <Textarea
            label="Description"
            value={form.description}
            onChange={(v) =>
              handleChange("description", v)
            }
            placeholder="City description..."
          />

          {/* Tag + Order */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-white/70 mb-2">
                Tag
              </p>
              <select
                value={form.tag}
                onChange={(e) =>
                  handleChange("tag", e.target.value as CityTag)
                }
                className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white text-sm"
              >
                {CITY_TAGS.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Order"
              value={String(form.order)}
              onChange={(v) =>
                handleChange("order", Number(v))
              }
              type="number"
            />
          </div>

          {/* Active + Submit */}
          <div className="flex items-center justify-between gap-4">
            <label className="text-sm text-white/70">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) =>
                  handleChange("isActive", e.target.checked)
                }
                className="mr-2"
              />
              Active
            </label>

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-5 py-2 rounded-lg bg-emerald-500 text-black text-sm font-semibold hover:bg-emerald-400 transition disabled:opacity-50 flex items-center gap-2"
            >
              {submitting && (
                <span className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full" />
              )}
              {submitting ? "Saving..." : "Save City"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ---------- small components ---------- */

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <p className="text-sm text-white/70 mb-2">{label}</p>
      <input
        value={value}
        type={type}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-2 rounded-lg border border-white/10 text-white text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 ${
          disabled
            ? "bg-white/10 cursor-not-allowed"
            : "bg-white/5"
        }`}
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <p className="text-sm text-white/70 mb-2">{label}</p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
      />
    </div>
  );
}