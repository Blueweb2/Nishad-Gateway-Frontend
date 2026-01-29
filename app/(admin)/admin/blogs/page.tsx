"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Star, Pencil } from "lucide-react";

/* ---------------- Types ---------------- */

type BlogType = "city" | "service" | "general";

type BlogStatus = "draft" | "published";

type AdminBlog = {
  _id: string;
  title: string;
  slug: string;
  type: BlogType;
  coverImage: string;
  tags: string[];
  status: BlogStatus;
  featured?: boolean;
  publishedAt?: string;
};

/* ---------------- Constants ---------------- */

const BLOG_TABS: { key: "all" | BlogType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "service", label: "Service Blogs" },
  { key: "city", label: "City Blogs" },
  { key: "general", label: "General Blogs" },
];

/* ---------------- Page ---------------- */

export default function AdminBlogsPage() {
  // 🔹 Replace this with API call later
  const [blogs, setBlogs] = useState<AdminBlog[]>([
    {
      _id: "1",
      title: "Entity Types in Saudi Arabia",
      slug: "entity-types-in-saudi-arabia",
      type: "service",
      coverImage: "/images/blogs/blog-hero.jpg",
      tags: ["Service", "Business Setup"],
      status: "published",
      featured: true,
      publishedAt: "2026-01-22",
    },
    {
      _id: "2",
      title: "Business Setup in Riyadh",
      slug: "business-setup-in-riyadh",
      type: "city",
      coverImage: "/images/blogs/blog1.jpg",
      tags: ["City", "Riyadh"],
      status: "published",
      publishedAt: "2026-01-20",
    },
    {
      _id: "3",
      title: "Why Saudi Arabia is a Business Hub",
      slug: "saudi-arabia-business-hub",
      type: "general",
      coverImage: "/images/blogs/blog2.jpg",
      tags: ["Guide", "Saudi Arabia"],
      status: "draft",
    },
  ]);

  const [activeTab, setActiveTab] = useState<"all" | BlogType>("all");
  const [search, setSearch] = useState("");

  /* ---------------- Derived Data ---------------- */

  const filteredBlogs = useMemo(() => {
    return blogs
      .filter((blog) =>
        activeTab === "all" ? true : blog.type === activeTab
      )
      .filter((blog) =>
        blog.title.toLowerCase().includes(search.toLowerCase())
      );
  }, [blogs, activeTab, search]);

  const handleSetFeatured = (id: string) => {
    // 🔹 Backend version → PUT /api/admin/blog/:id/feature
    setBlogs((prev) =>
      prev.map((b) => ({
        ...b,
        featured: b._id === id,
      }))
    );
  };

  /* ---------------- UI ---------------- */

  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-16">
        {/* Header */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold text-white">Blogs</h1>
            <p className="text-sm text-white/60 mt-2">
              Manage all blogs — city, service, and general — from one place.
            </p>
          </div>

          <Link
            href="/admin/blogs/create"
            className="px-4 py-2 rounded-lg bg-emerald-500 text-black text-sm font-semibold hover:bg-emerald-400 transition"
          >
            + Create Blog
          </Link>
        </div>

        {/* Tabs + Search */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {BLOG_TABS.map((tab) => (
              <TabButton
                key={tab.key}
                active={activeTab === tab.key}
                onClick={() => setActiveTab(tab.key)}
                label={`${tab.label} ${
                  tab.key === "all"
                    ? `(${blogs.length})`
                    : `(${blogs.filter((b) => b.type === tab.key).length})`
                }`}
              />
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-[340px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search blogs..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-white outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        {/* Table */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-12 px-4 py-3 text-xs font-medium text-white/50 border-b border-white/10">
            <div className="col-span-6">Blog</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {filteredBlogs.length === 0 ? (
            <div className="p-10 text-center text-sm text-white/60">
              No blogs found.
            </div>
          ) : (
            filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="grid grid-cols-12 items-center px-4 py-4 border-b border-white/10 hover:bg-white/5 transition"
              >
                {/* Blog Info */}
                <div className="col-span-6 flex items-center gap-4">
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-white/10">
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-white truncate">
                        {blog.title}
                      </p>

                      {blog.featured && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          <Star className="w-3 h-3" />
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-1">
                      {blog.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full text-[11px] bg-white/5 border border-white/10 text-white/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Type */}
                <div className="col-span-2 capitalize text-white/70">
                  {blog.type}
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <StatusBadge status={blog.status} />
                </div>

                {/* Actions */}
                <div className="col-span-2 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleSetFeatured(blog._id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition flex items-center gap-2
                      ${
                        blog.featured
                          ? "bg-emerald-500 text-black border-emerald-500"
                          : "bg-white/5 text-white border-white/10 hover:bg-white/10"
                      }
                    `}
                  >
                    <Star className="w-4 h-4" />
                    {blog.featured ? "Featured" : "Set Featured"}
                  </button>

                  <Link
                    href={`/admin/blogs/edit/${blog._id}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/10 bg-white/5 hover:bg-white/10 text-white transition flex items-center gap-2"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

/* ---------------- Components ---------------- */

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-semibold border transition
        ${
          active
            ? "bg-emerald-500 text-black border-emerald-500"
            : "bg-white/5 text-white/80 border-white/10 hover:bg-white/10"
        }
      `}
    >
      {label}
    </button>
  );
}

function StatusBadge({ status }: { status: BlogStatus }) {
  if (status === "published") {
    return (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
        Published
      </span>
    );
  }

  return (
    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/60 border border-white/10">
      Draft
    </span>
  );
}