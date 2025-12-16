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
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <span className="w-1 h-5 bg-green-600 rounded-full" />
                <div className="flex items-center gap-2 text-green-700 font-semibold">
                    {icon}
                    <span>{title}</span>
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
                        className="bg-green-600 hover:bg-green-700"
                    >
                        <Plus className="h-4 w-4 mr-1" />
                        Tambah Variabel
                    </Button>

                }
            />

            {/* ================= TABLE ================= */}
            <div className="rounded-lg border bg-white shadow-sm overflow-x-auto">
                <Table className="min-w-[900px]">
                    <TableHeader>
                        <TableRow className="bg-accent pointer-events-none">
                            <TableHead className="w-[60px] text-center text-white font-bold">
                                No
                            </TableHead>
                            <TableHead className="text-white font-bold">
                                Nama Variabel
                            </TableHead>
                            <TableHead className="w-[120px] text-white font-bold">
                                Kode
                            </TableHead>
                            <TableHead className="text-white font-bold">
                                Deskripsi
                            </TableHead>
                            <TableHead className="w-[180px] text-center text-white font-bold">
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
                                    <TableCell className="text-center">
                                        {index + 1}
                                    </TableCell>

                                    <TableCell className="font-medium">
                                        {item.nama}
                                    </TableCell>

                                    <TableCell className="font-mono text-sm">
                                        {item.kode}
                                    </TableCell>

                                    <TableCell className="text-sm text-gray-700">
                                        {item.deskripsi || "-"}
                                    </TableCell>

                                    <TableCell className="text-center">
                                        <div className="flex justify-center gap-2">
                                            {/* EDIT */}
                                            <Button
                                                type="button"
                                                size="sm"
                                                onClick={() => onEdit(item)}
                                                className="bg-yellow-500 text-white hover:bg-yellow-600"
                                            >
                                                <Pencil className="h-4 w-4" />
                                                <span className="ml-1 hidden md:block">Edit</span>
                                            </Button>


                                            {/* DELETE */}
                                            <Button
                                                type="button"
                                                size="sm"
                                                onClick={() => onDelete(item.variabelId)}
                                                className="bg-red-600 text-white hover:bg-red-700"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span className="ml-1 hidden md:block">Hapus</span>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* ================= DIVIDER ================= */}
            <div className="border-t" />
        </section>
    );
}
