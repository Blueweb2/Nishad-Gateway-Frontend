"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CreateCategoryPage() {
  const { cityId } = useParams<{ cityId: string }>();
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [order, setOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  // 🔹 Auto slug generator
  const generateSlug = (value: string) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  const handleNameChange = (value: string) => {
    setName(value);
    setSlug(generateSlug(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !slug) {
      toast.error("Name and Slug are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${API_URL}/cities/${cityId}/categories`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            slug,
            order,
            isActive,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Failed to create category");
        return;
      }

      toast.success("Category created successfully");

      router.push(`/admin/cities/${cityId}/categories`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-white">
          Create Category
        </h1>
        <p className="text-sm text-white/60 mt-2">
          Add a new category for this city.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-6"
      >
        {/* Name */}
        <div>
          <label className="block text-sm text-white/70 mb-2">
            Category Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-black border border-white/20 text-white focus:outline-none focus:border-emerald-500"
            placeholder="e.g. Business Setup"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm text-white/70 mb-2">
            Slug
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-black border border-white/20 text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Order */}
        <div>
          <label className="block text-sm text-white/70 mb-2">
            Display Order
          </label>
          <input
            type="number"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-lg bg-black border border-white/20 text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Active Toggle */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          <span className="text-sm text-white/70">
            Active
          </span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Category"}
        </button>
      </form>
    </div>
  );
}
