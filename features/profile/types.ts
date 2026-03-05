/* =========================
   PROFILE USER
========================= */
export type ProfileUser = {
  userId: number;
  name: string;
  email: string;
};

export type ProfileResponse = {
  success: boolean;
  message: string;
  data: ProfileUser;
  meta: null;
};
/* =========================
   CHANGE PASSWORD PAYLOAD
========================= */
export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

/* =========================
   CHANGE PASSWORD RESPONSE
========================= */
export type ChangePasswordResponse = {
  success: boolean;
  message: string;
  data: null;
  meta: null;
};