// fileName: src/features/monitoring/services.ts

import api from "@/lib/axios"; // Asumsi path ke instance axios/fetch Anda
import { MonitoringResponse, MonitoringFilterParams } from "./types";
import { monitoringApi } from "./api"; // Import endpoint baru

/**
 * Mengambil daftar kuesioner untuk Monitoring.
 * @param params Parameter filter dan pagination.
 */
export function getMonitoringList(params: MonitoringFilterParams): Promise<MonitoringResponse> {
    // Menggunakan endpoint yang didefinisikan di monitoringApi
    return api.get(monitoringApi.list, { params }).then(res => res.data);
}