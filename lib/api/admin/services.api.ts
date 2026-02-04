import { adminAxios } from "@/lib/http/adminAxios";

// 📋 Get all services (admin)
export const adminGetServices = async () => {
  const { data } = await adminAxios.get("/services");
  return data;
};

// ➕ Create service
export const adminCreateService = async (payload: {
  index: string;
  title: string;
  slug: string;
  isActive?: boolean;
}) => {
  const { data } = await adminAxios.post("/services", payload);
  return data;
};

// ✏ Update service
export const adminUpdateService = async (
  id: string,
  payload: Partial<{
    index: string;
    title: string;
    slug: string;
    isActive: boolean;
  }>
) => {
  const { data } = await adminAxios.put(`/services/${id}`, payload);
  return data;
};

// ❌ Delete service
export const adminDeleteService = async (id: string) => {
  const { data } = await adminAxios.delete(`/services/${id}`);
  return data;
};
