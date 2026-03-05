import api from "@/lib/axios";
import { publicApi } from "./api";
import {
  ChangePasswordPayload,
  ChangePasswordResponse,
  ProfileResponse,
  ProfileUser,
} from "./types";

/* =========================
   GET PROFILE
========================= */
export async function getProfileService(): Promise<ProfileUser> {
  const res = await api.get<ProfileResponse>(publicApi.profile);
  return res.data.data; // ambil data user saja
}

/* =========================
   CHANGE PASSWORD
========================= */
export async function changePasswordService(
  payload: ChangePasswordPayload,
): Promise<ChangePasswordResponse> {
  const res = await api.patch<ChangePasswordResponse>(
    publicApi.changePassword,
    payload,
  );

  return res.data;
}
