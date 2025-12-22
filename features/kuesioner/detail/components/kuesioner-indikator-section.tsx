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
import { Plus, Pencil, Trash2, ListTree } from "lucide-react";

import { Indikator, Variabel } from "../types";

type Props = {
    indikator: Indikator[];
    variabel: Variabel[];
    onAdd: () => void;
    onEdit: (row: Indikator) => void;
    onDelete: (id: number) => void;
};

export function KuesionerIndikatorSection({
    indikator,
    variabel,
    onAdd,
    onEdit,
    onDelete,
}: Props) {
    const variabelMap = Object.fromEntries(
        variabel.map((v) => [v.variabelId, v])
    );

    const sortedIndikator = [...indikator].sort(
        (a, b) => a.variabelId - b.variabelId
    );

    return (
        <section className="space-y-6">
            {/* ================= TITLE ================= */}
            <div className="flex items-center justify-between gap-2 px-1">
                <div className="flex items-center gap-3">
                    <span className="w-1 h-5 bg-green-600 rounded-full" />
                    <div className="flex items-center gap-2 text-green-700 font-semibold text-sm sm:text-base">
                        <ListTree className="h-5 w-5 shrink-0" />
                        <span>Indikator</span>
                    </div>
                </div>

                <Button
                    size="sm"
                    onClick={onAdd}
                    className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm h-8 sm:h-9"
                >
                    <Plus className="h-4 w-4 mr-1" />
                    <span className="hidden xs:inline">Tambah Indikator</span>
                    <span className="xs:hidden">Tambah</span>
                </Button>
            </div>

            {/* ================= TABLE ================= */}
            <div className="rounded-lg border bg-white overflow-hidden shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-accent pointer-events-none">
                            {/* NO: Sembunyikan di Mobile */}
                            <TableHead className="hidden sm:table-cell w-[60px] text-center text-white font-bold">
                                No
                            </TableHead>
                            {/* VARIABEL: Sembunyikan di Mobile */}
                            <TableHead className="hidden md:table-cell text-white font-bold">
                                Variabel
                            </TableHead>
                            {/* KODE: Sembunyikan di Mobile */}
                            <TableHead className="hidden sm:table-cell w-[100px] text-white font-bold">
                                Kode
                            </TableHead>
                            {/* NAMA: Selalu Muncul */}
                            <TableHead className="text-white font-bold">
                                Nama Indikator
                            </TableHead>
                            {/* AKSI: Lebar fleksibel */}
                            <TableHead className="w-20 sm:w-40 text-center text-white font-bold">
                                Aksi
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {sortedIndikator.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="text-center text-muted-foreground py-10"
                                >
                                    Belum ada indikator
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedIndikator.map((item, index) => {
                                const v = variabelMap[item.variabelId];

                                return (
                                    <TableRow
                                        key={item.indikatorId}
                                        className="hover:bg-gray-50"
                                    >
                                        <TableCell className="hidden sm:table-cell text-center">
                                            {index + 1}
                                        </TableCell>

                                        {/* Variabel: Hanya muncul di Desktop */}
                                        <TableCell className="hidden md:table-cell text-sm">
                                            {v ? (
                                                <div>
                                                    <p className="font-medium">{v.nama}</p>
                                                    <p className="text-xs text-muted-foreground">{v.kode}</p>
                                                </div>
                                            ) : "-"}
                                        </TableCell>

                                        {/* Kode: Hanya muncul di SM keatas */}
                                        <TableCell className="hidden sm:table-cell font-medium">
                                            {item.kode}
                                        </TableCell>

                                        {/* Nama Indikator + Mobile Info */}
                                        <TableCell className="py-3">
                                            <div className="flex flex-col gap-1">
                                                {/* Muncul hanya di mobile (SM:hidden) */}
                                                <div className="sm:hidden flex items-center gap-2 mb-1">
                                                    <span className="bg-gray-100 text-[10px] px-1.5 py-0.5 rounded border font-mono">
                                                        {item.kode}
                                                    </span>
                                                    {v && (
                                                        <span className="text-[10px] text-green-600 font-medium truncate max-w-[120px]">
                                                            {v.nama}
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-sm sm:text-base leading-tight">
                                                    {item.nama}
                                                </span>
                                            </div>
                                        </TableCell>

                                        <TableCell className="text-center">
                                            <div className="flex justify-center gap-1 sm:gap-2">
                                                <Button
                                                    size="sm"
                                                    onClick={() => onEdit(item)}
                                                    className="bg-yellow-500 text-white hover:bg-yellow-600 h-8 w-8 sm:w-auto sm:px-3 px-0"
                                                    title="Edit"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                    <span className="ml-1 hidden md:block">Edit</span>
                                                </Button>

                                                <Button
                                                    size="sm"
                                                    onClick={() => onDelete(item.indikatorId)}
                                                    className="bg-red-600 text-white hover:bg-red-700 h-8 w-8 sm:w-auto sm:px-3 px-0"
                                                    title="Hapus"
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
            <div className="border-b" />
        </section>
    );
}