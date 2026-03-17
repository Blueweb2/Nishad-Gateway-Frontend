import { publicAxios } from "@/lib/http/publicAxios";

export const getCityCategoryContent = async (
  citySlug: string,
  categorySlug: string
) => {

  const res = await publicAxios.get(
    `/cities/${citySlug}/categories/${categorySlug}/contents`
  );

  return res.data.data;

};