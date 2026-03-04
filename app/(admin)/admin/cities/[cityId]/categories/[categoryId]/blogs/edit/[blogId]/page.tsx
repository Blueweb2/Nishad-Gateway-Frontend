"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { UploadCloud, Save } from "lucide-react";
import RichTextEditor from "@/components/admin/common/RichTextEditor";

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function EditCategoryBlogPage() {
  const router = useRouter();
  const params = useParams();

  const cityId = params.cityId as string;
  const categoryId = params.categoryId as string;
  const blogId = params.blogId as string;

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");

  // ✅ Use boolean state (cleaner)
  const [isPublished, setIsPublished] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  /* ================= FETCH BLOG ================= */

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (!API_URL) return;

        const res = await fetch(
          `${API_URL}/admin/cities/${cityId}/categories/${categoryId}/blogs/${blogId}`,
          { credentials: "include" }
        );

        const data = await res.json();

        if (!res.ok) {
          toast.error(data?.message || "Failed to load blog");
          return;
        }

        const blog = data.blog;

        setTitle(blog.title);
        setSlug(blog.slug);
        setExcerpt(blog.excerpt || "");
        setContent(blog.content);
        setCoverImage(blog.coverImage || "");
        setIsPublished(blog.isPublished || false);
        setIsFeatured(blog.isFeatured || false);
      } catch (err) {
        toast.error("Something went wrong");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchBlog();
  }, [API_URL, cityId, categoryId, blogId]);

  /* ================= IMAGE UPLOAD (LOCAL PREVIEW ONLY) ================= */

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  /* ================= UPDATE ================= */

  const handleUpdate = async () => {
    if (!title || !slug || !content) {
      toast.error("Title, slug and content are required");
      return;
    }

    try {
      if (!API_URL) {
        toast.error("API URL not configured");
        return;
      }

      setLoading(true);

      const res = await fetch(
        `${API_URL}/admin/cities/${cityId}/categories/${categoryId}/blogs/${blogId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            title,
            slug,
            excerpt,
            content,
            coverImage,
            isPublished,   // ✅ Correct field
            isFeatured,    // ✅ Correct field
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Update failed");
        return;
      }

      toast.success("Blog updated successfully");

      router.push(
        `/admin/cities/${cityId}/categories/${categoryId}/blogs`
      );
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading blog...
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 pt-10 pb-16">
        <h1 className="text-3xl font-semibold text-white mb-8">
          Edit Category Blog
        </h1>

        <div className="space-y-6">

          {/* TITLE */}
          <div>
            <label className="block text-sm text-white/70 mb-2">
              Blog Title
            </label>
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setSlug(generateSlug(e.target.value));
              }}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none"
            />
          </div>

          {/* SLUG */}
          <div>
            <label className="block text-sm text-white/70 mb-2">
              Slug
            </label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none"
            />
          </div>

          {/* EXCERPT */}
          <div>
            <label className="block text-sm text-white/70 mb-2">
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none"
            />
          </div>

          {/* COVER IMAGE */}
          <div>
            <label className="block text-sm text-white/70 mb-2">
              Cover Image
            </label>

            <label className="flex items-center justify-center gap-2 w-full h-40 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-emerald-500 transition">
              <UploadCloud size={20} />
              <span className="text-sm text-white/60">
                Change image
              </span>
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) =>
                  e.target.files &&
                  handleImageUpload(e.target.files[0])
                }
              />
            </label>

            {coverImage && (
              <div className="relative w-full h-60 mt-4 rounded-lg overflow-hidden">
                <Image
                  src={coverImage}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* CONTENT */}
          <div>
            <label className="block text-sm text-white/70 mb-2">
              Content
            </label>

            <RichTextEditor
              value={content}
              onChange={(html) => setContent(html)}
            />
          </div>

          {/* STATUS + FEATURED */}
          <div className="flex items-center gap-6">
            <div>
              <label className="text-sm text-white/70 mr-3">
                Status:
              </label>
              <select
                value={isPublished ? "published" : "draft"}
                onChange={(e) =>
                  setIsPublished(e.target.value === "published")
                }
                className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
              />
              <span className="text-sm text-white/70">
                Featured
              </span>
            </div>
          </div>

          {/* UPDATE BUTTON */}
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition disabled:opacity-50"
          >
            <Save size={18} />
            {loading ? "Updating..." : "Update Blog"}
          </button>

        </div>
      </div>
    </main>
  );
}
