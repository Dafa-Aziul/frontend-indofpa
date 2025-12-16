// fileName: src/features/monitoring/responden/types.ts

// Tipe untuk informasi demografi dan waktu responden
export type RespondenDetail = {
    respondenId: number;
    nama: string;
    email: string;
    usiaKategori: string;
    jenisKelamin: string;
    tingkatPendidikan: string;
    agama: string;
    pekerjaan: string;
    waktuMulai: string;
    waktuSelesai: string;
    durasiDetik: number;
};

// Tipe untuk detail setiap jawaban pertanyaan
export type JawabanItem = {
    pertanyaanId: number;
    teksPertanyaan: string;
    urutan: number;
    labelSkala: {
        [key: string]: string;
    };
    nilai: number;
    labelDipilih: string;
};

// ✅ Tipe untuk Ringkasan Skor Survey
export type RingkasanScore = {
    teksRingkasan: string;
    totalSkor: string; // cth: "46 / 60"
    rataRataSkor: string; // cth: "3.83 dari 5.00"
    pencapaian: string; // cth: "76.7%"
};

// ✅ Tipe untuk Skor Per Indikator
export type IndicatorScoreItem = {
    indikatorId: number;
    namaIndikator: string;
    scoreRaw: number;
    scoreNormalized: number | null;
    maxScore: number; 
};


// ✅ Tipe data respons utama Detail Jawaban Responden (Diperbarui)
export type RespondenDetailResponse = {
    responden: RespondenDetail;
    jawaban: JawabanItem[];
    ringkasan: RingkasanScore;
    indicatorScores: IndicatorScoreItem[];
};