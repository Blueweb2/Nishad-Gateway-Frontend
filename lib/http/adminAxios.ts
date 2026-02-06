import axios from "axios";

export const adminAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});
console.log("BASE URL:", process.env.NEXT_PUBLIC_API_URL);


// 🔁 RESPONSE INTERCEPTOR (ADMIN ONLY)
adminAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error?.response?.status;
    const url = originalRequest?.url || "";

    // ❌ never refresh on auth routes
    if (
      url.includes("/admin/login") ||
      url.includes("/admin/refresh") ||
      url.includes("/admin/me")
    ) {
      return Promise.reject(error);
    }

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await adminAxios.post("/admin/refresh");
        return adminAxios(originalRequest);
      } catch {
        // 🔐 session expired
        if (typeof window !== "undefined") {
          window.location.href = "/admin/login";
        }
      }
    }

    return Promise.reject(error);
  }
);