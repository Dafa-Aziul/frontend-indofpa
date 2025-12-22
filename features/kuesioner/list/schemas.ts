import { z } from "zod";

export const kuesionerSchema = z.object({
  judul: z.string().trim().min(3, "Judul minimal 3 karakter"),

  tujuan: z.string().trim().min(5, "Tujuan minimal 5 karakter"),

  manfaat: z.string().trim().min(5, "Manfaat minimal 5 karakter"),

  // 💡 Solusi: Gunakan properti 'message' saja atau langsung di dalam .min()
  kategoriId: z
    .number({ message: "Kategori wajib dipilih" })
    .min(1, "Kategori wajib dipilih"),

  estimasiMenit: z
    .number({ message: "Estimasi harus berupa angka" })
    .min(1, "Estimasi minimal 1 menit"),

  targetResponden: z
    .number({ message: "Target harus berupa angka" })
    .min(1, "Target responden minimal 1"),
});

export type KuesionerFormValues = z.infer<typeof kuesionerSchema>;

/* ================= DISTRIBUSI ================= */

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
    (data) => {
      const start = new Date(data.tanggalMulai).getTime();
      const end = new Date(data.tanggalSelesai).getTime();
      return start <= end;
    },
    {
      message: "Tanggal selesai harus setelah atau sama dengan tanggal mulai",
      path: ["tanggalSelesai"],
    }
  );

export type KuesionerDistribusiValues = z.infer<
  typeof kuesionerDistribusiSchema
>;
