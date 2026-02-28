import { publicAxios } from "@/lib/http/publicAxios";

/* ================= GET ALL ================= */

export const getPublicSectors = async () => {
  try {
    const res = await publicAxios.get("/sectors");

    return res.data?.data || [];
  } catch (error) {
    console.error("Failed to fetch sectors:", error);
    return [];
  }
};

/* ================= GET BY SLUG ================= */

export const getSectorBySlugPublic = async (
  slug: string
) => {
  try {
    const res = await publicAxios.get(
      `/sectors/slug/${slug}`
    );

    return res.data?.data || null;
  } catch (error) {
    console.error("Failed to fetch sector:", error);
    return null;
  }
};