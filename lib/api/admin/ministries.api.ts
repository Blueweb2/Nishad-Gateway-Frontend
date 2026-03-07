import { adminAxios } from "@/lib/http/adminAxios";

// 📋 Get ministries
export const adminGetMinistries = async () => {
  const { data } = await adminAxios.get("/ministries");
  return data.data;
};

// 📄 Get single ministry by id (for edit page)
export const getMinistryById = async (id: string) => {
  const res = await adminAxios.get(`/ministries/by-id/${id}`);
  return res?.data?.data ?? null;
};

// ➕ Create ministry
export const adminCreateMinistry = async (payload: any) => {
  const { data } = await adminAxios.post("/ministries", payload);
  return data;
};

// ✏ Update ministry
export const adminUpdateMinistry = async (
  id: string,
  payload: any
) => {
  const { data } = await adminAxios.put(
    `/ministries/${id}`,
    payload
  );

  return data;
};

// ❌ Delete ministry
export const adminDeleteMinistry = async (id: string) => {
  const { data } = await adminAxios.delete(`/ministries/${id}`);
  return data;
};