// fileName: src/features/analisis/detail/services.ts
import api from "@/lib/axios";
import qs from "qs"; // <-- TAMBAHKAN INI
import { AnalisisDetailResponse, FilterPayload } from "./types";

const ANALISIS_DETAIL_ENDPOINT = (kuesionerId: number) =>
    `/api/analisis/${kuesionerId}`;

/**
 * Mengambil data detail analisis (statistik multi-level) berdasarkan ID kuesioner.
 */
export function getAnalisisDetail(
    kuesionerId: number,
    filters: FilterPayload = {}
): Promise<AnalisisDetailResponse["data"]> {

    // 🚨 Konfigurasi QS agar array menjadi key=val1&key=val2 (arrayFormat: 'repeat')
    const paramsSerializer = (params: FilterPayload) => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
    };

    // (Opsional: console log untuk verifikasi)
    const baseUrl = ANALISIS_DETAIL_ENDPOINT(kuesionerId);
    const queryString = paramsSerializer(filters);
    console.log("URL BARU YANG DIKIRIM (Tanpa []):", `${baseUrl}?${queryString}`);
    
    // Kirim request dengan serializer kustom
    return api
        .get<AnalisisDetailResponse>(baseUrl, {
            params: filters,
            paramsSerializer: {
                serialize: paramsSerializer,
            },
        })
        .then((res) => res.data.data);
}