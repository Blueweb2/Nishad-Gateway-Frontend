"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function MediaCleanupPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(false);

  const handleCleanup = async () => {
    try {
      if (!API_URL) return;

      setLoading(true);

      const res = await fetch(`${API_URL}/admin/cleanup-media`, {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Cleanup failed");
        return;
      }

      toast.success(`Deleted ${data.deleted} unused images`);
    } catch (err) {
      toast.error("Cleanup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-10 text-white">
      <h1 className="text-2xl font-semibold mb-6">
        Cloudinary Media Cleanup
      </h1>

      <p className="text-white/60 mb-6">
        This will delete unused images from Cloudinary.
        Only images not referenced in DB will be removed.
      </p>

      <button
        onClick={handleCleanup}
        disabled={loading}
        className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition"
      >
        {loading ? "Cleaning..." : "Run Cleanup"}
      </button>
    </main>
  );
}
