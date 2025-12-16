// fileName: api.ts

export const kuesionerDetailApi = {
  detail: (id: number) => `/api/kuesioner/${id}`,

  // Endpoint untuk variabel
  variabel: {
    list: (kuesionerId: number) => `/api/kuesioner/${kuesionerId}/variabel`,
    create: (kuesionerId: number) => `/api/kuesioner/${kuesionerId}/variabel`,
    update: (variabelId: number) => `/api/variabel/${variabelId}`,
    delete: (variabelId: number) => `/api/variabel/${variabelId}`,
  },

  // Endpoint untuk indikator
  indikator: {
    // Endpoint untuk mengambil semua indikator di kuesioner ini
    list: (kuesionerId: number) => `/api/kuesioner/${kuesionerId}/indikator`,

    create: (variabelId: number) => `/api/variabel/${variabelId}/indikator`,
    update: (indikatorId: number) => `/api/indikator/${indikatorId}`,
    delete: (indikatorId: number) => `/api/indikator/${indikatorId}`,
  },

  // Endpoint untuk pertanyaan
  pertanyaan: {
    // POST: Membuat pertanyaan baru di bawah Indikator tertentu
    create: (indikatorId: number) => `/api/indikator/${indikatorId}/pertanyaan`,
    // PATCH/DELETE: Menggunakan ID Pertanyaan langsung
    update: (pertanyaanId: number) => `/api/pertanyaan/${pertanyaanId}`,
    delete: (pertanyaanId: number) => `/api/pertanyaan/${pertanyaanId}`,
  },
};
