// fileName: src/features/monitoring/detail/types.ts

// Tipe untuk data responden individu
export type RespondenItem = {
  respondenId: number;
  nama: string;
  email: string;
  waktuMulai: string;
  waktuSelesai: string;
  durasiDetik: number;
};

// Tipe untuk detail kuesioner yang disematkan
export type KuesionerMonitoringDetail = {
  kuesionerId: number;
  judul: string;
  status: string; // Misal: 'Arsip', 'Publish', 'Draft'
  targetResponden: number;
  createdAt: string;
  kategori: {
    nama: string;
  };
  _count: {
    responden: number;
  };
  totalResponden: number; // Jumlah respon masuk
  progress: number; // Persentase progress
  // Jika ada distribusi (tanggal mulai/akhir) tambahkan di sini
};

// Tipe data respons utama Detail Monitoring
export type MonitoringDetailResponse = {
  kuesioner: KuesionerMonitoringDetail;
  items: RespondenItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};
