import api from "@/lib/axios";
import { MonitoringDetailResponse } from "./types";

const MONITORING_DETAIL_ENDPOINT = (id: number) =>
  `/api/monitoring/${id}/responden`;

const MONITORING_EXPORT_ENDPOINT = (id: number) =>
  `/api/monitoring/${id}/export`;

/**
 * Mengambil data detail monitoring (ringkasan + daftar responden).
 */
export function getMonitoringDetail(
  kuesionerId: number
): Promise<MonitoringDetailResponse> {
  return api
    .get(MONITORING_DETAIL_ENDPOINT(kuesionerId))
    .then((res) => res.data.data);
}

/**
 * Mengekspor laporan kuesioner dalam format Excel.
 */
export async function exportMonitoringLaporan(
  kuesionerId: number
): Promise<void> {
  try {
    const response = await api.get(MONITORING_EXPORT_ENDPOINT(kuesionerId), {
      responseType: "blob",
    });

    // 1. Fallback nama file jika header tidak ditemukan
    let fileName = `Laporan_Monitoring_${kuesionerId}.xlsx`;

    // 2. Ambil header content-disposition
    // Axios secara otomatis mengubah nama header menjadi huruf kecil (lowercase)
    const contentDisposition = response.headers["content-disposition"];

    if (contentDisposition) {
      // ✅ Gunakan Regex untuk menangkap teks di antara tanda kutip setelah 'filename='
      // Ini jauh lebih aman untuk nama file yang mengandung spasi atau tanda kurung
      const fileNameMatch = contentDisposition.match(/filename="(.+)"/);

      if (fileNameMatch && fileNameMatch[1]) {
        fileName = fileNameMatch[1];
      }
    }

    // 3. Proses Download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;

    // Gunakan nama file yang sudah didapatkan
    link.setAttribute("download", fileName);

    document.body.appendChild(link);
    link.click();

    // 4. Cleanup
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Gagal mengekspor laporan:", error);
    throw error;
  }
}
