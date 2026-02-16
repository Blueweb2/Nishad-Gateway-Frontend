"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

import SectionsList from "@/components/admin/city-blog/SectionsList";
import { CityBlogSection } from "@/lib/types/city-blog";
import { createSection } from "@/lib/utils/createSection";
import { normalizeSections } from "@/lib/utils/normalizeSections";

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
  const [open, setOpen] = useState(false);
  const [saveStatus, setSaveStatus] =
    useState<"idle" | "saving" | "saved">("idle");

  const [hasChanges, setHasChanges] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const initialSectionsRef = useRef<CityBlogSection[]>([]);
  const hasFetchedRef = useRef(false);

  /* =========================
     CLOSE DROPDOWN OUTSIDE CLICK
  ========================= */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* =========================
     DIRTY CHECK (REAL COMPARISON)
  ========================= */
  useEffect(() => {
    const isDifferent =
      JSON.stringify(sections) !==
      JSON.stringify(initialSectionsRef.current);

    setHasChanges(isDifferent);
  }, [sections]);

  /* =========================
     BEFORE UNLOAD WARNING
  ========================= */
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!hasChanges) return;
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () =>
      window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasChanges]);

  /* =========================
     FETCH BLOG (STRICT SAFE)
  ========================= */
  const fetchBlog = async () => {
    try {
      if (!API_URL) {
        toast.error("API URL missing");
        return;
      }

      const res = await fetch(
        `${API_URL}/admin/cities/${cityId}/blog`,
        { credentials: "include" }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Failed to load city blog");
        return;
      }

      setCity(data.city);
      setSections(data.sections || []);

      // 🔥 Save snapshot for dirty tracking
      initialSectionsRef.current = data.sections || [];
      setHasChanges(false);

    } catch {
      toast.error("Failed to load city blog");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    fetchBlog();
  }, [cityId]);

  /* =========================
     SAVE BLOG
  ========================= */
  const handleSaveBlog = async () => {
    if (!API_URL) {
      toast.error("API URL missing");
      return;
    }

    try {
      setSaveStatus("saving");

      const normalizedSections = normalizeSections(sections);

      const res = await fetch(
        `${API_URL}/admin/cities/${cityId}/blog`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ sections: normalizedSections }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Save failed");
        setSaveStatus("idle");
        return;
      }

      // Sync state + snapshot
      setSections(normalizedSections);
      initialSectionsRef.current = normalizedSections;
      setHasChanges(false);

      setSaveStatus("saved");
      toast.success("Blog saved successfully");

      setTimeout(() => setSaveStatus("idle"), 2000);

    } catch {
      setSaveStatus("idle");
      toast.error("Failed to save blog");
    }
  };

  /* =========================
     ADD SECTION
  ========================= */
  const addSection = (type: CityBlogSection["type"]) => {
    if (type === "HERO" && sections.some((s) => s.type === "HERO")) {
      toast.error("Only one HERO section is allowed");
      return;
    }

    const newSection = createSection(type, sections);
    setSections((prev) => [...prev, newSection]);
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

          <div className="flex items-center gap-4">

            {/* SAVE BUTTON */}
            <button
              onClick={handleSaveBlog}
              disabled={saveStatus === "saving"}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                saveStatus === "saving"
                  ? "bg-yellow-500 text-black"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
              }`}
            >
              {saveStatus === "saving"
                ? "Saving..."
                : saveStatus === "saved"
                ? "Saved ✓"
                : "Save Changes"}
            </button>

            {/* ADD SECTION */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm"
              >
                + Add Section
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg bg-[#1a1f1a] border border-white/10 shadow-lg z-50">
                  {[
                    "HERO",
                    "CATEGORIES",
                    "VISION",
                    "INVESTMENT_HIGHLIGHTS",
                    "BUSINESS_SETUP_OPTIONS",
                    "INFRASTRUCTURE",
                    "LANDMARKS",
                    "FOOD_GUIDE",
                    "TRANSPORTATION_GUIDE",
                    "EXPANDABLE_SNAPSHOT",
                    "FUTURE_OUTLOOK",
                  ].map((type) => {
                    const isHeroDisabled =
                      type === "HERO" &&
                      sections.some((s) => s.type === "HERO");

                    return (
                      <button
                        key={type}
                        disabled={isHeroDisabled}
                        onClick={() => {
                          addSection(type as CityBlogSection["type"]);
                          setOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm transition ${
                          isHeroDisabled
                            ? "text-white/30 cursor-not-allowed"
                            : "text-white hover:bg-white/10"
                        }`}
                      >
                        {type.replaceAll("_", " ")}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

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
