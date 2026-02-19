import { adminAxios } from "@/lib/http/adminAxios";

export const adminLogin = (payload: {
  email: string;
  password: string;
}) =>
  adminAxios.post("/admin/login", payload).then((res) => res.data);

export const adminRefresh = () =>
  adminAxios.post("/admin/refresh").then((res) => res.data);

export const adminLogout = () =>
  adminAxios.post("/admin/logout").then((res) => res.data);

export const adminMe = () =>
  adminAxios.get("/admin/me").then((res) => res.data);
