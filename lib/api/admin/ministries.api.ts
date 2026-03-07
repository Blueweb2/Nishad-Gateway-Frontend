import { adminAxios } from "@/lib/http/adminAxios";

// 📋 Get ministries
export const adminGetMinistries = async () => {
  const { data } = await adminAxios.get("/ministries");
  return data.data;
};

// 📄 Get single ministry by id (for edit page)
export const getMinistryById = async (ministryId: string) => {
  const { data } = await adminAxios.get(`/ministries/id/${ministryId}`);
  return data.data;
};

// ➕ Create ministry
export const adminCreateMinistry = async (payload: any) => {
  const { data } = await adminAxios.post("/ministries", payload);
  return data;
};

// ✏ Update ministry
export const adminUpdateMinistry = async (
  ministryId: string,
  payload: any
) => {
  const { data } = await adminAxios.put(
    `/ministries/${ministryId}`,
    payload
  );

  return data;
};

// ❌ Delete ministry
export const adminDeleteMinistry = async (ministryId: string) => {
  const { data } = await adminAxios.delete(`/ministries/${ministryId}`);
  return data;
};