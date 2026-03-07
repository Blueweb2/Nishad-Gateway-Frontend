import { publicAxios } from "@/lib/http/publicAxios";
import { Ministry } from "@/lib/types/ministry";

// 🌍 Get ministry by slug
export const getMinistryBySlug = async (
  slug: string
): Promise<Ministry | null> => {
  const { data } = await publicAxios.get(`/ministries/${slug}`);

  return data?.data || null;
};

// 🌍 Get all ministries (cards)
export const getMinistries = async (): Promise<Ministry[]> => {
  const { data } = await publicAxios.get("/ministries");

  return data?.data || [];
};