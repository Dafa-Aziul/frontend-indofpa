// src/features/analisis/list/components/AnalisisTable.tsx
"use client";

import { useRouter } from "next/navigation";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";
import { AnalisisItem } from "../types"; // Import dari schemas, bukan types

type Props = {
    data: AnalisisItem[];
    page: number;
    limit: number;
};

export default function AnalisisTable({ data, page, limit }: Props) {
    const router = useRouter();

    const handleViewDetail = (id: number) => {
        // Navigasi ke halaman detail analisis
        router.push(`/admin/analisis/${id}`);
    };

    return (
        // Wrapper terluar: Meniru style Card Kategori (shadow dan border)
        <div className="rounded-lg border bg-white shadow-sm overflow-hidden">

            {/* Wrapper scroll horizontal (Min-w-550px dari implementasi sebelumnya) */}
            <div className="w-full overflow-x-auto">
                <Table className="divide-y min-w-[550px]">

                    {/* HEADER: Meniru style KategoriTable (Hijau solid) */}
                    <TableHeader>
                        <TableRow className="bg-green-600 hover:bg-green-600 border-green-700 pointer-events-none">

                            {/* No */}
                            <TableHead className="w-[50px] text-white text-center font-bold px-2 py-3 text-sm">
                                No
                            </TableHead>

                            {/* Judul Kuesioner */}
                            <TableHead className="w-1/3 text-white font-bold py-3 min-w-[150px] text-sm">
                                Judul Kuesioner
                            </TableHead>

                            {/* Kategori (Sembunyi di mobile: <md) */}
                            <TableHead className="hidden md:table-cell text-white font-bold py-3 min-w-[100px] text-sm">
                                Kategori
                            </TableHead>

                            {/* Responden (Sembunyi di mobile: <sm) */}
                            <TableHead className="hidden sm:table-cell text-white font-bold py-3 min-w-40 text-sm">
                                Responden
                            </TableHead>

                            {/* Variabel */}
                            <TableHead className="text-white font-bold py-3 min-w-40 text-sm">
                                Variabel
                            </TableHead>

                            {/* Aksi */}
                            <TableHead className="w-[120px] text-white text-center font-bold px-1 py-3 text-sm">
                                Aksi
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    {/* BODY */}
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground text-sm">
                                    Tidak ada data kuesioner untuk dianalisis
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((item, index) => {
                                const nomor = (page - 1) * limit + index + 1;

                                return (
                                    <TableRow
                                        key={item.kuesionerId}
                                        className=" hover:bg-gray-100 transition-colors"
                                    >

                                        <TableCell className="text-center px-2 py-2 sm:py-1.5 text-sm sm:text-xs">{nomor}</TableCell>

                                        <TableCell className="font-medium py-2 sm:py-1.5 text-sm sm:text-xs max-w-none sm:max-w-[150px] truncate">
                                            {item.judul}
                                        </TableCell>

                                        <TableCell className="hidden md:table-cell py-2 text-sm">
                                            {item.kategori.nama}
                                        </TableCell>

                                        <TableCell className="hidden sm:table-cell py-2 text-sm">
                                            {item._count.responden}
                                        </TableCell>

                                        <TableCell className="py-2 sm:py-1.5 text-sm sm:text-xs">
                                            {item._count.variabel}
                                        </TableCell>

                                        {/* Kolom Aksi */}
                                        <TableCell
                                            className="text-center px-1 py-2 sm:py-1.5"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div className="flex justify-center gap-1">
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleViewDetail(item.kuesionerId)}
                                                    aria-label="Lihat Analisis"
                                                    // Meniru responsivitas tombol Kategori: kecil di mobile, ikon+teks di sm: ke atas
                                                    className="
                                                        bg-green-600 text-white
                                                        hover:bg-green-700
                                                        p-1 h-7 w-7 
                                                        sm:w-auto sm:h-9 sm:p-2 
                                                    "
                                                >
                                                    <BarChart3 className="h-4 w-4" />
                                                    {/* Label hanya muncul di sm: ke atas */}
                                                    <span className="ml-1 text-sm hidden sm:inline">
                                                        Analisis
                                                    </span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}