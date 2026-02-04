import { publicAxios } from "@/lib/http/publicAxios";

// 🌍 Public – Services Menu
export const getServicesMenu = async () => {
  const { data } = await publicAxios.get("/services/menu");
  return data;
};
