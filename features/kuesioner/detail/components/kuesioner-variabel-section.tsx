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
    ListChecks,
    Plus,
    Pencil,
    Trash2,
} from "lucide-react";
import { Variabel } from "../types";

/* ================= SECTION TITLE ================= */

function SectionTitle({
    icon,
    title,
    action,
}: {
    icon: React.ReactNode;
    title: string;
    action?: React.ReactNode;
}) {
    return (
        <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
                <span className="w-1 h-5 bg-green-600 rounded-full" />
                <div className="flex items-center gap-2 text-green-700 font-semibold">
                    {icon}
                    <span className="text-sm sm:text-base">{title}</span>
                </div>
            </div>
            {action}
        </div>
    );
}

/* ================= COMPONENT ================= */

type Props = {
    data: Variabel[];
    onAdd: () => void;
    onEdit: (row: Variabel) => void;
    onDelete: (id: number) => void;
};

export function KuesionerVariabelSection({
    data,
    onAdd,
    onEdit,
    onDelete,
}: Props) {
    return (
        <section className="space-y-6">
            {/* ================= HEADER ================= */}
            <SectionTitle
                icon={<ListChecks className="h-5 w-5" />}
                title="Variabel Kuesioner"
                action={
                    <Button
                        type="button"
                        size="sm"
                        onClick={onAdd}
                        className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm"
                    >
                        <Plus className="h-4 w-4 mr-1" />
                        Tambah
                    </Button>
                }
            />

            {/* ================= TABLE ================= */}
            <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-accent pointer-events-none text-white">
                            {/* Kolom NO: Sembunyikan di Mobile, Muncul di SM keatas */}
                            <TableHead className="hidden sm:table-cell w-[50px] text-center text-white font-bold">
                                No
                            </TableHead>

                            {/* Nama Variabel: Selalu Muncul */}
                            <TableHead className="text-white font-bold">
                                Nama Variabel
                            </TableHead>

                            {/* Kolom KODE: Sembunyikan di Mobile, Muncul di MD keatas */}
                            <TableHead className="hidden md:table-cell w-[100px] text-white font-bold">
                                Kode
                            </TableHead>

                            {/* Kolom DESKRIPSI: Sembunyikan di Mobile, Muncul di LG keatas */}
                            <TableHead className="hidden lg:table-cell text-white font-bold">
                                Deskripsi
                            </TableHead>

                            {/* Aksi: Selalu Muncul */}
                            <TableHead className="w-[100px] sm:w-[180px] text-center text-white font-bold">
                                Aksi
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="h-12 text-center text-muted-foreground"
                                >
                                    Belum ada variabel
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((item, index) => (
                                <TableRow
                                    key={item.variabelId}
                                    className="hover:bg-gray-100 transition-colors"
                                >
                                    {/* Kolom NO: Ikuti Header */}
                                    <TableCell className="hidden sm:table-cell text-center">
                                        {index + 1}
                                    </TableCell>

                                    <TableCell className="font-medium text-sm sm:text-base">
                                        {item.nama}
                                        {/* Info tambahan (Kode) muncul di bawah nama HANYA saat di mobile */}
                                        <div className="md:hidden text-[10px] text-gray-500 font-mono mt-1">
                                            {item.kode}
                                        </div>
                                    </TableCell>

                                    {/* Kolom KODE: Ikuti Header */}
                                    <TableCell className="hidden md:table-cell font-mono text-sm">
                                        {item.kode}
                                    </TableCell>

                                    {/* Kolom DESKRIPSI: Ikuti Header */}
                                    <TableCell className="hidden lg:table-cell text-sm text-gray-700">
                                        {item.deskripsi || "-"}
                                    </TableCell>

                                    <TableCell className="text-center">
                                        <div className="flex justify-center gap-1.5 sm:gap-2">
                                            <Button
                                                type="button"
                                                size="sm"
                                                onClick={() => onEdit(item)}
                                                className="bg-yellow-500 text-white hover:bg-yellow-600 h-8 w-8 sm:h-9 sm:w-auto px-0 sm:px-3"
                                            >
                                                <Pencil className="h-4 w-4" />
                                                <span className="hidden sm:inline ml-1">Edit</span>
                                            </Button>

                                            <Button
                                                type="button"
                                                size="sm"
                                                onClick={() => onDelete(item.variabelId)}
                                                className="bg-red-600 text-white hover:bg-red-700 h-8 w-8 sm:h-9 sm:w-auto px-0 sm:px-3"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span className="hidden sm:inline ml-1">Hapus</span>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="border-t" />
        </section>
    );
}