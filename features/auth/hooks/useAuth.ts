// features/auth/hooks/useAuth.ts
import { loginService } from "../services/auth.service";
import api from "@/lib/axios";

export function useAuth() {
  async function login(email: string, password: string, remember: boolean) {
    return await loginService(email, password, remember);
  }

  async function logout() {
    try {
      await api.post("/auth/logout"); // backend should clear HttpOnly refresh cookie
    } catch (e) {
      console.warn("Logout request failed", e);
    }
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  }

  return { login, logout };
}
