import { publicAxios } from "@/lib/http/publicAxios";

// 🌍 Get ministry blog by slug
export const getMinistryBySlug = async (slug: string) => {
  const { data } = await publicAxios.get(
    `/ministries/${slug}`
  );

  return data;
};
// 🌍 Get all ministries (cards)
export const getMinistries = async () => {
  const { data } = await publicAxios.get("/ministries");
  return data?.data || [];
};