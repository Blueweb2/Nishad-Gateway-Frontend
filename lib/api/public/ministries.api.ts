import { cache } from "react";
import { publicAxios } from "@/lib/http/publicAxios";

export const getMinistryBySlug = cache(async (slug: string) => {
  const { data } = await publicAxios.get(`/ministries/${slug}`);
  return data;
});

export const getMinistries = cache(async () => {
  const { data } = await publicAxios.get("/ministries");
  return data?.data || [];
});