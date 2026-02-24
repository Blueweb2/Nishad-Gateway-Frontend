import { adminAxios } from "@/lib/http/adminAxios";

/* ================= TYPES ================= */

export type BlogStatus = "draft" | "published";

export type AdminBlogPayload = {
  title: string;
  excerpt: string;
  content: string;
  status: BlogStatus;
  tags: string[];
  coverImage: {
    url: string;
    alt: string;
  };
  metaTitle?: string;
  metaDescription?: string;
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