import { publicAxios } from "@/lib/http/publicAxios";

// 📦 Get subservices by service (public)
export const getSubServicesByService = async (serviceId: string) => {
  const { data } = await publicAxios.get(
    `/services/${serviceId}/subservices`
  );
  return data;
};

// 📦 Get single service by slug (public)
export const getServiceBySlug = async (slug: string) => {
  const { data } = await publicAxios.get(`/services/slug/${slug}`);
  return data;
};
