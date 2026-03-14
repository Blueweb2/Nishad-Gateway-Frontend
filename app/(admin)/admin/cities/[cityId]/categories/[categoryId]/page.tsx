"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type Category = {
  _id: string;
  name: string;
  slug: string;
};

export default function CategoryDashboard() {
  const { cityId, categoryId } = useParams<{
    cityId: string;
    categoryId: string;
  }>();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  /* ======================================================
     FETCH SINGLE CATEGORY
  ====================================================== */

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(
          `${API_URL}/admin/cities/${cityId}/categories/${categoryId}`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        // Adjust depending on API response
        setCategory(data.data || data.category || data);
      } catch (error) {
        console.error("Failed to fetch category", error);
      } finally {
        setLoading(false);
      }
    };

    if (cityId && categoryId) fetchCategory();
  }, [cityId, categoryId, API_URL]);

  return (
    <div className="space-y-10">

      {/* HEADER */}

      <div>
        <h1 className="text-3xl font-semibold text-white">
          {loading ? "Loading..." : category?.name || "Category"}
        </h1>

        <p className="text-sm text-white/60 mt-2">
          {loading
            ? "Fetching category details..."
            : `Manage overview and listings for the ${category?.name} page`}
        </p>
      </div>

      {/* OVERVIEW */}

      <div className="bg-white/5 border border-white/10 rounded-xl p-6">

        <h2 className="text-lg text-white font-semibold">
          Overview
        </h2>

        <p className="text-sm text-white/60 mt-2">
          Edit the overview content shown at the top of the category page.
        </p>

        <Link
          href={`/admin/cities/${cityId}/categories/${categoryId}/overview`}
          className="inline-block mt-4 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm"
        >
          Edit Overview
        </Link>

      </div>

      {/* LISTINGS */}

      <div className="bg-white/5 border border-white/10 rounded-xl p-6">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-lg text-white font-semibold">
              Listings
            </h2>

            <p className="text-sm text-white/60 mt-2">
              Manage listings such as restaurants or businesses.
            </p>
          </div>

          <Link
            href={`/admin/cities/${cityId}/categories/${categoryId}/listings/create`}
            className="px-4 py-2 rounded-lg bg-emerald-500 text-black text-sm font-semibold hover:bg-emerald-400"
          >
            + Add Listing
          </Link>

        </div>

        <Link
          href={`/admin/cities/${cityId}/categories/${categoryId}/listings`}
          className="inline-block mt-4 text-sm text-blue-400 hover:underline"
        >
          View Listings →
        </Link>

      </div>

    </div>
  );
}