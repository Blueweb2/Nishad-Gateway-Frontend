import { api } from "@/lib/axios";


// ======================
// USER (PUBLIC)
// ======================
export const getServicesMenu = async () => {
  const res = await api.get("/services/menu");
  return res.data;
};


// ======================
// ADMIN
// ======================

export const adminGetServices = async () => {
  const res = await api.get("/services");
  return res.data;
};

export const adminCreateService = async (payload: {
  index: string;
  title: string;
  slug: string;
  isActive?: boolean;
}) => {
  const res = await api.post("/services", payload);
  return res.data;
};


export const adminUpdateService = async (
  id: string,
  payload: Partial<{
    index: string;
    title: string;
    slug: string;
    isActive: boolean;
  }>
) => {
  const res = await api.put(`/services/${id}`, payload);
  return res.data;
};

export const adminDeleteService = async (id: string) => {
  const res = await api.delete(`/services/${id}`);
  return res.data;
};
