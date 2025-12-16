// features/auth/api/auth.api.ts
import api from "@/lib/axios";

export async function apiLogin(payload: {
  email: string;
  password: string;
  remember: boolean;
}) {
  return api.post("/api/auth/login", payload, {
    withCredentials: true,
  });
}

export async function apiLogout() {
  return api.post(
    "/api/auth/logout",
    {},
    {
      withCredentials: true,}
  );
}


