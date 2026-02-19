"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

type Category = {
  _id: string;
  name: string;
  slug: string;
  order: number;
  isActive: boolean;
};

export default function CityCategoriesPage() {
  const { cityId } = useParams<{ cityId: string }>();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  /* ======================================================
     FETCH CATEGORIES
  ====================================================== */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${API_URL}/admin/cities/${cityId}/categories`,
          { credentials: "include" }
        );

        const data = await res.json();

        if (!res.ok) {
          toast.error(data?.message || "Failed to load categories");
          return;
        }

        setCategories(data.categories || []);
      } catch {
        toast.error("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    if (cityId) fetchCategories();
  }, [cityId]);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">
            Categories
          </h1>
          <p className="text-sm text-white/60 mt-2">
            Manage blog categories for this city.
          </p>
        </div>

        <Link
          href={`/admin/cities/${cityId}/categories/create`}
          className="px-4 py-2 rounded-lg bg-emerald-500 text-black text-sm font-semibold hover:bg-emerald-400 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-white/60">Loading categories...</div>
      ) : categories.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-white/60">
          No categories created yet.
        </div>
      ) : (
        <div className="space-y-4">
          {[...categories]
            .sort((a, b) => a.order - b.order)
            .map((category) => (
              <div
                key={category._id}
                className="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
              >
                <div className="flex items-center justify-between">

                  {/* Left Info */}
                  <div>
                    <h2 className="text-white font-semibold">
                      {category.name}
                    </h2>

                    <p className="text-xs text-white/50 mt-1">
                      Slug: {category.slug}
                    </p>

                    <p className="text-xs text-white/50 mt-1">
                      Order: {category.order}
                    </p>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-4">

                    <span
                      className={`text-xs px-3 py-1 rounded-full ${category.isActive
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-red-500/20 text-red-400 border border-red-500/30"
                        }`}
                    >
                      {category.isActive ? "Active" : "Inactive"}
                    </span>

                    {/* <Link
                      href={`/admin/cities/${cityId}/categories/${category._id}`}
                      className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm"
                    >
                      Manage Single Category
                    </Link> */}

                    <Link
                      href={`/admin/cities/${cityId}/categories/${category._id}/blogs`}
                      className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm"
                    >
                      Manage Blogs
                    </Link>

                  </div>

                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}