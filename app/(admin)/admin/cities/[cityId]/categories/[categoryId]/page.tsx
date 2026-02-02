"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import SectionsList from "@/components/admin/city-blog/SectionsList";
import type { CityBlogSection } from "@/lib/types/city-blog";

type Category = {
  _id: string;
  name: string;
  slug: string;
};

export default function CategoryBlogPage() {
  const { cityId, categoryId } = useParams<{
    cityId: string;
    categoryId: string;
  }>();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [category, setCategory] = useState<Category | null>(null);
  const [sections, setSections] = useState<CityBlogSection[]>([]);
  const [loading, setLoading] = useState(true);

  /* ======================================================
     FETCH CATEGORY + BLOG
  ====================================================== */
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!API_URL) return;

        // 1️⃣ Fetch category info
        const catRes = await fetch(
          `${API_URL}/cities/${cityId}/categories/${categoryId}`,
          { credentials: "include" }
        );

        const catData = await catRes.json();

        if (!catRes.ok) {
          toast.error(catData?.message || "Failed to load category");
          return;
        }

        setCategory(catData.category);

        // 2️⃣ Fetch category blog
        const blogRes = await fetch(
          `${API_URL}/cities/${cityId}/categories/${categoryId}/blog`,
          { credentials: "include" }
        );

        const blogData = await blogRes.json();

        if (blogRes.ok) {
          setSections(blogData.sections || []);
        }
      } catch {
        toast.error("Failed to load category blog");
      } finally {
        setLoading(false);
      }
    };

    if (cityId && categoryId) fetchData();
  }, [cityId, categoryId]);

  /* ======================================================
     SAVE BLOG
  ====================================================== */
  const handleSave = async () => {
    try {
      const res = await fetch(
        `${API_URL}/cities/${cityId}/categories/${categoryId}/blog`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ sections }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Save failed");
        return;
      }

      toast.success("Category blog saved");
    } catch {
      toast.error("Failed to save blog");
    }
  };

  /* ======================================================
     RENDER
  ====================================================== */
  if (loading) {
    return <div className="text-white/60">Loading...</div>;
  }

  if (!category) {
    return <div className="text-red-400">Category not found</div>;
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">
            {category.name} Blog
          </h1>
          <p className="text-sm text-white/60 mt-2">
            /{category.slug}
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2 rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400"
        >
          Save Blog
        </button>
      </div>

      {/* Sections Editor */}
      <SectionsList
        sections={sections}
        setSections={setSections}
      />
    </div>
  );
}