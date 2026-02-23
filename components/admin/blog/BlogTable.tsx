"use client";

import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import BlogStatusBadge from "./BlogStatusBadge";

type BlogStatus = "draft" | "published";

export type AdminBlog = {
  _id: string;
  title: string;
  slug: string;
  coverImage: string;
  tags: string[];
  status: BlogStatus;
};

type Props = {
  blogs: AdminBlog[];
  onDelete: (id: string) => void;
};

export default function BlogTable({
  blogs,
  onDelete,
}: Props) {
  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
      <div className="grid grid-cols-12 px-4 py-3 text-xs font-medium text-white/50 border-b border-white/10">
        <div className="col-span-7">Blog</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-3 text-right">Actions</div>
      </div>

      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="grid grid-cols-12 items-center px-4 py-4 border-b border-white/10 hover:bg-white/5 transition"
        >
          <div className="col-span-7 flex items-center gap-4">
            <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-white/10">
              <Image
                src={blog.coverImage?.u}
                alt={blog.coverImage?.alt || blog.title}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <p className="font-medium text-white">
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

          <div className="col-span-2">
            <BlogStatusBadge status={blog.status} />
          </div>

          <div className="col-span-3 flex justify-end gap-2">
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
              onClick={() => onDelete(blog._id)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}