"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

import SectionsList from "@/components/admin/city-blog/SectionsList";
import { CityBlogSection } from "@/lib/types/city-blog";
import { v4 as uuid } from "uuid";

type City = {
  _id: string;
  cityName: string;
  citySlug: string;
};

export default function AdminCityBlogPage() {
  const { cityId } = useParams<{ cityId: string }>();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [city, setCity] = useState<City | null>(null);
  const [sections, setSections] = useState<CityBlogSection[]>([]);
  const [loading, setLoading] = useState(true);

  const [saveStatus, setSaveStatus] =
    useState<"idle" | "saving" | "saved">("idle");

  const initialLoadRef = useRef(true);

  /* =========================
     FETCH BLOG
  ========================= */
  const fetchBlog = async () => {
    try {
      if (!API_URL) return toast.error("API URL missing");

      const res = await fetch(`${API_URL}/cities/${cityId}/blog`, {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Failed to load city blog");
        return;
      }

      setCity(data.city);
      setSections(data.sections || []);
    } catch {
      toast.error("Failed to load city blog");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [cityId]);

  /* =========================
     SAVE BLOG
  ========================= */
  const handleSaveBlog = async (sectionsToSave: CityBlogSection[]) => {
    try {
      if (!API_URL) return;

      await fetch(`${API_URL}/cities/${cityId}/blog`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ sections: sectionsToSave }),
      });
    } catch {
      console.error("Auto-save failed");
    }
  };

  /* =========================
     AUTO SAVE (DEBOUNCED)
  ========================= */
  useEffect(() => {
    if (initialLoadRef.current) {
      initialLoadRef.current = false;
      return;
    }

    setSaveStatus("saving");

    const timeout = setTimeout(async () => {
      await handleSaveBlog(sections);
      setSaveStatus("saved");

      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 1200);

    return () => clearTimeout(timeout);
  }, [sections]);

  /* =========================
     ADD SECTION
  ========================= */
 const addSection = (type: CityBlogSection["type"]) => {
  const baseSection = {
    id: uuid(), // ✅ stable id
    type,
    title: `${type} Section`,
    order: sections.length + 1,
    isActive: true,
  };

  let content: any = {};

  switch (type) {
    case "HERO":
      content = {
        heading: "",
        subheading: "",
        backgroundImage: "",
        ctaText: "",
        ctaLink: "",
      };
      break;

    case "CATEGORIES":
      content = {
        heading: "",
        introText: "",
      };
      break;

    case "VISION":
      content = {
        heading: "",
        content: "",
        imageUrl: "",
      };
      break;

    case "FAQ":
      content = { faqs: [] };
      break;
  }

  setSections((prev) => [...prev, { ...baseSection, content }]);
};


  /* =========================
     LOADING STATES
  ========================= */
  if (loading) {
    return (
      <main className="min-h-screen px-6 pt-10 text-white/60">
        Loading city blog...
      </main>
    );
  }

  if (!city) {
    return (
      <main className="min-h-screen px-6 pt-10 text-red-400">
        City not found
      </main>
    );
  }

  /* =========================
     RENDER
  ========================= */
  return (
    <main className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6 pt-10 pb-16">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">

          {/* LEFT */}
          <div>
            <Link
              href="/admin/cities"
              className="text-sm text-white/60 hover:text-white flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Cities
            </Link>

            <h1 className="text-3xl font-semibold text-white mt-3">
              City Blog – {city.cityName}
            </h1>

            <p className="text-sm text-white/60 mt-1">
              Manage sections shown on{" "}
              <code>/cities/{city.citySlug}</code>
            </p>
          </div>

          {/* RIGHT CONTROLS */}
          <div className="flex items-center gap-4">

            {/* Save Status Indicator */}
            <span
              className={`text-sm transition ${
                saveStatus === "saving"
                  ? "text-yellow-400"
                  : saveStatus === "saved"
                  ? "text-emerald-400"
                  : "text-white/40"
              }`}
            >
              {saveStatus === "saving" && "Saving..."}
              {saveStatus === "saved" && "Saved ✓"}
            </span>

            {/* Add Section Dropdown */}
            <select
              onChange={(e) => {
                if (!e.target.value) return;
                addSection(e.target.value as CityBlogSection["type"]);
                e.target.value = "";
              }}
              className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm"
            >
              <option value="">+ Add Section</option>
              <option value="HERO">HERO</option>
              <option value="CATEGORIES">CATEGORIES</option>
              <option value="VISION">VISION</option>
              <option value="FAQ">FAQ</option>
            </select>
          </div>
        </div>

        {/* SECTIONS */}
        <SectionsList
          sections={sections}
          setSections={setSections}
        />
      </div>
    </main>
  );
}
