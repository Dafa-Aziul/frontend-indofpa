import { z } from "zod";

/* ================= KUESIONER (CREATE / EDIT) ================= */

export const kuesionerSchema = z.object({
  judul: z.string().min(3, "Judul minimal 3 karakter"),

  tujuan: z.string().min(5, "Tujuan minimal 5 karakter"),

  manfaat: z.string().min(5, "Manfaat minimal 5 karakter"),

  kategoriId: z
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "Kategori wajib dipilih"
          : "Kategori tidak valid",
    })
    .min(1, "Kategori wajib dipilih"),

  estimasiMenit: z.number().min(1, "Estimasi minimal 1 menit"),

  targetResponden: z.number().min(1, "Target responden minimal 1"),
});

export type KuesionerFormValues = z.infer<typeof kuesionerSchema>;

/* ================= DISTRIBUSI KUESIONER ================= */

/**
 * Strict date format: yyyy-MM-dd
 */
const dateStringSchema = z
  .string()
  .min(1, "Tanggal wajib diisi")
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal harus yyyy-MM-dd");

export const kuesionerDistribusiSchema = z
  .object({
    tanggalMulai: dateStringSchema,
    tanggalSelesai: dateStringSchema,
  })
  .refine(
    (data) =>
      new Date(data.tanggalMulai) <= new Date(data.tanggalSelesai),
    {
      message: "Tanggal selesai harus setelah atau sama dengan tanggal mulai",
      path: ["tanggalSelesai"],
    }
  );

export type KuesionerDistribusiValues = z.infer<
  typeof kuesionerDistribusiSchema
>;
