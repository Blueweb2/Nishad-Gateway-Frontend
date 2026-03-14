"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

type City = {
  _id: string;
  cityName: string;
  citySlug: string;
  isActive: boolean;
};

type Blog = {
  status: "DRAFT" | "PUBLISHED";
};

export default function CityDashboardPage() {
  const { cityId } = useParams<{ cityId: string }>();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [city, setCity] = useState<City | null>(null);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [categoryCount, setCategoryCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!API_URL) return;

        // Fetch City
        const cityRes = await fetch(
          `${API_URL}/admin/cities/${cityId}`,
          { credentials: "include" }
        );

        const cityData = await cityRes.json();
        if (!cityRes.ok) throw new Error();

        setCity(cityData.city);

        // Fetch Blog
        const blogRes = await fetch(
          `${API_URL}/admin/cities/${cityId}/blog`,
          { credentials: "include" }
        );

        const blogData = await blogRes.json();
        if (blogRes.ok) {
          setBlog({ status: blogData.status });
        }

        // Fetch Categories
        const catRes = await fetch(
          `${API_URL}/admin/cities/${cityId}/categories`,
          { credentials: "include" }
        );

        const catData = await catRes.json();
        if (catRes.ok) {
          setCategoryCount(catData.categories?.length || 0);
        }
      } catch {
        toast.error("Failed to load city dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cityId, API_URL]);

  if (loading) {
    return <div className="text-white/60">Loading...</div>;
  }

  if (!city) {
    return <div className="text-red-400">City not found</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-white">
          {city.cityName}
        </h1>
        <p className="text-sm text-white/50 mt-1">
          /cities/{city.citySlug}
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* City Status */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-sm text-white/50">City Status</h3>
          <p className="mt-3 text-lg font-semibold text-white">
            {city.isActive ? "Active" : "Hidden"}
          </p>
        </div>

        {/* Blog Status */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-sm text-white/50">Blog Status</h3>
          <p className="mt-3 text-lg font-semibold text-white">
            {blog?.status || "DRAFT"}
          </p>
        </div>

        {/* Categories */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-sm text-white/50">Total Categories</h3>
          <p className="mt-3 text-lg font-semibold text-white">
            {categoryCount}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-sm text-white/50 mb-4">
          Quick Actions
        </h3>

        <div className="flex flex-wrap gap-4">
          <Link
            href={`/admin/cities/${cityId}/meta`}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm"
          >
            Edit Meta
          </Link>

          <Link
            href={`/admin/cities/${cityId}/blog`}
            className="px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 text-sm"
          >
            Manage city Guide
          </Link>

          <Link
            href={`/admin/cities/${cityId}/categories`}
            className="px-4 py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 text-sm"
          >
            Manage Categories
          </Link>

          <Link
            href={`/admin/cities/${cityId}/settings`}
            className="px-4 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 text-sm"
          >
            City Settings
          </Link>
        </div>
      </div>
    </div>
  );
}