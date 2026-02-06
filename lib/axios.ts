// import axios from "axios";
// import toast from "react-hot-toast";

// export const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   withCredentials: true,
// });

// //  RESPONSE INTERCEPTOR (GLOBAL)
// let isRefreshing = false;

// api.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const originalRequest = error.config;
//     const status = error?.response?.status;
//     const url = originalRequest?.url || "";

//     // ❌ never refresh on auth routes
//     if (
//       url.includes("/admin/login") ||
//       url.includes("/admin/me")
//     ) {
//       return Promise.reject(error);
//     }

//     if (status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         await api.post("/admin/refresh");
//         return api(originalRequest);
//       } catch {
//         window.location.href = "/admin/login";
//       }
//     }

//     return Promise.reject(error);
//   }
// );