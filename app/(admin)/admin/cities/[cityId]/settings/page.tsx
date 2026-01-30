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

type Blog = {
  status: "DRAFT" | "PUBLISHED";
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
        const cityRes = await fetch(
          `${API_URL}/cities/id/${cityId}`,
          { credentials: "include" }
        );
        const cityData = await cityRes.json();

        const blogRes = await fetch(
          `${API_URL}/cities/id/${cityId}/blog`,
          { credentials: "include" }
        );
        const blogData = await blogRes.json();

        if (cityRes.ok) setCity(cityData.city);
        if (blogRes.ok) setBlogStatus(blogData.status || "DRAFT");
      } catch {
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };

    if (cityId) fetchData();
  }, [cityId]);

  /* =========================
     SAVE SETTINGS
  ========================= */
  const handleSave = async () => {
    if (!city) return;

    try {
      setSaving(true);

      // Update City Active State
      await fetch(`${API_URL}/cities/id/${cityId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          isActive: city.isActive,
        }),
      });

      // Update Blog Status
      await fetch(`${API_URL}/cities/id/${cityId}/blog`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          sections: [], // your backend expects sections, so handle carefully
          status: blogStatus,
        }),
      });

      toast.success("Settings updated");
    } catch {
      toast.error("Failed to save settings");
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
      await fetch(`${API_URL}/cities/id/${cityId}`, {
        method: "DELETE",
        credentials: "include",
      });

      toast.success("City deleted");
      router.push("/admin/cities");
    } catch {
      toast.error("Failed to delete city");
    }
  };

  if (loading) return <div className="text-white/60">Loading...</div>;
  if (!city) return <div className="text-red-400">City not found</div>;

  return (
    <div className="space-y-10">
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
            setBlogStatus(e.target.value as any)
          }
          className="px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
        >
          <option value="DRAFT">DRAFT</option>
          <option value="PUBLISHED">PUBLISHED</option>
        </select>
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="px-5 py-2 rounded-lg bg-emerald-500 text-black font-semibold flex items-center gap-2"
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