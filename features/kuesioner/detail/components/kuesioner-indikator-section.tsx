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
    // Map variabel agar lookup cepat
    const variabelMap = Object.fromEntries(
        variabel.map((v) => [v.variabelId, v])
    );

    const sortedIndikator = [...indikator].sort(
        (a, b) => a.variabelId - b.variabelId
    );

    return (
        <section className="space-y-6">
            {/* ================= TITLE ================= */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="w-1 h-5 bg-green-600 rounded-full" />
                    <div className="flex items-center gap-2 text-green-700 font-semibold">
                        <ListTree className="h-5 w-5" />
                        <span>Indikator</span>
                    </div>
                </div>

                <Button size="sm" onClick={onAdd} className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-1" />
                    Tambah Indikator
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
                                Variabel
                            </TableHead>
                            <TableHead className="text-white font-bold">
                                Kode
                            </TableHead>
                            <TableHead className="text-white font-bold">
                                Nama Indikator
                            </TableHead>
                            <TableHead className="w-40 text-center text-white font-bold">
                                Aksi
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {sortedIndikator.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="text-center text-muted-foreground"
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
                                        <TableCell className="text-center">
                                            {index + 1}
                                        </TableCell>

                                        <TableCell className="text-sm">
                                            {v ? (
                                                <div>
                                                    <p className="font-medium">{v.nama}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {v.kode}
                                                    </p>
                                                </div>
                                            ) : (
                                                "-"
                                            )}
                                        </TableCell>

                                        <TableCell className="font-medium">
                                            {item.kode}
                                        </TableCell>

                                        <TableCell>{item.nama}</TableCell>

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
                                                    onClick={() => onDelete(item.indikatorId)}
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
            <div className="border-b" />
        </section>
    );
}
