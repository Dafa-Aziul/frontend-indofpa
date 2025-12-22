export interface InterpretasiRange {
  max: number;
  min: number;
  label: string;
}

export interface KuesionerAnalisisConfig {
  interpretasi: InterpretasiRange[];
}

export interface InterpretasiResult {
  label: string;
  range: string;
}

export interface PertanyaanStats {
  count: number;
  avgRaw: number;
  avgNormalized: number;
}

export interface PertanyaanDetail {
  pertanyaanId: number;
  teksPertanyaan: string;
  urutan: number;
  scale: { min: number; max: number };
  stats: PertanyaanStats;
  interpretasi: InterpretasiResult;
}

export interface AnalisisPertanyaanGroup {
  indikatorId: number;
  kode: string;
  pertanyaan: PertanyaanDetail[];
}

export interface AnalisisIndikator {
  indikatorId: number;
  variabelId: number;
  indikatorKode: string;
  indikatorNama: string;
  pertanyaanCount: number;
  avgRaw: number;
  avgNormalized: number;
  interpretasi: InterpretasiResult | null;
}

export interface AnalisisVariabel {
  variabelId: number;
  nama: string;
  kode: string;
  indikatorCount: number;
  avgNormalized: number;
  interpretasi: InterpretasiResult;
}

export interface AnalisisDetailData {
  kuesioner: { 
    judul: string; 
    analisisConfig: KuesionerAnalisisConfig;
    kuesionerId?: number;
    distribusi?: { tanggalSelesai: string }[];
  };
  totalResponden: number;
  pertanyaan: AnalisisPertanyaanGroup[];
  indikator: AnalisisIndikator[];
  variabel: AnalisisVariabel[];
  overall: number;
  overallInterpretasi: InterpretasiResult;
}

export interface AnalisisDetailResponse {
  success: boolean;
  message: string;
  data: AnalisisDetailData;
  meta: null;
}

// Filter Types
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

export type FilterTag = {
    key: keyof FilterPayload;
    value: string;
    label: string;
    displayValue: string;
};
