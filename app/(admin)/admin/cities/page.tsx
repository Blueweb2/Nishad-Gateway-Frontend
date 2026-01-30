"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { Search, PlusCircle, Trash2 } from "lucide-react";

type City = {
  _id: string;
  cityName: string;
  citySlug: string;
  cityImage: string;
  bestSuitedFor: string;
  focus: string;
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
      `${c.cityName} ${c.citySlug}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [cities, search]);

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch(`${API_URL}/cities`, {
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data?.message || "Failed to load cities");
          return;
        }

        setCities(data?.cities || []);
      } catch {
        toast.error("Failed to load cities");
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  /* ================= DELETE ================= */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this city?")) return;

    try {
      const res = await fetch(`${API_URL}/cities/id/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        toast.error("Delete failed");
        return;
      }

      toast.success("City deleted");
      setCities((prev) => prev.filter((c) => c._id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-16">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">
              Cities
            </h1>
            <p className="text-sm text-white/60 mt-2">
              Manage city meta, blogs and categories.
            </p>
          </div>

          <Link
            href="/admin/cities/create"
            className="px-4 py-2 rounded-lg bg-emerald-500 text-black text-sm font-semibold hover:bg-emerald-400 flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            Add City
          </Link>
        </div>

        {/* Search */}
        <div className="mt-8">
          <div className="relative w-full md:w-[360px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search city..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-white focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">

          {loading ? (
            <div className="p-10 text-center text-white/60">
              Loading...
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-10 text-center text-white/60">
              No cities found.
            </div>
          ) : (
            filtered.map((city) => (
              <div
                key={city._id}
                className="flex items-center justify-between px-6 py-5 border-b border-white/10 hover:bg-white/5 transition"
              >
                {/* LEFT */}
                <div className="flex items-center gap-4">

                  <div className="relative w-20 h-14 rounded-lg overflow-hidden border border-white/10">
                    {city.cityImage && (
                      <Image
                        src={city.cityImage}
                        alt={city.cityName}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>

                  <div>
                    <p className="text-white font-medium">
                      {city.cityName}
                    </p>
                    <p className="text-xs text-white/50">
                      /{city.citySlug}
                    </p>

                    <span
                      className={`inline-block mt-2 text-xs px-3 py-1 rounded-full ${
                        city.isActive
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-white/10 text-white/60 border border-white/10"
                      }`}
                    >
                      {city.isActive ? "Active" : "Hidden"}
                    </span>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-6">

                  {/* Manage Button */}
                  <Link
                    href={`/admin/cities/${city._id}`}
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium"
                  >
                    Manage
                  </Link>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(city._id)}
                    className="text-red-400 hover:text-red-300 text-sm flex items-center gap-2"
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