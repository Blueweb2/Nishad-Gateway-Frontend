import { adminAxios } from "@/lib/http/adminAxios";

// ➕ Create subservice
export const adminCreateSubService = async (
  serviceId: string,
  formData: FormData
) => {
  const { data } = await adminAxios.post(
    `/services/${serviceId}/subservices`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return data;
};

// ✏ Update subservice
export const adminUpdateSubService = async (
  subId: string,
  formData: FormData
) => {
  const { data } = await adminAxios.put(
    `/subservices/${subId}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
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
