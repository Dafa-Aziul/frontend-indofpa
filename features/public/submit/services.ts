import api from "@/lib/axios";
import { IsiKuesionerResponse } from "./types";

/**
 * Mengambil data kuesioner dan pertanyaan berdasarkan kode akses
 */
export const getKuesionerData = async (
  kodeAkses: string
): Promise<IsiKuesionerResponse> => {
  const res = await api.get<IsiKuesionerResponse>(
    `/api/public/isi-kuesioner/${kodeAkses}`
  );
  return res.data;
};

/**
 * Mengirim jawaban kuesioner
 */
export const submitJawaban = async (
  kodeAkses: string,
  payload: { distribusiId: number; profile: any; jawaban: any[] }
) => {
  const res = await api.post(
    `/api/public/kuesioner/${kodeAkses}/submit`,
    payload
  );
  return res.data;
};

/**
 * ✅ PERBAIKAN: Gunakan 'api' (Axios) bukan 'fetch'
 * Agar URL dasar (baseURL) sama dengan fungsi lainnya
 */
export const checkEmailDuplicate = async (
  email: string,
  kuesionerId: number
) => {
  // Axios otomatis mengubah objek params menjadi ?email=...&kuesionerId=...
  const res = await api.get(`/api/public/check-email`, {
    params: {
      email,
      kuesionerId,
    },
  });
  return res.data;
};
