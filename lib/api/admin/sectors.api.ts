import {adminAxios }from "@/lib/http/adminAxios";

/* ================= GET ALL (ADMIN) ================= */

export const getAdminSectors = async () => {
  const res = await adminAxios.get("/sectors/admin");
  return res.data;
};

/* ================= GET BY ID ================= */

export const getSectorByIdAdmin = async (id: string) => {
  const res = await adminAxios.get(`/sectors/admin/${id}`);
  return res.data;
};

/* ================= CREATE ================= */

export const createSectorAdmin = async (data: any) => {
  const res = await adminAxios.post("/sectors/admin", data);
  return res.data;
};

/* ================= UPDATE ================= */

export const updateSectorAdmin = async (
  id: string,
  data: any
) => {
  const res = await adminAxios.put(
    `/sectors/admin/${id}`,
    data
  );
  return res.data;
};

/* ================= DELETE ================= */

export const deleteSectorAdmin = async (id: string) => {
  const res = await adminAxios.delete(
    `/sectors/admin/${id}`
  );
  return res.data;
};