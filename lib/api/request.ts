import { api } from "@/lib/axios";
import { AxiosRequestConfig } from "axios";

export const getData = async <T = any>(url: string, config?: AxiosRequestConfig) => {
  const res = await api.get(url, config);
  return res.data as T;
};

export const postData = async <T = any>(
  url: string,
  payload?: any,
  config?: AxiosRequestConfig
) => {
  const res = await api.post(url, payload, config);
  return res.data as T;
};

export const putData = async <T = any>(
  url: string,
  payload?: any,
  config?: AxiosRequestConfig
) => {
  const res = await api.put(url, payload, config);
  return res.data as T;
};

export const deleteData = async <T = any>(url: string, config?: AxiosRequestConfig) => {
  const res = await api.delete(url, config);
  return res.data as T;
};