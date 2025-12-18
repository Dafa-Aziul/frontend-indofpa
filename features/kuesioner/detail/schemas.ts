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

export type IndikatorFormValues = z.infer<typeof indikatorSchema>;

/* ======================================================
   PERTANYAAN & SKALA (BARU: Mendukung Template & Custom Field Array)
====================================================== */

const ScaleItemSchema = z.object({
  value: z.number().int().min(1),
  label: z.string().min(1, "Label wajib diisi"),
});

const TemplateTypeEnum = z.enum(["likert_5", "likert_6_tt", "custom"]);

export const PertanyaanFormSchema = z.object({
  teksPertanyaan: z.string().min(5, "Pertanyaan minimal 5 karakter"),

  // Urutan wajib diisi
  urutan: z
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "Urutan wajib diisi"
          : "Urutan harus berupa angka",
    })
    .min(1, "Urutan minimal 1"),

  // Field UI: Menentukan mode skala (likert_5, likert_6_tt, atau custom)
  // Menggunakan z.union untuk tipe enum + transform string kosong menjadi undefined.
  // Properti 'error'/errorMap yang bermasalah DIHAPUS, validasi required dilakukan di .superRefine.
  templateType: z
    .union([
      z.literal("").transform(() => undefined), // Untuk menangani input select yang kosong
      TemplateTypeEnum,
    ])
    .optional() // Dibuat optional karena select bisa kosong
    .superRefine((val, ctx) => {
      // Logika validasi required kustom:
      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Pilihan Skala wajib diisi",
        });
        return z.NEVER; // Menghentikan validasi lebih lanjut
      }
    }),

  // Field data: Array untuk menampung semua poin skala
  customScales: z
    .array(ScaleItemSchema)
    .min(2, "Skala minimal 2 poin")
    .max(10, "Skala maksimal 10 poin")
    .optional(),

  // ID indikator tempat pertanyaan ini berada (Diperlukan saat CREATE/PATCH)
  indikatorId: z.number().int().min(1, "Indikator wajib dipilih").optional(),
});

export type PertanyaanFormValues = z.infer<typeof PertanyaanFormSchema>;

/* ======================================================
   UTIL – PARTIAL SCHEMA UNTUK PATCH
====================================================== */

export const variabelPatchSchema = variabelSchema.partial();
export const indikatorPatchSchema = indikatorSchema.partial();
export const pertanyaanPatchSchema = PertanyaanFormSchema.partial();
