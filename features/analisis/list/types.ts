// src/features/analisis/types.ts
// Mirip dengan Kategori, tetapi disesuaikan untuk Analisis
export type KategoriAnalisis = {
    nama: string;
};

export type AnalisisCount = {
    responden: number;
    variabel: number;
};

export type AnalisisItem = {
    kuesionerId: number;
    judul: string;
    kategori: KategoriAnalisis;
    createdAt: string;
    updatedAt: string;
    _count: AnalisisCount;
};

export type PaginationMeta = {
    page: number;
    limit: number;
    total: number;
    pages: number;
    filtered?: number;
};