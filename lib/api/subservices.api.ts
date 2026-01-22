import { api } from "@/lib/axios";

//  USER (PUBLIC)
export const getSubServicesByService = async (serviceId: string) => {
  const res = await api.get(`/services/${serviceId}/subservices`);
  return res.data;
};

// USER (PUBLIC) - get service by slug
export const getServiceBySlug = async (slug: string) => {
  const res = await api.get(`/services/slug/${slug}`);
  return res.data;
};

//  GET all subservices under a service
export const adminGetSubServices = async (serviceId: string) => {
  const res = await api.get(`/services/${serviceId}/subservices`);
  return res.data;
};

//  CREATE (with image -> backend converts to WEBP)
export const adminCreateSubService = async (
  serviceId: string,
  formData: FormData
) => {
  const res = await api.post(`/services/${serviceId}/subservices`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

//  UPDATE (optional image -> backend converts to WEBP)
export const adminUpdateSubService = async (subId: string, formData: FormData) => {
  const res = await api.put(`/subservices/${subId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

//  DELETE subservice
export const adminDeleteSubService = async (subId: string) => {
  const res = await api.delete(`/subservices/${subId}`);
  return res.data;
};
