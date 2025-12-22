// fileName: src/features/monitoring/detail/components/responden-table.tsx
"use client";

import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { RespondenItem } from "../types";

interface RespondenTableProps {
    data: RespondenItem[];
    page: number;
    limit: number;
    total: number;
    isLoading: boolean;
    onViewAnswer: (respondenId: number) => void;
}

const formatWaktu = (dateString: string) => {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) + 
               ', ' + 
               date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    } catch {
        return '-';
    }
};

const formatDurasi = (durasiDetik: number) => {
    if (durasiDetik < 60) return `${durasiDetik} dtk`; // Disingkat untuk mobile
    const minutes = Math.floor(durasiDetik / 60);
    const seconds = durasiDetik % 60;
    return `${minutes}m ${seconds}s`;
};

export default function RespondenTable({ data, isLoading, page, limit, onViewAnswer }: RespondenTableProps) {
    
    // colSpan disesuaikan dengan jumlah kolom yang terlihat di desktop
    const colCount = 6; 

    if (isLoading) {
         return (
             <TableBody>
                <TableRow>
                    <TableCell colSpan={colCount} className="h-16 text-center text-muted-foreground">
                        Memuat daftar responden...
                    </TableCell>
                </TableRow>
            </TableBody>
         );
    }
    
    if (data.length === 0) {
        return (
            <TableBody>
                <TableRow>
                    <TableCell colSpan={colCount} className="h-16 text-center text-muted-foreground">
                        Belum ada respon masuk.
                    </TableCell>
                </TableRow>
            </TableBody>
        );
    }
    
    return (
        <TableBody>
            {data.map((item, index) => {
                const nomor = (page - 1) * limit + index + 1;
                const waktuPengisian = formatWaktu(item.waktuSelesai); 
                const durasi = formatDurasi(item.durasiDetik);
                
                return (
                    <TableRow key={item.respondenId} className="hover:bg-slate-50 transition-colors">
                        {/* No - Sembunyikan di mobile sangat kecil */}
                        <TableCell className="w-[50px] text-center hidden sm:table-cell">{nomor}</TableCell>
                        
                        <TableCell className="max-w-[150px] sm:max-w-none">
                            <div className="font-semibold text-sm sm:text-base truncate sm:whitespace-normal">
                                {item.nama}
                            </div>
                            {/* Mobile Info: Tampilkan email & waktu di bawah nama khusus layar mobile */}
                            <div className="md:hidden text-[10px] text-muted-foreground space-y-0.5 mt-1">
                                <p className="truncate">{item.email}</p>
                                <p className="sm:hidden">{waktuPengisian}</p>
                            </div>
                        </TableCell>

                        {/* Email - Sembunyikan di mobile, muncul di desktop */}
                        <TableCell className="hidden md:table-cell text-sm">{item.email}</TableCell>
                        
                        {/* Waktu - Sembunyikan di mobile paling kecil */}
                        <TableCell className="hidden sm:table-cell text-sm">{waktuPengisian}</TableCell>
                        
                        {/* Durasi - Sembunyikan di mobile/tablet, hanya muncul di layar besar */}
                        <TableCell className="hidden lg:table-cell text-sm">{durasi}</TableCell>
                        
                        <TableCell className="text-right sm:text-center w-[100px] sm:w-[140px]">
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-8 sm:h-9 px-2 sm:px-3 gap-1 border-green-600 text-green-600 hover:bg-green-50 shadow-sm"
                                onClick={() => onViewAnswer(item.respondenId)}
                            >
                                <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                <span className="text-[11px] sm:text-xs">Lihat</span>
                                <span className="hidden sm:inline text-xs">Jawaban</span>
                            </Button>
                        </TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
    );
}

export const RespondenTableHeader = () => (
    <TableHeader>
        <TableRow className="bg-accent pointer-events-none hover:bg-accent">
            <TableHead className="w-[50px] text-center text-white font-bold hidden sm:table-cell">No.</TableHead>
            <TableHead className="text-white font-bold">Nama</TableHead>
            <TableHead className="text-white font-bold hidden md:table-cell">Email</TableHead>
            <TableHead className="text-white font-bold hidden sm:table-cell">Waktu Pengisian</TableHead>
            <TableHead className="text-white font-bold hidden lg:table-cell">Durasi</TableHead>
            <TableHead className="w-[100px] sm:w-[140px] text-white text-right sm:text-center font-bold">Aksi</TableHead>
        </TableRow>
    </TableHeader>
);