// fileName: src/features/analisis/detail/types.ts

/* ======================================================
   UTIL: INTERPRETASI
====================================================== */

export interface InterpretasiRange {
  max: number;
  min: number;
  label: string;
}

export interface InterpretasiResult {
  label: string;
  range: string;
}

/* ======================================================
   STATS DETAIL (Pertanyaan Level)
====================================================== */

export interface PertanyaanScale {
  min: number;
  max: number;
}

export interface PertanyaanStats {
  count: number;
  avgRaw: number;
  avgNormalized: number; // 0-100
}

export interface PertanyaanDetail {
  pertanyaanId: number;
  teksPertanyaan: string;
  urutan: number;
  scale: PertanyaanScale;
  stats: PertanyaanStats;
  interpretasi: InterpretasiResult;
}

/* ======================================================
   DATA ANALISIS PER LEVEL
====================================================== */

/**
 * Data per Indikator (Grouped by Indikator) yang berisi daftar pertanyaan di bawahnya.
 */
export interface AnalisisPertanyaanGroup {
  indikatorId: number;
  kode: string; // Contoh: "I1.1"
  pertanyaan: PertanyaanDetail[];
}

/**
 * Data Ringkasan Statistik per Indikator.
 */
export interface AnalisisIndikator {
  indikatorId: number;
  variabelId: number;
  indikatorKode: string;
  indikatorNama: string;
  pertanyaanCount: number;
  avgRaw: number;
  avgNormalized: number; // 0-100
  interpretasi: InterpretasiResult;
}

/**
 * Data Ringkasan Statistik per Variabel.
 */
export interface AnalisisVariabel {
  variabelId: number;
  nama: string;
  kode: string;
  indikatorCount: number;
  avgNormalized: number; // 0-100
  interpretasi: InterpretasiResult;
}

/* ======================================================
   RESPONSE UTAMA
====================================================== */

export interface KuesionerAnalisisConfig {
  interpretasi: InterpretasiRange[];
}

export interface AnalisisDistribusi {
  tanggalSelesai: string;
}

export interface KuesionerAnalisisSummary {
  kuesionerId: number;
  judul: string;
  analisisConfig: KuesionerAnalisisConfig;
  distribusi: AnalisisDistribusi[];
}

export interface AnalisisDetailData {
  kuesioner: KuesionerAnalisisSummary;
  totalResponden: number;

  pertanyaan: AnalisisPertanyaanGroup[];

  indikator: AnalisisIndikator[];
  variabel: AnalisisVariabel[];

  overall: number; // Rata-rata keseluruhan dinormalisasi
  overallInterpretasi: InterpretasiResult;
}

export interface AnalisisDetailResponse {
  success: boolean;
  message: string;
  data: AnalisisDetailData;
  meta: null;
}

// ASUMSI: Tipe ENUM diambil dari FilterAnalisisDialog.tsx
export type UsiaKategori = "USIA_18_24" | "USIA_25_34" | "USIA_35_44" | "USIA_45_54" | "USIA_55_64" | "USIA_65_PLUS";
export type JenisKelamin = "L" | "P";
export type TingkatPendidikan = "TidakTamatSD" | "SD" | "SMP" | "SMA" | "Diploma" | "S1" | "S2" | "S3";
export type Agama = "Islam" | "KristenProtestan" | "Katolik" | "Hindu" | "Buddha" | "Konghucu" | "Kepercayaan";

export interface FilterPayload {
    usiaKategori?: UsiaKategori[];
    tingkatPendidikan?: TingkatPendidikan[];
    agama?: Agama[];
    jenisKelamin?: JenisKelamin;
}