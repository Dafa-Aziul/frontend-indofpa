export type Kategori = {
    kategoriId: number;
    nama: string;
    createdAt: string;
    updatedAt: string;
};

export type PaginationMeta = {
    page: number;
    limit: number;
    total: number;
    pages: number;
};

export type KategoriListResponse = {
    data: Kategori[];
    meta: PaginationMeta;
};
