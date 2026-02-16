"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Save, Trash2 } from "lucide-react";

type City = {
  _id: string;
  cityName: string;
  isActive: boolean;
};

export default function CitySettingsPage() {
  const { cityId } = useParams<{ cityId: string }>();
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [city, setCity] = useState<City | null>(null);
  const [blogStatus, setBlogStatus] = useState<"DRAFT" | "PUBLISHED">("DRAFT");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* =========================
     FETCH DATA
  ========================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!API_URL || !cityId) return;

        // Fetch city
        const cityRes = await fetch(
          `${API_URL}/admin/cities/${cityId}`,
          { credentials: "include" }
        );

        const cityData = await cityRes.json();
        if (!cityRes.ok) {
          toast.error(cityData?.message || "Failed to load city");
          return;
        }

        setCity(cityData.city);

        // Fetch blog
        const blogRes = await fetch(
          `${API_URL}/admin/cities/${cityId}/blog`,
          { credentials: "include" }
        );

        const blogData = await blogRes.json();
        if (blogRes.ok) {
          setBlogStatus(blogData.status || "DRAFT");
        }

      } catch (err) {
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cityId, API_URL]);

  /* =========================
     SAVE SETTINGS
  ========================= */
  const handleSave = async () => {
    if (!city || !API_URL || !cityId) return;

    try {
      setSaving(true);

      /* ======================
         1️⃣ Update City
      ====================== */
      const cityRes = await fetch(
        `${API_URL}/admin/cities/${cityId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            isActive: city.isActive,
          }),
        }
      );

      const cityData = await cityRes.json();
      if (!cityRes.ok) {
        toast.error(cityData?.message || "Failed to update city");
        return;
      }

      /* ======================
         2️⃣ Update Blog Status ONLY
      ====================== */
      const blogRes = await fetch(
        `${API_URL}/admin/cities/${cityId}/blog`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            status: blogStatus,
          }),
        }
      );

      const blogData = await blogRes.json();
      if (!blogRes.ok) {
        toast.error(blogData?.message || "Failed to update blog status");
        return;
      }

      toast.success("Settings updated successfully");

    } catch (err) {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  /* =========================
     DELETE CITY
  ========================= */
  const handleDelete = async () => {
    if (!API_URL || !cityId) return;
    if (!confirm("Delete this city permanently?")) return;

    try {
      const res = await fetch(
        `${API_URL}/admin/cities/${cityId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        const data = await res.json();
        toast.error(data?.message || "Failed to delete city");
        return;
      }

      toast.success("City deleted successfully");
      router.push("/admin/cities");

    } catch (err) {
      toast.error("Failed to delete city");
    }
  };

  if (loading) {
    return <div className="text-white/60">Loading...</div>;
  }

  if (!city) {
    return <div className="text-red-400">City not found</div>;
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-white">
          Settings
        </h1>
        <p className="text-sm text-white/60 mt-2">
          Control visibility and publishing.
        </p>
      </div>

      {/* Visibility */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-4">
        <h2 className="text-white font-medium">Visibility</h2>

        <label className="flex items-center gap-3 text-sm text-white">
          <input
            type="checkbox"
            checked={city.isActive}
            onChange={(e) =>
              setCity({ ...city, isActive: e.target.checked })
            }
          />
          City is visible on website
        </label>
      </div>

      {/* Blog Publish */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-4">
        <h2 className="text-white font-medium">Blog Status</h2>

        <select
          value={blogStatus}
          onChange={(e) =>
            setBlogStatus(e.target.value as "DRAFT" | "PUBLISHED")
          }
          className="px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
        >
          <option value="DRAFT">DRAFT</option>
          <option value="PUBLISHED">PUBLISHED</option>
        </select>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="px-5 py-2 rounded-lg bg-emerald-500 text-black font-semibold flex items-center gap-2 disabled:opacity-50"
      >
        <Save className="w-4 h-4" />
        {saving ? "Saving..." : "Save Settings"}
      </button>

      {/* Danger Zone */}
      <div className="border-t border-white/10 pt-6">
        <h2 className="text-red-400 font-medium mb-3">
          Danger Zone
        </h2>

        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Delete City
        </button>
      </div>
    </div>
  );
}
