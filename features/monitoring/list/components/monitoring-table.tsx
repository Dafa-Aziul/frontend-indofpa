// fileName: src/features/monitoring/components/monitoring-table.tsx
"use client";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { MonitoringRow, MonitoringStatus } from "../types";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface MonitoringTableProps {
    data: MonitoringRow[];
    page: number;
    limit: number;
    onViewDetail: (kuesionerId: number) => void;
}

function getProgressColor(progress: number): string {
    if (progress >= 100) return 'bg-green-700';
    if (progress > 0) return 'bg-green-500';
    return 'bg-red-500';
}

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
    const renderedData = useMemo(() => {
        return data.map(row => {
            const visualProgress = Math.min(row.progress, 100);
            let indicatorClass = getProgressColor(row.progress);

            if (row.progress === 0) indicatorClass = 'bg-gray-300';
            if (row.progress >= 100) indicatorClass = 'bg-green-700';

            return {
                ...row,
                visualProgress,
                indicatorClass,
                statusDisplay: getStatusDisplay(row.status),
            };
        });
    }, [data]);

    const router = useRouter();

    return (
        <div className="relative w-full overflow-x-auto rounded-lg border bg-white shadow-sm">
            <Table className="min-w-full">
                <TableHeader>
                    <TableRow className="bg-accent pointer-events-none">
                        {/* Sembunyikan No di mobile sangat kecil */}
                        <TableHead className="w-[50px] text-center text-white font-bold hidden sm:table-cell">No.</TableHead>
                        <TableHead className="min-w-[180px] text-white font-bold">Judul Kuesioner</TableHead>
                        <TableHead className="text-white font-bold">Status</TableHead>
                        {/* Sembunyikan Target & Respon di mobile, muncul di desktop (md+) */}
                        <TableHead className="text-white font-bold hidden md:table-cell">Target</TableHead>
                        <TableHead className="text-white font-bold hidden md:table-cell">Respon</TableHead>
                        <TableHead className="min-w-[150px] text-white font-bold">Progres</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {renderedData.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                Tidak ada data monitoring ditemukan.
                            </TableCell>
                        </TableRow>
                    ) : (
                        renderedData.map((row, index) => {
                            const nomor = (page - 1) * limit + index + 1;
                            return (
                                <TableRow
                                    key={row.kuesionerId}
                                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                                    onClick={() => router.push(`/admin/monitoring/${row.kuesionerId}`)}
                                >
                                    <TableCell className="text-center hidden sm:table-cell">{nomor}</TableCell>
                                    <TableCell className="max-w-[200px] sm:max-w-none">
                                        <div className="font-semibold text-sm sm:text-base break-words line-clamp-2 sm:line-clamp-none">
                                            {row.judul}
                                        </div>
                                        <div className="text-[10px] sm:text-xs text-muted-foreground mt-1 bg-gray-100 w-fit px-2 py-0.5 rounded italic">
                                            {row.kategori}
                                        </div>
                                        {/* Tampilkan info ringkas target/respon hanya di mobile */}
                                        <div className="md:hidden text-[10px] text-muted-foreground mt-1">
                                            Target: {row.targetResponden} | Respon: {row.responMasuk}
                                        </div>
                                    </TableCell>

                                    <TableCell className={`text-xs sm:text-sm ${row.statusDisplay.color}`}>
                                        {row.statusDisplay.label}
                                    </TableCell>

                                    <TableCell className="hidden md:table-cell">{row.targetResponden.toLocaleString()}</TableCell>
                                    <TableCell className="hidden md:table-cell">{row.responMasuk.toLocaleString()}</TableCell>

                                    <TableCell onClick={(e) => e.stopPropagation()}>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                                            <div className="flex-1 min-w-[80px] sm:min-w-[120px] relative">
                                                <Progress
                                                    value={row.visualProgress}
                                                    className="h-1.5 sm:h-2 bg-gray-200"
                                                    indicatorClassName={row.indicatorClass}
                                                />
                                                {row.progress === 0 && (
                                                    <div className="absolute top-0 h-full w-1.5 bg-red-500 rounded-full" style={{ left: '0%' }}></div>
                                                )}
                                            </div>
                                            <span className={`text-[10px] sm:text-sm font-bold whitespace-nowrap
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