// src/features/analisis/detail/schemas.ts
import * as z from "zod";

export const ConfigInterpretasiSchema = z.object({
  interpretasi: z.array(
    z.object({
      min: z.number()
        .min(0, "Minimal 0")
        .max(100, "Maksimal 100"),
      max: z.number()
        .min(0, "Minimal 0")
        .max(100, "Maksimal 100"),
      label: z.string().min(1, "Label harus diisi"),
    })
  )
  .min(1, "Minimal harus ada satu rentang interpretasi")
  // Validasi agar nilai min tidak lebih besar dari max
  .refine((items) => items.every((item) => item.min <= item.max), {
    message: "Nilai min tidak boleh lebih besar dari max",
  }),
});

export type ConfigInterpretasiValues = z.infer<typeof ConfigInterpretasiSchema>;