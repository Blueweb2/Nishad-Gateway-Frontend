import { adminAxios } from "@/lib/http/adminAxios";

export const createListing = async (
  categoryId: string,
  payload: any
) => {

  const res = await adminAxios.post(
    `/admin/categories/${categoryId}/contents`,
    payload
  );

  return res.data.data;

};