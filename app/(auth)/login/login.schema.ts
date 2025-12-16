// features/auth/schemas/login.schema.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email tidak boleh kosong")
    .email("Format email tidak valid"),

  password: z
    .string()
    .min(1, "Password tidak boleh kosong")
    .min(6, "Password minimal 6 karakter"),

  remember: z.boolean().default(false),   // FIX UTAMA
});

// Type infer → remember: boolean (bukan opsional)
export type LoginSchema = z.infer<typeof loginSchema>;
