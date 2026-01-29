"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { Search, Pencil, PlusCircle, Trash2 } from "lucide-react";

type City = {
  _id: string;
  cityName: string;
  citySlug: string;
  cityImage: string;

  bestSuitedFor: string;
  focus: string;
  tag: string;
  order: number;
  isActive: boolean;
};

export default function AdminCitiesPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return cities.filter((c) =>
      `${c.cityName} ${c.citySlug}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [cities, search]);

  const fetchCities = async () => {
    try {
      if (!API_URL) return toast.error("API URL missing");
      setLoading(true);

      const res = await fetch(`${API_URL}/cities`, {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Failed to load cities");
        return;
      }

      setCities(data?.cities || []);
    } catch (err) {
      toast.error("Failed to load cities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this city?")) return;

    try {
      if (!API_URL) return toast.error("API URL missing");

      const res = await fetch(`${API_URL}/cities/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        toast.error(data?.message || "Delete failed");
        return;
      }

      toast.success("City deleted");
      fetchCities();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-16">
        {/* Header */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold text-white">Cities</h1>
            <p className="text-sm text-white/60 mt-2">
              Manage cities used in Home page and Service blog sections.
            </p>
          </div>

          <Link
            href="/admin/cities/create"
            className="px-4 py-2 rounded-lg bg-emerald-500 text-black text-sm font-semibold hover:bg-emerald-400 transition flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            Add City
          </Link>
        </div>

        {/* Search */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="relative w-full md:w-[360px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search city..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-white outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="grid grid-cols-12 px-4 py-3 text-xs font-medium text-white/50 border-b border-white/10">
            <div className="col-span-5">City</div>
            <div className="col-span-2">Slug</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1">Order</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {loading ? (
            <div className="p-10 text-center text-white/60">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="p-10 text-center text-white/60">
              No cities found.
            </div>
          ) : (
            filtered.map((city) => (
              <div
                key={city._id}
                className="grid grid-cols-12 items-center px-4 py-4 border-b border-white/10 hover:bg-white/5 transition"
              >
                {/* City */}
                <div className="col-span-5 flex items-center gap-4">
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-black/40 border border-white/10">
                    {city.cityImage ? (
                      <Image
                        src={city.cityImage}
                        alt={city.cityName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/30 text-xs">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="font-medium text-white truncate">
                      {city.cityName}
                    </p>
                    <p className="text-xs text-white/50 truncate">
                      {city.bestSuitedFor || "—"}
                    </p>
                  </div>
                </div>

                {/* Slug */}
                <div className="col-span-2">
                  <span className="text-sm text-white/70">{city.citySlug}</span>
                </div>

                {/* Status */}
                <div className="col-span-2">
                  {city.isActive ? (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Active
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/60 border border-white/10">
                      Hidden
                    </span>
                  )}
                </div>

                {/* Order */}
                <div className="col-span-1">
                  <span className="text-sm text-white/70">{city.order}</span>
                </div>

                {/* Actions */}
                  <div className="col-span-2 flex justify-end gap-2">
                    {/* Edit City Meta */}
                    <Link
                      href={`/admin/cities/edit/${city._id}`}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/10 bg-white/5 hover:bg-white/10 text-white transition flex items-center gap-2"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </Link>


                    {/* Manage Blog */}
                    <Link
                      href={`/admin/cities/blog/${city._id}`}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-200 transition flex items-center gap-2"
                    >
                       Blog
                    </Link>


                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(city._id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-200 transition flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}