"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Pencil, Trash2 } from "lucide-react";
import {
  adminGetBlogs,
  adminDeleteBlog,
} from "@/lib/api/admin/adminBlogs.api"; // ✅ adjust path

/* ---------------- Types ---------------- */

type BlogStatus = "draft" | "published";

type AdminBlog = {
  _id: string;
  title: string;
  slug: string;
  coverImage: {
    url: string;
    alt: string;
  };
  tags: string[];
  status: BlogStatus;
  publishedAt?: string;
};

/* ---------------- Page ---------------- */

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<AdminBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  /* ---------------- Fetch Blogs ---------------- */

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await adminGetBlogs();
        setBlogs(Array.isArray(data) ? data : []);
      } catch (err: any) {
        console.error("Failed to fetch blogs:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  /* ---------------- Search Filter ---------------- */

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) =>
      blog.title?.toLowerCase().includes(search.toLowerCase())
    );
  }, [blogs, search]);

  /* ---------------- Delete ---------------- */

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      await adminDeleteBlog(id);

      setBlogs((prev) =>
        prev.filter((b) => b._id !== id)
      );
    } catch (err: any) {
      console.error("Delete failed:", err);
      alert(err.message);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-16">
        {/* Header */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold text-white">
              General Blogs
            </h1>
            <p className="text-sm text-white/60 mt-2">
              Manage all blog articles.
            </p>
          </div>

          <Link
            href="/admin/blogs/create"
            className="px-4 py-2 rounded-lg bg-emerald-500 text-black text-sm font-semibold hover:bg-emerald-400 transition"
          >
            + Create Blog
          </Link>
        </div>

        {error && (
          <div className="mt-6 text-red-400">
            {error}
          </div>
        )}

        {/* Search */}
        <div className="mt-8 flex justify-end">
          <div className="relative w-full md:w-[340px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search blogs..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-white outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        {/* Table */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="grid grid-cols-12 px-4 py-3 text-xs font-medium text-white/50 border-b border-white/10">
            <div className="col-span-7">Blog</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-3 text-right">Actions</div>
          </div>

          {loading ? (
            <div className="p-10 text-center text-white/60">
              Loading blogs...
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="p-10 text-center text-white/60">
              No blogs found.
            </div>
          ) : (
            filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="grid grid-cols-12 items-center px-4 py-4 border-b border-white/10 hover:bg-white/5 transition"
              >
                {/* Blog Info */}
                <div className="col-span-7 flex items-center gap-4">
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-white/10">
                    <Image
                      src={blog.coverImage?.url}
                      alt={blog.coverImage?.alt || blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="font-medium text-white truncate">
                      {blog.title}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-1">
                      {blog.tags?.slice(0, 3).map((tag) => (
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

                {/* Status */}
                <div className="col-span-2">
                  <StatusBadge status={blog.status} />
                </div>

                {/* Actions */}
                <div className="col-span-3 flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/blogs/edit/${blog._id}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/10 bg-white/5 hover:bg-white/10 text-white transition flex items-center gap-2"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </Link>

                  <Link
                    href={`/blogs/${blog.slug}`}
                    target="_blank"
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 transition"
                  >
                    Preview
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(blog._id)
                    }
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition flex items-center gap-2"
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

/* ---------------- Status Badge ---------------- */

function StatusBadge({ status }: { status: BlogStatus }) {
  return status === "published" ? (
    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
      Published
    </span>
  ) : (
    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/60 border border-white/10">
      Draft
    </span>
  );
}