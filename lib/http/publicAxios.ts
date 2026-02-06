import axios from "axios";

export const publicAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

console.log(process.env.NEXT_PUBLIC_API_URL, "PUBLIC BASE URL");