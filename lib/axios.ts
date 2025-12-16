// lib/axios.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

const refreshApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

let isRefreshing = false;

let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: AxiosError) => void;
}[] = [];

const processQueue = (error: AxiosError | null, token: string | null) => {
  failedQueue.forEach((prom) => {
    error ? prom.reject(error) : prom.resolve(token as string);
  });
  failedQueue = [];
};

// =======================
// REQUEST INTERCEPTOR
// =======================
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// =======================
// RESPONSE INTERCEPTOR
// =======================
api.interceptors.response.use(
  (res) => res,

  async (error) => {
    const err = error as AxiosError;
    const originalRequest = err.config as RetryAxiosRequestConfig;

    if (!err.response) return Promise.reject(err);

    const status = err.response.status;
    const url = originalRequest.url || "";

    // ❌ Jangan refresh untuk endpoint auth
    if (
      url.includes("/api/auth/login") ||
      url.includes("/api/auth/logout") ||
      url.includes("/api/auth/refresh")
    ) {
      return Promise.reject(err);
    }

    // 🔁 Hanya handle 401 & belum retry
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // ⏳ Jika refresh sedang jalan → antri
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          })
          .catch((e) => Promise.reject(e));
      }

      isRefreshing = true;

      try {
        const refreshRes = await refreshApi.post("/api/auth/refresh");

        const accessToken = refreshRes.data?.data?.accessToken;
        const user = refreshRes.data?.data?.user;

        if (!accessToken) {
          throw new Error("Tidak ada accessToken baru");
        }

        // ✅ SIMPAN TOKEN
        localStorage.setItem("access_token", accessToken);

        // ✅ SIMPAN USER (INI YANG KAMU MINTA)
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
        }

        // Update header request awal
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Jalankan request antrian
        processQueue(null, accessToken);

        return api(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr as AxiosError, null);

        // ❌ Refresh gagal → logout
        if (typeof window !== "undefined") {
          localStorage.removeItem("access_token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default api;
