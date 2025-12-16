// fileName: src/features/monitoring/components/monitoring-table.tsx
"use client";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { MonitoringRow, MonitoringStatus } from "../types";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


interface MonitoringTableProps {
    data: MonitoringRow[];
    // ✅ Menghapus prop isLoading karena tidak digunakan
    // isLoading: boolean;
    page: number;
    limit: number;
    onViewDetail: (kuesionerId: number) => void;
}

// Utility untuk menentukan warna progress bar
function getProgressColor(progress: number): string {
    if (progress >= 100) return 'bg-green-700';
    if (progress > 0) return 'bg-green-500';
    return 'bg-red-500';
}

// Utility untuk menentukan warna teks status
function getStatusDisplay(status: MonitoringStatus | string): { label: string, color: string } {
    const lowerStatus = status.toLowerCase();
    switch (lowerStatus) {
        case 'publish':
        case 'aktif':
            return { label: 'Aktif', color: 'text-green-600 font-bold' };
        case 'arsip':
        case 'selesai':
            return { label: 'Selesai', color: 'text-gray-500 font-medium' };
        case 'draft':
            return { label: 'Draf', color: 'text-red-500 font-bold' };
        default:
            return { label: status, color: 'text-muted-foreground' };
    }
}

const MonitoringTable: React.FC<MonitoringTableProps> = ({ data, page, limit }) => {
    // Memoized data untuk progress visual
    const renderedData = useMemo(() => {
        return data.map(row => {
            const visualProgress = Math.min(row.progress, 100);
            let indicatorClass = getProgressColor(row.progress);

            if (row.progress === 0) {
                indicatorClass = 'bg-gray-300';
            }
            if (row.progress >= 100) {
                indicatorClass = 'bg-green-700';
            }
            return {
                ...row,
                visualProgress,
                indicatorClass,
                statusDisplay: getStatusDisplay(row.status),
            };
        });
    }, [data]);

    // Tentukan jumlah kolom untuk colSpan
    const colCount = 7;
    const router = useRouter();
    return (
        <div className="relative w-full overflow-x-auto rounded-lg border bg-white">
            <Table className="min-w-full">
                {/* Header: Menggunakan bg-accent */}
                <TableHeader>
                    <TableRow className="bg-accent pointer-events-none">
                        <TableHead className="w-[60px] text-center text-white font-bold">No.</TableHead>
                        <TableHead className="min-w-[250px] text-white font-bold">Judul Kuesioner</TableHead>
                        <TableHead className="text-white font-bold">Status</TableHead>
                        <TableHead className="text-white font-bold">Target Responden</TableHead>
                        <TableHead className="text-white font-bold">Respon Masuk</TableHead>
                        <TableHead className="min-w-[200px] text-white font-bold">Progres Masuk</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {/* ✅ HANYA LOGIC EMPTY STATE (Mirip KuesionerTable) */}
                    {renderedData.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={colCount} className="h-10 text-center text-muted-foreground">
                                Tidak ada data monitoring ditemukan.
                            </TableCell>
                        </TableRow>
                    ) : (
                        renderedData.map((row, index) => {
                            const nomor = (page - 1) * limit + index + 1;
                            return (
                                <TableRow
                                    key={row.kuesionerId}
                                    className="cursor-pointer hover:bg-gray-100 transition-colors"
                                    onClick={() =>
                                        router.push(
                                            `/admin/monitoring/${row.kuesionerId}`
                                        )}
                                >
                                    <TableCell className="text-center">{nomor}</TableCell>
                                    <TableCell className="font-medium">
                                        {row.judul}
                                        <div className="text-xs text-muted-foreground mt-1">{row.kategori}</div>
                                    </TableCell>

                                    {/* Status */}
                                    <TableCell className={row.statusDisplay.color}>
                                        {row.statusDisplay.label}
                                    </TableCell>

                                    {/* Target Responden */}
                                    <TableCell>{row.targetResponden.toLocaleString()}</TableCell>

                                    {/* Respon Masuk */}
                                    <TableCell>{row.responMasuk.toLocaleString()}</TableCell>

                                    {/* Progres Masuk Column */}
                                    <TableCell onClick={(e) => e.stopPropagation()}>
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 min-w-[120px] relative">
                                                {/* Progress Bar */}

                                                <Progress
                                                    value={row.visualProgress}
                                                    className="h-2 bg-gray-200"
                                                    indicatorClassName={row.indicatorClass}
                                                />
                                                {/* Bar Nol Persen (simulasi titik merah) */}
                                                {row.progress === 0 && (
                                                    <div className="absolute top-0 h-full w-2 bg-red-500 rounded-full" style={{ left: '0%' }}></div>
                                                )}
                                            </div>
                                            {/* Nilai Persentase */}
                                            <span className={`text-sm font-semibold whitespace-nowrap
                                                ${row.progress >= 100 ? 'text-green-600' : 'text-gray-800'}`}>
                                                {row.progress.toFixed(0)} %
                                            </span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default MonitoringTable;