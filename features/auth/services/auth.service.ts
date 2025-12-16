// features/auth/services/auth.service.ts

import axios from "axios";
import { apiLogin, apiLogout } from "../api/auth.api";

export async function loginService(
  email: string,
  password: string,
  remember: boolean = false
) {
  try {
    const res = await apiLogin({ email, password, remember });

    const { accessToken, user } = res.data?.data || {};

    if (accessToken) {
      localStorage.setItem("access_token", accessToken);
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }

    return { success: true, data: res.data.data };

  } catch (err) {
    console.error("LOGIN ERROR RAW:", err);

    let message = "Terjadi kesalahan";

    if (axios.isAxiosError(err)) {
      message = err.response?.data?.message || message;
    }

    return { success: false, error: message };
  }
}

// -----------------------------------------------------
// 🚀 LOGOUT SERVICE (Bagian ini kamu tambahkan)
// -----------------------------------------------------

export async function logoutService() {
  try {
    // 1. Beri kesempatan backend menghapus refresh_token
    await apiLogout();
  } catch (err) {
    console.warn("Logout backend gagal, lanjut hapus local data");
  }

  // 2. Hapus token di client
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  }

  // 3. Redirect aman (tanpa risiko looping)
  if (typeof window !== "undefined") {
    window.location.replace("/login");
  }

  return { success: true };
}