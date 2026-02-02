// import { publicAxios } from "@/lib/http/publicAxios";
// import { City } from "@/components/user/home/cities/CitySlide";

// export type CitiesResponse = {
//   cities: City[];
// };

// export const getCities = async (): Promise<CitiesResponse> => {
//   const res = await publicAxios.get<CitiesResponse>("/cities");
//   return res.data; // ✅ IMPORTANT
// };

// export const getCityBySlug = async (slug: string) => {
//   const res = await publicAxios.get(`/cities/slug/${slug}`);
//   return res.data;
// };

import { publicAxios } from "@/lib/http/publicAxios";
import { City } from "@/lib/types/city";

export const getCities = async (): Promise<City[]> => {
  const res = await publicAxios.get("/cities");
  return res.data.cities;  // extract the array
};


export const getCityBySlug = async (slug: string): Promise<City> => {
  const res = await publicAxios.get<City>(`/cities/slug/${slug}`);
  return res.data;
};

