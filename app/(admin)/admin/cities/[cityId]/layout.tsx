"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  LayoutDashboard,
  FileText,
  Folder,
  Settings,
  Info,
} from "lucide-react";

type City = {
  _id: string;
  cityName: string;
  citySlug: string;
};

export default function CityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { cityId } = useParams<{ cityId: string }>();
  const pathname = usePathname();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [city, setCity] = useState<City | null>(null);

  /* ======================================================
     FETCH CITY INFO (for sidebar title)
  ====================================================== */
  useEffect(() => {
    const fetchCity = async () => {
      try {
        if (!API_URL) return;

        const res = await fetch(
          `${API_URL}/cities/id/${cityId}`,
          { credentials: "include" }
        );

        const data = await res.json();
        if (!res.ok) return;

        setCity(data.city);
      } catch {
        toast.error("Failed to load city");
      }
    };

    if (cityId) fetchCity();
  }, [cityId, API_URL]);

  /* ======================================================
     HELPER: Active link checker
  ====================================================== */
  const isActive = (path: string) =>
    pathname.startsWith(path);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-black/30 p-6 flex flex-col">
        {/* City Title */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white">
            {city?.cityName || "City"}
          </h2>
          <p className="text-xs text-white/50">
            /cities/{city?.citySlug}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 text-sm">

          <Link
            href={`/admin/cities/${cityId}`}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
              isActive(`/admin/cities/${cityId}`) &&
              !pathname.includes("meta") &&
              !pathname.includes("blog") &&
              !pathname.includes("categories") &&
              !pathname.includes("settings")
                ? "bg-white/10 text-white"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Overview
          </Link>

          <Link
            href={`/admin/cities/${cityId}/meta`}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
              isActive(`/admin/cities/${cityId}/meta`)
                ? "bg-white/10 text-white"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Info className="w-4 h-4" />
            Meta
          </Link>

          <Link
            href={`/admin/cities/${cityId}/blog`}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
              isActive(`/admin/cities/${cityId}/blog`)
                ? "bg-white/10 text-white"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            <FileText className="w-4 h-4" />
            Blog
          </Link>

          <Link
            href={`/admin/cities/${cityId}/categories`}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
              isActive(`/admin/cities/${cityId}/categories`)
                ? "bg-white/10 text-white"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Folder className="w-4 h-4" />
            Categories
          </Link>

          <Link
            href={`/admin/cities/${cityId}/settings`}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
              isActive(`/admin/cities/${cityId}/settings`)
                ? "bg-white/10 text-white"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Settings className="w-4 h-4" />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-gradient-to-br from-black via-[#0f0f0f] to-black">
        {children}
      </main>
    </div>
  );
}