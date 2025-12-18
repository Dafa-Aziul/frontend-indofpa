export type Pertanyaan = {
  pertanyaanId: number;
  teksPertanyaan: string;
  urutan: number;
  labelSkala: Record<string, string>;
};

export type IsiKuesionerData = {
  distribusiId: number;
  kuesioner: {
    kuesionerId: number;
    judul: string;
    tujuan: string;
    manfaat: string;
    estimasiMenit: number;
    targetResponden: number;
  };
  pertanyaan: Pertanyaan[];
};

export type IsiKuesionerResponse = {
  success: boolean;
  message: string;
  data: IsiKuesionerData;
};

export type UserProfile = {
  nama: string;
  email: string;
  usiaKategori:
    | "USIA_18_24"
    | "USIA_25_34"
    | "USIA_35_44"
    | "USIA_45_54"
    | "USIA_55_64"
    | "USIA_65_PLUS"
    | "";
  jenisKelamin: "L" | "P" | "";
  tingkatPendidikan:
    | "TidakTamatSD"
    | "SD"
    | "SMP"
    | "SMA"
    | "Diploma"
    | "S1"
    | "S2"
    | "S3"
    | "";
  agama:
    | "Islam"
    | "KristenProtestan"
    | "Katolik"
    | "Hindu"
    | "Buddha"
    | "Konghucu"
    | "Kepercayaan"
    | "";
  pekerjaan: string;
};

export type SubmitPayload = {
  profile: UserProfile;
  jawaban: { pertanyaanId: number; nilai: number }[];
};
