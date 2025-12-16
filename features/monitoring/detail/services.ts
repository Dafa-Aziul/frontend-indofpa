// fileName: src/features/monitoring/detail/services.ts

import api from "@/lib/axios";
import { MonitoringDetailResponse } from "./types";

// Asumsi endpoint untuk detail monitoring / daftar responden adalah /api/monitoring/{id}
const MONITORING_DETAIL_ENDPOINT = (id: number) =>
  `/api/monitoring/${id}/responden`;

/**
 * Mengambil data detail monitoring (ringkasan + daftar responden).
 * @param kuesionerId ID Kuesioner
 */
export function getMonitoringDetail(
  kuesionerId: number
): Promise<MonitoringDetailResponse> {
  return api
    .get(MONITORING_DETAIL_ENDPOINT(kuesionerId))
    .then((res) => res.data.data);
}
