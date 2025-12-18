/**
 * Objek tunggal Kuesioner Publik
 */
export type PublicKuesioner = {
    distribusiId: number;       // ID distribusi
    kuesionerIde: number;       // ID kuesioner dari database
    kuesionerId: number;        // ID utama kuesioner
    kodeAkses: string;          // Kode akses unik
    urlLink: string;            // Link pengisian
    judul: string;              // Judul kuesioner
    tujuan: string;             // Deskripsi tujuan kuesioner
    kategori: string | null;    // Nama kategori
    tanggalMulai: string;       // Tanggal mulai (ISO string)
    tanggalSelesai: string;     // Tanggal selesai (ISO string)
};

/**
 * Response untuk List (Banyak Data)
 */
export type PublicListResponse = {
    success: boolean;           // Status sukses
    message: string;            // Pesan response
    data: PublicKuesioner[];    // Array data kuesioner
    meta: null;           // Metadata paginasi
};

/**
 * Response untuk Detail (Satu Data)
 * Sesuai dengan Promise<{ success: boolean; data: PublicKuesioner }> di services.ts
 */
export type PublicDetailResponse = {
    success: boolean;           // Status sukses
    message: string;            // Pesan response
    data: PublicKuesioner;      // Data tunggal kuesioner
};