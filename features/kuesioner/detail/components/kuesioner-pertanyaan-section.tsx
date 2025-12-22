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
import {
    Plus,
    Pencil,
    Trash2,
    HelpCircle,
} from "lucide-react";

import { Pertanyaan, Indikator, Variabel } from "../types";

type Props = {
    pertanyaan: Pertanyaan[];
    indikator: Indikator[];
    variabel: Variabel[];
    onAdd: () => void;
    onEdit: (row: Pertanyaan) => void;
    onDelete: (id: number) => void;
};

export function KuesionerPertanyaanSection({
    pertanyaan,
    indikator,
onAdd,
    onEdit,
    onDelete,
}: Props) {
    // Lookup cepat
    const indikatorMap = Object.fromEntries(
        indikator.map((i) => [i.indikatorId, i])
    );

    // SORT: Variabel → Indikator → Urutan
    const sortedPertanyaan = [...pertanyaan].sort((a, b) => {
        const indA = indikatorMap[a.indikatorId];
        const indB = indikatorMap[b.indikatorId];

        if (indA?.variabelId !== indB?.variabelId) {
            return (indA?.variabelId ?? 0) - (indB?.variabelId ?? 0);
        }

        if (a.indikatorId !== b.indikatorId) {
            return a.indikatorId - b.indikatorId;
        }

        return a.urutan - b.urutan;
    });

    return (
        <section className="space-y-4">
            {/* ================= TITLE ================= */}
            <div className="flex items-center justify-between gap-2 px-1">
                <div className="flex items-center gap-3">
                    <span className="w-1 h-5 bg-green-600 rounded-full" />
                    <div className="flex items-center gap-2 text-green-700 font-semibold text-sm sm:text-base">
                        <HelpCircle className="h-5 w-5 shrink-0" />
                        <span>Pertanyaan</span>
                    </div>
                </div>

                <Button
                    size="sm"
                    onClick={onAdd}
                    className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm shrink-0"
                >
                    <Plus className="h-4 w-4 mr-1" />
                    <span className="hidden xs:inline">Tambah Pertanyaan</span>
                    <span className="xs:inline sm:hidden">Tambah</span>
                </Button>
            </div>

            {/* ================= TABLE ================= */}
            <div className="rounded-lg border bg-white overflow-hidden shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-accent pointer-events-none">
                            {/* NO: Sembunyikan di Mobile */}
                            <TableHead className="hidden sm:table-cell w-[50px] text-center text-white font-bold">
                                No
                            </TableHead>
                            {/* INDIKATOR: Sembunyikan di Mobile */}
                            <TableHead className="hidden md:table-cell text-white font-bold">
                                Indikator
                            </TableHead>
                            {/* PERTANYAAN: Selalu Muncul */}
                            <TableHead className="text-white font-bold">
                                Pertanyaan
                            </TableHead>
                            {/* URUTAN: Sembunyikan di Mobile */}
                            <TableHead className="hidden sm:table-cell w-[80px] text-center text-white font-bold">
                                Urutan
                            </TableHead>
                            {/* AKSI: Lebar tetap */}
                            <TableHead className="w-[90px] sm:w-40 text-center text-white font-bold">
                                Aksi
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {sortedPertanyaan.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="text-center text-muted-foreground py-10"
                                >
                                    Belum ada pertanyaan
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedPertanyaan.map((item, index) => {
                                const ind = indikatorMap[item.indikatorId];
                                return (
                                    <TableRow
                                        key={item.pertanyaanId}
                                        className="hover:bg-gray-50"
                                    >
                                        <TableCell className="hidden sm:table-cell text-center">
                                            {index + 1}
                                        </TableCell>

                                        {/* Indikator: Hanya muncul di Desktop */}
                                        <TableCell className="hidden md:table-cell text-sm">
                                            {ind ? (
                                                <div>
                                                    <p className="font-medium">{ind.nama}</p>
                                                    <p className="text-xs text-muted-foreground">{ind.kode}</p>
                                                </div>
                                            ) : "-"}
                                        </TableCell>

                                        {/* Pertanyaan: Konten Utama */}
                                        <TableCell className="py-3">
                                            <div className="flex flex-col gap-1.5">
                                                {/* Meta info untuk mobile */}
                                                <div className="sm:hidden flex flex-wrap items-center gap-2 mb-0.5">
                                                    <span className="bg-gray-100 text-[10px] px-1.5 py-0.5 rounded border font-mono font-bold text-gray-600">
                                                        #{item.urutan}
                                                    </span>
                                                    {ind && (
                                                        <span className="text-[10px] text-green-700 bg-green-50 px-1.5 py-0.5 rounded border border-green-100 font-medium truncate max-w-[150px]">
                                                            {ind.nama}
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-sm sm:text-base text-gray-800 leading-relaxed">
                                                    {item.teksPertanyaan}
                                                </span>
                                            </div>
                                        </TableCell>

                                        {/* Urutan: Hanya muncul di SM keatas */}
                                        <TableCell className="hidden sm:table-cell text-center font-medium">
                                            {item.urutan}
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex justify-center gap-1.5">
                                                <Button
                                                    size="sm"
                                                    onClick={() => onEdit(item)}
                                                    className="bg-yellow-500 text-white hover:bg-yellow-600 h-8 w-8 sm:h-9 sm:w-auto px-0 sm:px-3"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                    <span className="hidden md:block ml-1">Edit</span>
                                                </Button>

                                                <Button
                                                    size="sm"
                                                    onClick={() => onDelete(item.pertanyaanId)}
                                                    className="bg-red-600 text-white hover:bg-red-700 h-8 w-8 sm:h-9 sm:w-auto px-0 sm:px-3"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="hidden md:block ml-1">Hapus</span>
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
        </section>
    );
}