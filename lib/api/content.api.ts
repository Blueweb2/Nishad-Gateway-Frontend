import { getData, putData } from "./request";

// same endpoint (admin + user)
export const adminGetSubServiceContent = (subId: string) => {
  return getData(`/subservices/${subId}/content`);
};

export const adminSaveSubServiceContent = (subId: string, payload: any) => {
  return putData(`/subservices/${subId}/content`, payload);
};

export const getSubServiceContent = (subId: string) => {
  return getData(`/subservices/${subId}/content`);
};

export const getSubServiceContentBySlug = (slug: string) => {
  return getData(`/subservices/slug/${slug}/content`);
};