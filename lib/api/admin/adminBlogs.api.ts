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

/* ---------------- Get All Blogs (Admin) ---------------- */

export const adminGetBlogs = async () => {
  try {
    const { data } = await adminAxios.get("/blogs/admin/all");
    return data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to fetch blogs"
    );
  }
};

/* ---------------- Get Single Blog by ID (Admin) ---------------- */

export const adminGetBlogById = async (id: string) => {
  if (!id) throw new Error("Blog ID is required");

  try {
    const { data } = await adminAxios.get(
      `/blogs/admin/${id}`
    );
    return data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to fetch blog"
    );
  }
};

/* ---------------- Create Blog ---------------- */

export const adminCreateBlog = async (
  payload: AdminBlogPayload
) => {
  try {
    const { data } = await adminAxios.post(
      "/blogs/admin",
      payload
    );
    return data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Blog creation failed"
    );
  }
};

/* ---------------- Update Blog ---------------- */

export const adminUpdateBlog = async (
  id: string,
  payload: Partial<AdminBlogPayload>
) => {
  if (!id) throw new Error("Blog ID is required");

  try {
    const { data } = await adminAxios.put(
      `/blogs/admin/${id}`,
      payload
    );
    return data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Blog update failed"
    );
  }
};

/* ---------------- Delete Blog ---------------- */

export const adminDeleteBlog = async (
  id: string
) => {
  if (!id) throw new Error("Blog ID is required");

  try {
    const { data } = await adminAxios.delete(
      `/blogs/admin/${id}`
    );
    return data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Blog deletion failed"
    );
  }
};