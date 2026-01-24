import { getData, postData, putData, deleteData } from "./request";

export const getServicesMenu = () => {
  return getData("/services/menu");
};

// admin
export const adminGetServices = () => {
  return getData("/services");
};

export const adminCreateService = (payload: {
  index: string;
  title: string;
  slug: string;
  isActive?: boolean;
}) => {
  return postData("/services", payload);
};

export const adminUpdateService = (
  id: string,
  payload: Partial<{
    index: string;
    title: string;
    slug: string;
    isActive: boolean;
  }>
) => {
  return putData(`/services/${id}`, payload);
};

export const adminDeleteService = (id: string) => {
  return deleteData(`/services/${id}`);
};