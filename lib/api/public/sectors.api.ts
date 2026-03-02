import { publicAxios } from "@/lib/http/publicAxios";

/* ================= GET ALL ================= */

export const getPublicSectors = async () => {
  try {
    const res = await publicAxios.get("/sectors");
    return res.data || [];
  } catch (error) {
    console.error("Failed to fetch sectors:", error);
    return [];
  }
};

/* ================= GET BY SLUG ================= */

export const getSectorBySlugPublic = async (slug: string) => {
  try {
    const res = await publicAxios.get(`/sectors/${slug}`);
    return res.data || null;
  } catch (error) {
    console.error("Failed to fetch sector:", error);
    return null;
  }
};