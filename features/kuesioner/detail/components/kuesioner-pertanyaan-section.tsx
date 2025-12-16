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
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="w-1 h-5 bg-green-600 rounded-full" />
                    <div className="flex items-center gap-2 text-green-700 font-semibold">
                        <HelpCircle className="h-5 w-5" />
                        <span>Pertanyaan</span>
                    </div>
                </div>

                <Button size="sm" onClick={onAdd} className="bg-green-600 hover:bg-green-700"   >
                    <Plus className="h-4 w-4 mr-1" />
                    Tambah Pertanyaan
                </Button>
            </div>

            {/* ================= TABLE ================= */}
            <div className="rounded-lg border bg-white overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-accent pointer-events-none">
                            <TableHead className="w-[60px] text-center text-white font-bold">
                                No
                            </TableHead>
                            <TableHead className="text-white font-bold">
                                Indikator
                            </TableHead>
                            <TableHead className="text-white font-bold">
                                Pertanyaan
                            </TableHead>
                            <TableHead className="w-[100px] text-center text-white font-bold">
                                Urutan
                            </TableHead>
                            <TableHead className="w-40 text-center text-white font-bold">
                                Aksi
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {sortedPertanyaan.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="text-center text-muted-foreground"
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
                                        <TableCell className="text-center">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="text-sm">
                                            {ind ? (
                                                <div>
                                                    <p className="font-medium">{ind.nama}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {ind.kode}
                                                    </p>
                                                </div>
                                            ) : (
                                                "-"
                                            )}
                                        </TableCell>

                                        <TableCell className="max-w-[420px]">
                                            {item.teksPertanyaan}
                                        </TableCell>

                                        <TableCell className="text-center">
                                            {item.urutan}
                                        </TableCell>

                                        <TableCell className="text-center">
                                            <div className="flex justify-center gap-2">
                                                {/* EDIT */}
                                                <Button
                                                    size="sm"
                                                    onClick={() => onEdit(item)}
                                                    className="bg-yellow-500 text-white hover:bg-yellow-600"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                    <span className="ml-1 hidden md:block">Edit</span>
                                                </Button>

                                                {/* DELETE */}
                                                <Button
                                                    size="sm"
                                                    onClick={() => onDelete(item.pertanyaanId)}
                                                    className="bg-red-600 text-white hover:bg-red-700"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="ml-1 hidden md:block">Hapus</span>
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
