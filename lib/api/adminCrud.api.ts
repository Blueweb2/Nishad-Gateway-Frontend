import { adminAxios } from "@/lib/http/adminAxios";
import { AxiosRequestConfig } from "axios";

export const adminGet = async <T = any>(
  url: string,
  config?: AxiosRequestConfig
) => {
  const res = await adminAxios.get(url, config);
  return res.data as T;
};

export const adminPost = async <T = any>(
  url: string,
  payload?: any,
  config?: AxiosRequestConfig
) => {
  const res = await adminAxios.post(url, payload, config);
  return res.data as T;
};

export const adminPut = async <T = any>(
  url: string,
  payload?: any,
  config?: AxiosRequestConfig
) => {
  const res = await adminAxios.put(url, payload, config);
  return res.data as T;
};

export const adminDelete = async <T = any>(
  url: string,
  config?: AxiosRequestConfig
) => {
  const res = await adminAxios.delete(url, config);
  return res.data as T;
};
