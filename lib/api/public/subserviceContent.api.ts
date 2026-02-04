import { publicAxios } from "@/lib/http/publicAxios";

// 🌍 Get content by subservice ID (public)
export const getSubServiceContent = async (subId: string) => {
  const { data } = await publicAxios.get(
    `/subservices/${subId}/content`
  );
  return data;
};

// 🌍 Get content by slug (public)
export const getSubServiceContentBySlug = async (slug: string) => {
  const { data } = await publicAxios.get(
    `/subservices/slug/${slug}/content`
  );
  return data;
};
