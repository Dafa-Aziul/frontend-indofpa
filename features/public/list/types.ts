/* =========================
   KATEGORI
========================= */
export type PublicKategori = {
    kategoriId: number;
    nama: string;
};

/* =========================
   DISTRIBUSI (PUBLIC)
   (sesuai response: hanya kodeAkses)
========================= */
export type PublicDistribusi = {
    kodeAkses: string;
};

/* =========================
   KUESIONER (PUBLIC)
========================= */
export type PublicKuesioner = {
    kuesionerId: number;
    judul: string;
    tujuan: string ;
    manfaat: string | null;
    distribusiId: number;
    estimasiMenit: number | null;
    targetResponden: number | null;
    kategori: PublicKategori;
    distribusi: PublicDistribusi[];
    tanggalMulai: string;
    tanggalSelesai: string;
    createdAt: string;
    updatedAt: string;
};

/* =========================
   PERTANYAAN (DETAIL)
========================= */
export type PublicPertanyaan = {
    pertanyaanId: number;
    indikatorId: number;
    teksPertanyaan: string;
    urutan: number;
    labelSkala: Record<string, string>;
    createdAt: string;
    updatedAt: string;
};

/* =========================
   DATA DETAIL (WRAPPER)
========================= */
export type PublicDetailData = {
    kuesioner: PublicKuesioner;
    pertanyaan: PublicPertanyaan[];
};

/* =========================
   RESPONSE LIST
========================= */
export type PublicListResponse = {
    success: boolean;
    message: string;
    data: PublicKuesioner[];
    meta: null;
};

/* =========================
   RESPONSE DETAIL (FINAL)
========================= */
export type PublicDetailResponse = {
    success: boolean;
    message: string;
    data: PublicDetailData;
    meta: null;
};
