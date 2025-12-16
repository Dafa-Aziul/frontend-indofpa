export type KuesionerStatus = "Draft" | "Aktif" | "Selesai" | "Arsip";

export type Kuesioner = {
  kuesionerId: number;
  pembuatId: number;
  kategoriId: number;

  judul: string;
  tujuan: string;
  manfaat: string;

  estimasiMenit: number;
  targetResponden: number;
  status: KuesionerStatus;

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

  distribusi: Distribusi[];

  _count: {
    responden: number;
    variabel: number;
  };
};

export type inputKuesioner = {
  judul: string;
  tujuan: string;
  manfaat: string;
  kategoriId: number;
  estimasiMenit: number;
  targetResponden: number;
  kuesionerId: number;
};

export type Distribusi = {
  distribusiId: number;
  tanggalMulai: string;
  tanggalSelesai: string;
};
