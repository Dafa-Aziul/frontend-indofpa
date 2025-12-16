// fileName: src/features/monitoring/detail/components/responden-table.tsx
"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
    // Asumsi pagination handler ada di halaman utama
}

// Utility untuk format waktu (sesuai desain)
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

// Utility untuk format durasi (dari detik ke Menit/Detik)
const formatDurasi = (durasiDetik: number) => {
    if (durasiDetik < 60) return `${durasiDetik} detik`;
    const minutes = Math.floor(durasiDetik / 60);
    const seconds = durasiDetik % 60;
    return `${minutes} menit ${seconds} detik`;
};

export default function RespondenTable({ data, isLoading, page, limit, onViewAnswer }: RespondenTableProps) {
    
    // Tentukan jumlah kolom untuk colSpan
    const colCount = 5; 

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
                // Kita akan gunakan waktu Selesai sebagai waktu pengisian
                const waktuPengisian = formatWaktu(item.waktuSelesai); 
                const durasi = formatDurasi(item.durasiDetik);
                
                return (
                    <TableRow key={item.respondenId}>
                        <TableCell className="w-[60px] text-center">{nomor}</TableCell>
                        <TableCell className="font-medium">{item.nama}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{waktuPengisian}</TableCell>
                        <TableCell>{durasi}</TableCell>
                        <TableCell className="text-center w-[120px]">
                            <Button
                                size="sm"
                                variant="outline"
                                className="gap-1 border-green-600 text-green-600 hover:bg-green-50"
                                onClick={() => onViewAnswer(item.respondenId)}
                            >
                                <Eye className="h-4 w-4" />
                                Lihat Jawaban
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
        <TableRow className="bg-accent pointer-events-none">
            <TableHead className="w-[60px] text-center text-white font-bold">No.</TableHead>
            <TableHead className="text-white font-bold">Nama</TableHead>
            <TableHead className="text-white font-bold">Email</TableHead>
            <TableHead className="text-white font-bold">Waktu Pengisian</TableHead>
            <TableHead className="text-white font-bold">Durasi Pengisian</TableHead>
            <TableHead className="w-[120px] text-white text-center font-bold">Aksi</TableHead>
        </TableRow>
    </TableHeader>
);