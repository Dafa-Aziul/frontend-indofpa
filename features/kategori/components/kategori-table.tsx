// fileName: src/features/monitoring/kategori/components/KategoriTable.tsx
"use client";

import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Kategori } from "../types";
import { Pencil, Trash2 } from "lucide-react";

type Props = {
    data: Kategori[];
    onEdit: (row: Kategori) => void;
    onDelete: (id: number) => void;
    page?: number;
    limit?: number;
};

export default function KategoriTable({
    data,
    onEdit,
    onDelete,
    page = 1,
    limit = 10,
}: Props) {
    return (
        // Wrapper terluar: Menjaga rounded corner dan shadow. (overflow-hidden untuk sudut)
        <div className="rounded-lg border bg-white shadow-sm overflow-hidden">

            {/* Wrapper scroll horizontal (Setara dengan Bootstrap 'table-responsive') */}
            <div className="w-full overflow-x-auto">
                {/* min-w-[400px] digunakan untuk memicu scroll di layar kecil */}
                <Table className="divide-y">

                    {/* HEADER */}
                    <TableHeader>
                        <TableRow className="bg-green-600 hover:bg-green-600 border-green-700">

                            {/* Kolom No: w-[50px] */}
                            <TableHead className="w-[50px] text-white text-center font-bold px-2 py-3">
                                No
                            </TableHead>

                            <TableHead className="font-bold text-white py-3">
                                Nama Kategori
                            </TableHead>

                            {/* Kolom Aksi: w-20 - Lebar minimum untuk dua ikon kecil */}
                            <TableHead className="w-20 text-white text-center font-bold px-1 py-3">
                                Aksi
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    {/* BODY */}
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={3}
                                    className="h-10 text-center text-muted-foreground"
                                >
                                    Belum ada data kategori
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((item, index) => {
                                const nomor = (page - 1) * limit + index + 1;

                                return (
                                    <TableRow
                                        key={item.kategoriId}
                                        className="hover:bg-gray-100 transition-colors"
                                    >
                                        <TableCell className="text-center px-2">
                                            {nomor}
                                        </TableCell>

                                        <TableCell className="font-medium">
                                            {item.nama}
                                        </TableCell>

                                        <TableCell className="text-center px-1 py-2">
                                            <div className="flex justify-center gap-1">
                                                {/* EDIT BUTTON */}
                                                <Button
                                                    size="sm"
                                                    onClick={() => onEdit(item)}
                                                    aria-label="Edit kategori"
                                                    className="
                                                        bg-yellow-500 text-white
                                                        hover:bg-yellow-600
                                                        p-1 h-7 w-7 // Sangat kecil di mobile (hanya ikon)
                                                        sm:w-auto sm:h-9 sm:p-2 // Normal di tablet ke atas
                                                    "
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                    {/* Label hanya muncul di sm: ke atas */}
                                                    <span className="ml-1 text-sm hidden sm:inline">
                                                        Edit
                                                    </span>
                                                </Button>

                                                {/* HAPUS BUTTON */}
                                                <Button
                                                    size="sm"
                                                    onClick={() => onDelete(item.kategoriId)}
                                                    aria-label="Hapus kategori"
                                                    className="
                                                        bg-red-600 text-white
                                                        hover:bg-red-700
                                                        p-1 h-7 w-7 // Sangat kecil di mobile (hanya ikon)
                                                        sm:w-auto sm:h-9 sm:p-2 // Normal di tablet ke atas
                                                    "
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    {/* Label hanya muncul di sm: ke atas */}
                                                    <span className="ml-1 text-sm hidden sm:inline">Hapus</span>
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