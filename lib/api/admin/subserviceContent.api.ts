import { adminAxios } from "@/lib/http/adminAxios";

// 🔐 Get content (admin)
export const adminGetSubServiceContent = async (subId: string) => {
  const { data } = await adminAxios.get(
    `/subservices/${subId}/content`
  );
  return data;
};

// 🔐 Save content (admin)
export const adminSaveSubServiceContent = async (
  subId: string,
  payload: any
) => {
  const { data } = await adminAxios.put(
    `/subservices/${subId}/content`,
    payload
  );
  return data;
};
