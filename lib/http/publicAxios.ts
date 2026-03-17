import axios from "axios";

export const publicAxios = axios.create({
  baseURL: process.env.API_URL,
});