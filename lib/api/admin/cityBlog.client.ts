import { adminAxios } from "@/lib/http/adminAxios";

export const getCityByIdClient = async (id: string) => {
  const res = await adminAxios.get(`/admin/cities/${id}`);
  console.log(res.data, "cities by id");
  return res.data;
};

export const getCitiesClient = async () => {
  const res = await adminAxios.get(`/admin/cities`);
  console.log(res.data, "CITY DATA");
  return res.data;
};

export const updateCityClient = async (id: string, payload: any) => {
  const res = await adminAxios.put(`/admin/cities/${id}`, payload);
  return res.data;
};

export const deleteCityClient = async (id: string) => {
  const res = await adminAxios.delete(`/admin/cities/${id}`);
  return res.data;
};
