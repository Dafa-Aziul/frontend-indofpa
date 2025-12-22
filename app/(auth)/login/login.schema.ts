import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  password: z
    .string()
    .min(1, "Password wajib diisi")
    .min(6, "Minimal 6 karakter"),
  remember: z.boolean().optional(),
});

// Infer tipe data secara otomatis agar sinkron 100%
export type LoginSchema = z.infer<typeof loginSchema>;
