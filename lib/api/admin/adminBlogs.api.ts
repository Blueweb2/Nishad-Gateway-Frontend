import { adminAxios } from "@/lib/http/adminAxios";

/* ================= TYPES ================= */

export type BlogStatus = "draft" | "published";

/* ---------- Block Types ---------- */

export type Block =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; url: string; alt: string }
  | { type: "table"; headers: string[]; rows: string[][] };

export type AdminBlogPayload = {
  title: string;
  slug?: string;
  excerpt: string;

  blocks: {
    type: string;
    data: Block;
  }[];

  status: BlogStatus;

  tags: string[];

  coverImage: {
    url: string;
    alt: string;
  };

  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
};

/* ================= ADMIN BLOG APIs ================= */

// 📋 Get all blogs (admin)
export const adminGetBlogs = async () => {
  const { data } = await adminAxios.get(
    "/blogs/admin/all"
  );
  return data;
};

// 📄 Get single blog by ID (admin)
export const adminGetBlogById = async (
  id: string
) => {
  const { data } = await adminAxios.get(
    `/blogs/admin/${id}`
  );
  return data;
};

// ➕ Create blog
export const adminCreateBlog = async (
  payload: AdminBlogPayload
) => {
  const { data } = await adminAxios.post(
    "/blogs/admin",
    payload
  );
  return data;
};

// ✏ Update blog
export const adminUpdateBlog = async (
  id: string,
  payload: Partial<AdminBlogPayload>
) => {
  const { data } = await adminAxios.put(
    `/blogs/admin/${id}`,
    payload
  );
  return data;
};

// ❌ Delete blog
export const adminDeleteBlog = async (
  id: string
) => {
  const { data } = await adminAxios.delete(
    `/blogs/admin/${id}`
  );
  return data;
};