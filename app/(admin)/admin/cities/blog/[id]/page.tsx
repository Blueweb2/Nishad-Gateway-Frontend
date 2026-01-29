"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

import SectionsList from "@/components/admin/city-blog/SectionsList";
import { CityBlogSection } from "@/lib/types/city-blog";

type City = {
    _id: string;
    cityName: string;
    citySlug: string;
};


export default function AdminCityBlogPage() {
    const { id } = useParams<{ id: string }>();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const [city, setCity] = useState<City | null>(null);
    const [sections, setSections] = useState<CityBlogSection[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBlog = async () => {
        try {
            if (!API_URL) return toast.error("API URL missing");

            const res = await fetch(`${API_URL}/cities/id/${id}/blog`, {
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
    }, [id]);

    const addHeroSection = () => {
        setSections((prev) => [
            ...prev,
            {
                type: "HERO",
                title: "Hero Section",
                content: {
                    heading: "",
                    subheading: "",
                    backgroundImage: "",
                    ctaText: "",
                },
                order: prev.length + 1,
                isActive: true,
            },
        ]);
    };

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

    const handleSaveBlog = async () => {
        try {
            if (!API_URL) return toast.error("API URL missing");

            const res = await fetch(
                `${API_URL}/cities/id/${id}/blog`,
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

            toast.success("City blog saved");
        } catch {
            toast.error("Failed to save city blog");
        }
    };

    return (
        <main className="min-h-screen">
            <div className="max-w-5xl mx-auto px-6 pt-10 pb-16">
                {/* Header */}
                <div className="flex items-start justify-between gap-6">
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
                            Manage sections shown on <code>/cities/{city.citySlug}</code>
                        </p>
                    </div>

                    <button
                        onClick={addHeroSection}
                        className="px-4 py-2 rounded-lg bg-emerald-500 text-black text-sm font-semibold hover:bg-emerald-400"
                    >
                        + Add HERO Section
                    </button>
                    <button
                        onClick={handleSaveBlog}
                        className="px-5 py-2 rounded-lg bg-emerald-500 text-black text-sm font-semibold hover:bg-emerald-400"
                    >
                        Save Blog
                    </button>
                </div>

                {/* Sections */}
                <SectionsList
                    sections={sections}
                    setSections={setSections}
                />
            </div>
        </main>
    );
}