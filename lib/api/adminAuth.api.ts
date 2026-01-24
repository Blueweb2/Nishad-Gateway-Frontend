import { api } from "../axios";

export const adminLogin = (payload: { email: string; password: string }) =>
  api.post("/admin/login", payload).then((res) => res.data);

export const adminRefresh = () =>
  api.post("/admin/refresh").then((res) => res.data);

export const adminLogout = () =>
  api.post("/admin/logout").then((res) => res.data);

export const adminMe = () =>
  api.get("/admin/me").then((res) => res.data);