import { publicAxios } from "@/lib/http/publicAxios";
import { AxiosRequestConfig } from "axios";

export const getData = async <T = any>(url: string, config?: AxiosRequestConfig) => {
  const res = await publicAxios.get(url, config);
  return res.data as T;
};

export const postData = async <T = any>(
  url: string,
  payload?: any,
  config?: AxiosRequestConfig
) => {
  const res = await publicAxios.post(url, payload, config);
  return res.data as T;
};

export const putData = async <T = any>(
  url: string,
  payload?: any,
  config?: AxiosRequestConfig
) => {
  const res = await publicAxios.put(url, payload, config);
  return res.data as T;
};

export const deleteData = async <T = any>(url: string, config?: AxiosRequestConfig) => {
  const res = await publicAxios.delete(url, config);
  return res.data as T;
};