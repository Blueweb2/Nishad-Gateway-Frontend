import { adminAxios } from "@/lib/http/adminAxios";

export const getCityByIdClient = async (id: string) => {
  const res = await adminAxios.get(`/cities/${id}`);
  return res.data;
};

export const getCitiesClient = async () => {
  const res = await adminAxios.get(`/cities`);
  return res.data;
};

export const updateCityClient = async (id: string, payload: any) => {
  const res = await adminAxios.put(`/cities/${id}`, payload);
  return res.data;
};

export const deleteCityClient = async (id: string) => {
  const res = await adminAxios.delete(`/cities/${id}`);
  return res.data;
};
