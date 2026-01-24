import { getData, postData, putData, deleteData } from "./request";

export const getSubServicesByService = (serviceId: string) => {
  return getData(`/services/${serviceId}/subservices`);
};

export const getServiceBySlug = (slug: string) => {
  return getData(`/services/slug/${slug}`);
};

// admin create/update/delete only
export const adminCreateSubService = (serviceId: string, formData: FormData) => {
  return postData(`/services/${serviceId}/subservices`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const adminUpdateSubService = (subId: string, formData: FormData) => {
  return putData(`/subservices/${subId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const adminDeleteSubService = (subId: string) => {
  return deleteData(`/subservices/${subId}`);
};

// admin get all subservices under a service
export const adminGetSubServices = (serviceId: string) => {
  return getData(`/services/${serviceId}/subservices`);
};