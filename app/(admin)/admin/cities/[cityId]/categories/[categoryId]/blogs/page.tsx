"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { Search, Pencil, Star, Trash2, Plus } from "lucide-react";

type CategoryBlog = {
  _id: string;
  title: string;
  slug: string;
  coverImage?: string;
  isPublished: boolean;
  isFeatured?: boolean;
  publishedAt?: string;
};

export default function CategoryBlogsPage() {
  const params = useParams();
  const cityId = params.cityId as string;
  const categoryId = params.categoryId as string;

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [blogs, setBlogs] = useState<CategoryBlog[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [categoryName, setCategoryName] = useState("");

  /* ================= FETCH BLOGS ================= */

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        if (!API_URL) return;

        const res = await fetch(
          `${API_URL}/admin/cities/${cityId}/categories/${categoryId}/blogs`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (!res.ok) {
          toast.error(data?.message || "Failed to load blogs");
          return;
        }

        setBlogs(data.blogs || []);
      } catch (err) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [API_URL, cityId, categoryId]);


  useEffect(() => {
    const fetchCategory = async () => {
      try {
        if (!API_URL) return;

        const res = await fetch(
          `${API_URL}/admin/cities/${cityId}/categories`,
          { credentials: "include" }
        );

        const data = await res.json();

        if (!res.ok) return;

        const category = data.categories?.find(
          (c: any) => c._id === categoryId
        );

        if (category) setCategoryName(category.name);
      } catch (err) {
        console.error(err);
      }
    };

    if (cityId && categoryId) {
      fetchCategory();
    }
  }, [API_URL, cityId, categoryId]);
  /* ================= FILTER ================= */

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [blogs, search]);

  /* ================= DELETE ================= */

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      if (!API_URL) return;

      const res = await fetch(
        `${API_URL}/admin/cities/${cityId}/categories/${categoryId}/blogs/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Delete failed");
        return;
      }

      toast.success("Blog deleted");

      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  /* ================= UI ================= */

  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-16">
        {/* Header */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold text-white">
              Category Blogs
            </h1>
            <p className="text-sm text-white/60 mt-2">
              Category: <span className="text-emerald-400 font-medium">{categoryName}</span>
            </p>
          </div>

          <Link
            href={`/admin/cities/${cityId}/categories/${categoryId}/blogs/create`}
            className="px-4 py-2 rounded-lg bg-emerald-500 text-black text-sm font-semibold hover:bg-emerald-400 transition flex items-center gap-2"
          >
            <Plus size={16} />
            Create Blog
          </Link>
        </div>

        {/* Search */}
        <div className="mt-8 flex justify-end">
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
                      src={blog.coverImage || "/placeholder.png"}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-white">
                        {blog.title}
                      </p>

                      {blog.isFeatured && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          <Star className="w-3 h-3" />
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <StatusBadge isPublished={blog.isPublished} />
                </div>

                {/* Actions */}
                <div className="col-span-3 flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/cities/${cityId}/categories/${categoryId}/blogs/edit/${blog._id}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/10 bg-white/5 hover:bg-white/10 text-white transition flex items-center gap-2"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
{/* 
                  <Link
                    href={`/cities/${citySlug}/${categorySlug}/${blog.slug}`} target="_blank"
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 transition"
                  >
                    Preview
                  </Link> */}
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

function StatusBadge({ isPublished }: { isPublished: boolean }) {
  if (isPublished) {
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
