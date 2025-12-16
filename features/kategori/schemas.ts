import { z } from "zod";

export const kategoriSchema = z.object({
  nama: z.string().min(3, "Minimal 3 karakter"),
});

export type KategoriFormValues = z.infer<typeof kategoriSchema>;
