"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";

type BlogItem = {
    id: string;
    date: string;
    title: string;
    image: string;
    cityTag?: string;
    typeTag?: "News" | "Articles";
    href: string;
};

export default function BlogsPopup({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    //  controls mount / unmount (same as ServicesPopup)
    const [render, setRender] = useState(open);

    useEffect(() => {
        if (open) {
            setRender(true);
        } else {
            const t = setTimeout(() => setRender(false), 550);
            return () => clearTimeout(t);
        }
    }, [open]);

    //  ESC close
    useEffect(() => {
        const onEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onEsc);
        return () => window.removeEventListener("keydown", onEsc);
    }, [onClose]);


    const [blogItems, setBlogItems] = useState<BlogItem[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!open) return;

        const fetchBlogs = async () => {
            try {
                setLoading(true);

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/blogs?page=1&limit=6`
                );

                if (!res.ok) return;

                const result = await res.json();

                const mapped: BlogItem[] = result.data.map((blog: any) => ({
                    id: blog._id,
                    date: blog.publishedAt
                        ? new Date(blog.publishedAt)
                            .toLocaleDateString("en-GB")
                            .slice(0, 5)
                        : "",
                    title: blog.title,
                    image: blog.coverImage?.url || "/placeholder.jpg",
                    cityTag: blog.city || "KSA",
                    typeTag: blog.category === "news" ? "News" : "Articles",
                    href: `/blogs/${blog.slug}`,
                }));

                setBlogItems(mapped);
            } catch (err) {
                console.error("Failed to fetch blogs");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [open]);


    // default filter like screenshot
    const [activeFilter, setActiveFilter] = useState<"All" | "Articles" | "News">(
        "Articles"
    );

    const filtered = useMemo(() => {
        if (activeFilter === "All") return blogItems;
        return blogItems.filter((b) => b.typeTag === activeFilter);
    }, [blogItems, activeFilter]);

    if (!render) return null;

    return (
        <>
            {/* BACKDROP */}
            <div
                onClick={onClose}
                className="
          fixed inset-0
          bg-black/30 backdrop-blur-sm
          z-40
          transition-opacity
          duration-500
        "
                style={{ opacity: open ? 1 : 0 }}
            />

            {/* POPUP – OUTER */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`fixed top-20 left-1/2 w-[340px] sm:w-[360px] z-50
                ${open ? "animate-sheetReveal" : "animate-sheetHide"}`}
            >
                {/* INNER CARD */}
                <div className="bg-white rounded-[28px] shadow-2xl border border-black/10 overflow-hidden flex flex-col max-h-full">
                    {/* TOP BAR */}
                    <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-300">
                        {/* left: Articles pill */}
                        <button
                            className="px-4 py-2 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
                            onClick={() =>
                                setActiveFilter((p) => (p === "Articles" ? "All" : "Articles"))
                            }
                        >
                            Articles
                        </button>

                        {/* right: All + arrow circle */}
                        <button
                            onClick={() => setActiveFilter("All")}
                            className="flex items-center gap-2 text-xs font-medium text-gray-700 hover:text-black transition"
                        >
                            All
                            <span className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
                                <ArrowUpRight className="w-4 h-4" />
                            </span>
                        </button>
                    </div>

                    {/* LIST */}
                    <div className="px-5 max-h-[520px] overflow-y-auto hide-scrollbar mt-5 pb-10">
                        {loading ? (
                            <p className="text-sm text-gray-500 py-10 text-center">
                                Loading blogs...
                            </p>
                        ) : filtered.length === 0 ? (
                            <p className="text-sm text-gray-500 py-10 text-center">
                                No blogs found.
                            </p>
                        ) : (
                            <div className="space-y-6">
                                {filtered.map((item) => (
                                    <div key={item.id} className="border-b border-gray-200 pb-6">
                                        {/* date + tags */}
                                        <div className="flex items-center justify-between mb-4">
                                            <p className="text-xs text-gray-400">{item.date}</p>

                                            <div className="flex items-center gap-2">
                                                {item.cityTag && (
                                                    <span className="px-3 py-1 rounded-full text-[11px] bg-gray-100 text-gray-700">
                                                        {item.cityTag}
                                                    </span>
                                                )}
                                                {item.typeTag && (
                                                    <span className="px-3 py-1 rounded-full text-[11px] bg-gray-100 text-gray-700">
                                                        {item.typeTag}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* IMAGE (exact oval shape) */}
                                        <div className="w-full flex justify-center my-4">
                                            <div className="rounded-[160px] overflow-hidden">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    width={150}
                                                    height={150}
                                                    className="object-cover w-[120px] h-[150px]"
                                                    priority
                                                />
                                            </div>
                                        </div>


                                        {/* title + arrow */}
                                        <div className="mt-5 flex items-center justify-between gap-4">
                                            <h4 className="text-sm font-semibold text-gray-900 leading-snug whitespace-pre-line">
                                                {item.title}
                                            </h4>

                                            <Link
                                                href={item.href}
                                                onClick={onClose}
                                                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
                                            >
                                                <ArrowUpRight className="w-4 h-4 text-gray-900" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
