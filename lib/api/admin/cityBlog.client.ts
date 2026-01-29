import { api } from "@/lib/axios";

export const getCityByIdClient = (id: string) =>
  api.get(`/cities/id/${id}`).then((r) => r.data);

export const getCitiesClient = () =>
  api.get(`/cities`).then((r) => r.data);

export const updateCityClient = (id: string, payload: any) =>
  api.put(`/cities/id/${id}`, payload).then((r) => r.data);

export const deleteCityClient = (id: string) =>
  api.delete(`/cities/${id}`).then((r) => r.data);