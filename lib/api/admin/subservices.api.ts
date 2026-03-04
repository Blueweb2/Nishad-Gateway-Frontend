import { adminAxios } from "@/lib/http/adminAxios";

// ➕ Create subservice
export const adminCreateSubService = async (
  serviceId: string,
  payload: any
) => {
  const { data } = await adminAxios.post(
    `/services/${serviceId}/subservices`,
    payload
  );

  return data;
};

// ✏ Update subservice
export const adminUpdateSubService = async (
  subId: string,
  payload: any
) => {
  const { data } = await adminAxios.put(
    `/subservices/${subId}`,
    payload
  );

  return data;
};

// ❌ Delete subservice
export const adminDeleteSubService = async (subId: string) => {
  const { data } = await adminAxios.delete(`/subservices/${subId}`);
  return data;
};

// 📋 Get all subservices under a service (admin)
export const adminGetSubServices = async (serviceId: string) => {
  const { data } = await adminAxios.get(
    `/services/${serviceId}/subservices`
  );
  return data;
};
