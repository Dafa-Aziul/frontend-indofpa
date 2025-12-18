import api from "@/lib/axios";
import { IsiKuesionerResponse } from "./types";

/**
 * Mengambil data kuesioner dan pertanyaan berdasarkan kode akses
 * URL: /api/isi-kuesioner/[kodeAkses]
 */
export const getKuesionerData = async (kodeAkses: string): Promise<IsiKuesionerResponse> => {
    const res = await api.get<IsiKuesionerResponse>(`/api/public/isi-kuesioner/${kodeAkses}`);
    return res.data;
};

/**
 * Mengirim jawaban kuesioner
 * URL: /api/isi-kuesioner/[kodeAkses]/submit
 */
export const submitJawaban = async (kodeAkses: string, payload: { distribusiId: number; profile: any; jawaban: any[] }) => {
    // Sesuaikan persis dengan rute backend Abang
    const res = await api.post(`/api/public/kuesioner/${kodeAkses}/submit`, payload);
    return res.data;
};