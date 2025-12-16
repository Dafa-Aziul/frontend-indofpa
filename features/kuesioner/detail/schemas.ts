// fileName: schemas.ts
import { z } from "zod";

/* ======================================================
   VARIABEL
   Endpoint:
   - POST   /kuesioner/:kuesionerId/variabel
   - PATCH  /variabel/:variabelId
====================================================== */

export const variabelSchema = z.object({
  kode: z.string().min(1, "Kode wajib diisi").max(10),
  nama: z.string().min(1, "Nama wajib diisi"),
  deskripsi: z.string().min(1, "Deskripsi wajib diisi"),
});

export type VariabelFormValues = z.infer<typeof variabelSchema>;

/* ======================================================
   INDIKATOR
   Endpoint:
   - POST   /variabel/:variabelId/indikator
   - PATCH  /indikator/:indikatorId
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
   Endpoint:
   - POST   /indikator/:indikatorId/pertanyaan
   - PATCH  /pertanyaan/:pertanyaanId
====================================================== */

const ScaleItemSchema = z.object({
  // Nilai numerik skala, digunakan untuk membuat key objek (1, 2, 3, dst.)
  value: z.number().int().min(1),
  // Label teks yang dimasukkan pengguna
  label: z.string().min(1, "Label wajib diisi"),
});

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
  templateType: z
    .string({
      // ✅ required_error DITERIMA di properti konfigurasi z.string()
      // Ini menangani kasus jika select tidak dipilih (inputnya adalah string kosong)
      required_error: "Pilihan Skala wajib diisi",
    })
    .pipe(
      // Pipe memastikan string yang diterima adalah salah satu dari nilai enum yang diizinkan.
      // Ini berfungsi sebagai validasi nilai (type/value error).
      z.enum(["likert_5", "likert_6_tt", "custom"])
    ),
  // Field data: Array untuk menampung semua poin skala (baik dari template maupun kustom)
  customScales: z
    .array(ScaleItemSchema)
    .min(2, "Skala minimal 2 poin")
    .max(10, "Skala maksimal 10 poin")
    .optional(),

  // ID indikator tempat pertanyaan ini berada (Diperlukan saat CREATE/PATCH)
  indikatorId: z.number().int().min(1).optional(),
});

export type PertanyaanFormValues = z.infer<typeof PertanyaanFormSchema>;

/* ======================================================
   UTIL – PARTIAL SCHEMA UNTUK PATCH
====================================================== */

export const variabelPatchSchema = variabelSchema.partial();
export const indikatorPatchSchema = indikatorSchema.partial();
export const pertanyaanPatchSchema = PertanyaanFormSchema.partial();
