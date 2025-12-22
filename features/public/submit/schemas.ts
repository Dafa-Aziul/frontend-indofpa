import { z } from "zod";

/* ======================================================
   ENUM CONSTANTS (TETAP)
   Digunakan untuk validasi dan referensi di UI
====================================================== */

export const USIA_KATEGORI = [
  "USIA_18_24",
  "USIA_25_34",
  "USIA_35_44",
  "USIA_45_54",
  "USIA_55_64",
  "USIA_65_PLUS",
] as const;

export const JENIS_KELAMIN = ["L", "P"] as const;

export const TINGKAT_PENDIDIKAN = [
  "TidakTamatSD",
  "SD",
  "SMP",
  "SMA",
  "Diploma",
  "S1",
  "S2",
  "S3",
] as const;

export const AGAMA = [
  "Islam",
  "KristenProtestan",
  "Katolik",
  "Hindu",
  "Buddha",
  "Konghucu",
  "Kepercayaan",
] as const;

/* ======================================================
   STEP 1 — PROFILE FORM SCHEMA
   Digunakan untuk validasi input pada langkah pertama
====================================================== */

export const profileFormSchema = z.object({
  nama: z.string().trim().min(3, "Nama minimal 3 karakter"),

  email: z
    .string()
    .trim()
    .email("Format email tidak valid")
    .refine(
      (email) =>
        ![
          "mailinator.com",
          "tempmail.com",
          "10minutemail.com",
          "guerrillamail.com",
        ].some((domain) => email.endsWith(`@${domain}`)),
      {
        message: "Email sementara tidak diperbolehkan",
      }
    ),

  // ✅ Menggunakan { message: "..." } agar kompatibel dengan Zod Overload
  usiaKategori: z.enum(USIA_KATEGORI, {
    message: "Kategori usia wajib dipilih",
  }),

  jenisKelamin: z.enum(JENIS_KELAMIN, {
    message: "Jenis kelamin wajib dipilih",
  }),

  tingkatPendidikan: z.enum(TINGKAT_PENDIDIKAN, {
    message: "Tingkat pendidikan wajib dipilih",
  }),

  agama: z.enum(AGAMA, {
    message: "Agama wajib dipilih",
  }),

  pekerjaan: z.string().trim().min(2, "Pekerjaan wajib diisi"),
});

export type ProfileForm = z.infer<typeof profileFormSchema>;

/* ======================================================
   STEP 1 — PROFILE FINAL
   Digunakan untuk keperluan mapping data ke API
====================================================== */

export const profileSchema = profileFormSchema;

/* ======================================================
   STEP 2 — JAWABAN SCHEMA
   Memvalidasi struktur jawaban kuesioner
====================================================== */

export const jawabanItemSchema = z.object({
  pertanyaanId: z.number(),
  nilai: z.number().min(1).max(5),
});

export const jawabanSchema = z
  .array(jawabanItemSchema)
  .min(1, "Jawaban kuesioner tidak boleh kosong");

export type JawabanFormValues = z.infer<typeof jawabanSchema>;

export const submitKuesionerSchema = z.object({
  profile: profileSchema,
  jawaban: jawabanSchema,
});

export type SubmitPayload = z.infer<typeof submitKuesionerSchema>;
