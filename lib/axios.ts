import axios from "axios";
import toast from "react-hot-toast";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});



