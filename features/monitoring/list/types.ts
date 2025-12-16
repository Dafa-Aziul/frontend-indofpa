// fileName: src/features/monitoring/types.ts

// Tipe Status Kuesioner (sesuai respons API)
export type MonitoringStatus = "Draft" | "Publish" | "Arsip";

/**
 * Tipe data untuk setiap baris di Tabel Monitoring.
 */
export type MonitoringRow = {
    kuesionerId: number;
    judul: string;
    kategori: string; // Langsung berupa string nama kategori
    status: MonitoringStatus;
    targetResponden: number;
    responMasuk: number;
    progress: number; // Nilai persentase
    createdAt: string;
};

/**
 * Tipe data Meta untuk Pagination/Filter (Mirip dengan Meta Kuesioner)
 */
export type MonitoringMeta = {
    page: number;
    limit: number;
    total: number;
    pages: number;
    totalActive: number; // Dari meta.totalActive di response
    filters: {
        search: string | null;
        status: string | null;
        kategori: string | null;
    };
};

/**
 * Tipe data respons utama dari API List Monitoring
 */
export type MonitoringResponse = {
    data: MonitoringRow[];
    meta: MonitoringMeta;
};

/**
 * Tipe untuk parameter filter
 */
export type MonitoringFilterParams = {
    page: number;
    limit: number;
    search?: string;
    status?: MonitoringStatus | string;
    kategori?: string;
};