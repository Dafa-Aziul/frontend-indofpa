// fileName: src/features/monitoring/responden/services.ts

import api from "@/lib/axios"; // Asumsi path axios instance
import { RespondenDetailResponse } from "./types";

const RESPONDEN_DETAIL_ENDPOINT = (kuesionerId: number, respondenId: number) =>
    `/api/monitoring/${kuesionerId}/responden/${respondenId}`;

/**
 * Mengambil detail jawaban responden untuk kuesioner tertentu.
 */
export function getRespondenDetail(
    kuesionerId: number,
    respondenId: number
): Promise<RespondenDetailResponse> {
    return api
        .get(RESPONDEN_DETAIL_ENDPOINT(kuesionerId, respondenId))
        .then((res) => res.data.data);
}