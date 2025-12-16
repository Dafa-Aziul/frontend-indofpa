/* ================= KUESIONER ================= */

export type Kuesioner = {
  kuesionerId: number;
  judul: string;
  tujuan: string;
  manfaat: string;
  estimasiMenit: number;
  targetResponden: number;
  status: "Draft" | "Aktif" | "Arsip";
  createdAt: string;
  updatedAt: string;

  kategori: {
    kategoriId: number;
    nama: string;
  };

  pembuat: {
    userId: number;
    name: string;
    email: string;
  };

  distribusi: {
    distribusiId: number;
    urlLink: string;
    tanggalMulai: string;
    tanggalSelesai: string;
  }[];

  _count: {
    responden: number;
  };
};

/* ================= VARIABEL ================= */

export type Variabel = {
  variabelId: number;
  kuesionerId: number;
  kode: string;
  nama: string;
  deskripsi: string;
};

/* ================= INDIKATOR ================= */

export type Indikator = {
  indikatorId: number;
  variabelId: number;
  kode: string;
  nama: string;
};

/* ================= PERTANYAAN ================= */

export type Pertanyaan = {
  pertanyaanId: number;
  indikatorId: number;
  teksPertanyaan: string;
  urutan: number;
  labelSkala: Record<string, string>;
};

/* ================= RESPONSE ================= */

export type KuesionerDetailResponse = {
  kuesioner: Kuesioner;
  variabel: Variabel[];
  indikator: Indikator[];
  pertanyaan: Pertanyaan[];
};
