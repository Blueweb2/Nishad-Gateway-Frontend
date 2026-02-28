/* ================= TYPES ================= */

export type PublicBlog = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: {
    url: string;
    alt: string;
  };
  tags: string[];
  readingTime: number;
  publishedAt: string;
  metaTitle?: string;
  metaDescription?: string;
};

export type PublicBlogListResponse = {
  data: PublicBlog[];
  total: number;
  page: number;
  totalPages: number;
};

/* ================= CONFIG ================= */

const API = process.env.NEXT_PUBLIC_API_URL;

/* ===================================================== */
/* ================= PUBLIC BLOG APIs ================== */
/* ===================================================== */

/**
 * 🌍 Get paginated published blogs
 */
export const getPublishedBlogs = async (
  page = 1,
  limit = 10
): Promise<PublicBlogListResponse> => {
  const res = await fetch(
    `${API}/blogs?page=${page}&limit=${limit}`,
    {
      cache: "no-store", // always fresh
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
};

/**
 * 📄 Get single blog by slug
 */
export const getBlogBySlug = async (
  slug: string
): Promise<PublicBlog> => {
  const res = await fetch(
    `${API}/blogs/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Blog not found");
  }

  return res.json();
};

/**
 * 🔍 Get related blogs (by tag)
 * You can improve backend later for better matching
 */
async function getRelated(slug: string) {
  const res = await fetch(
    `${process.env.API_URL}/blogs/${slug}/related`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) return [];

  const result = await res.json();

  return result.data ?? [];
}