// fileName: schemas.ts
import { z } from "zod";

/* ======================================================
   VARIABEL
====================================================== */

export const variabelSchema = z.object({
  kode: z.string().min(1, "Kode wajib diisi").max(10),
  nama: z.string().min(1, "Nama wajib diisi"),
  deskripsi: z.string().min(1, "Deskripsi wajib diisi"),
});

export type VariabelFormValues = z.infer<typeof variabelSchema>;

/* ======================================================
   INDIKATOR
====================================================== */

export const indikatorSchema = z.object({
  kode: z
    .string()
    .min(1, "Kode indikator wajib diisi")
    .max(10, "Kode maksimal 10 karakter"),
  nama: z.string().min(1, "Nama indikator wajib diisi"),
});

export const IndikatorFormExtendedSchema = indikatorSchema.extend({
  // variabelId harus dikoersi agar input string dari Select menjadi number
  variabelId: z.number().min(1, "Variabel wajib dipilih"),
});

export type IndikatorFormValues = z.infer<typeof indikatorSchema>;
export type IndikatorFormExtendedValues = z.infer<
  typeof IndikatorFormExtendedSchema
>;
/* ======================================================
   PERTANYAAN & SKALA (BARU: Mendukung Template & Custom Field Array)
====================================================== */

const ScaleItemSchema = z.object({
  value: z.number().int().min(1),
  label: z.string().min(1, "Label wajib diisi"),
});

export const PertanyaanFormSchema = z.object({
  teksPertanyaan: z.string().min(5, "Pertanyaan minimal 5 karakter"),
  // ✅ Gunakan coerce agar input string otomatis jadi number
  urutan: z.number().min(1, "Urutan minimal 1"),
  indikatorId: z.number().min(1, "Indikator wajib dipilih"),
  templateType: z.enum(["likert_5", "likert_6_tt", "custom"], {
    message: "Pilih salah satu tipe template kuesioner",
  }),
  customScales: z.array(ScaleItemSchema).min(2, "Skala minimal 2 poin"),
});

export type PertanyaanFormValues = z.infer<typeof PertanyaanFormSchema>;

/* ======================================================
   UTIL – PARTIAL SCHEMA UNTUK PATCH
====================================================== */

export const variabelPatchSchema = variabelSchema.partial();
export const indikatorPatchSchema = indikatorSchema.partial();
export const pertanyaanPatchSchema = PertanyaanFormSchema.partial();
