// src/lib/apiClient.ts
import { AxiosError, AxiosResponse } from "axios";

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
  filtered?: number;
  search?: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: PaginationMeta | null;
}

export async function apiClient<T>(
  requestFn: () => Promise<AxiosResponse<ApiResponse<T>>>
): Promise<T> {
  try {
    const response = await requestFn();
    const body = response.data;

    // ❗ Backend bilang gagal
    if (body.success === false) {
      throw new Error(body.message || "Request gagal (success=false)");
    }

    return body.data;
  } catch (error) {
    // ================= AXIOS ERROR =================
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      const url = error.config?.url;
      const method = error.config?.method?.toUpperCase();

      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message;

      console.error("API CLIENT ERROR DETAIL", {
        status,
        method,
        url,
        backendMessage,
        response: error.response?.data,
      });

      throw new Error(
        backendMessage ||
          `API Error ${status} (${method} ${url})`
      );
    }

    // ================= UNKNOWN ERROR =================
    console.error("UNKNOWN API CLIENT ERROR", error);
    throw new Error("Terjadi kesalahan tidak terduga");
  }
}
