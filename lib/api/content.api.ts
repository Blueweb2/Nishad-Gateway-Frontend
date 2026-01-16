import { api } from "@/lib/axios";

export const adminGetSubServiceContent = async (subId: string) => {
  const res = await api.get(`/subservices/${subId}/content`);
  return res.data;
};

export const adminSaveSubServiceContent = async (
  subId: string,
  payload: {
    heroTitle?: string;
    heroSubtitle?: string;
    heroImage?: string;
    introHeading?: string;
    introText?: string;
    sections?: { heading: string; text: string; image?: string }[];
    faqs?: { q: string; a: string }[];
  }
) => {
  const res = await api.put(`/subservices/${subId}/content`, payload);
  return res.data;
};
