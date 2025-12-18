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
import { Pencil, Trash2, Share2 } from "lucide-react";
import { Kuesioner } from "../types";
import KuesionerStatusBadge from "./kuesioner-status-badge";

type Props = {
    data: Kuesioner[];
    page: number;
    limit: number;
    onDelete: (id: number) => void;
    onEdit: (row: Kuesioner) => void;
    onShare: (id: number) => void;
};

export default function KuesionerTable({
    data,
    page,
    limit,
    onDelete,
    onEdit,
    onShare,
}: Props) {
    const router = useRouter();

    return (
        <div className="relative w-full overflow-x-auto rounded-lg border bg-white shadow-md">

            {/* Menggunakan table-auto, dan memaksa lebar minimum di mobile agar scroll terjadi */}
            <Table className="divide-y table-auto min-w-[550px]">
                <TableHeader className="sticky top-0 bg-accent z-10">
                    <TableRow className="pointer-events-none">

                        {/* No: Tetap di desktop, diperkecil di mobile (<sm) */}
                        <TableHead className="w-[60px] sm:w-20 px-2 py-3 text-center text-white font-bold text-sm">
                            No
                        </TableHead>

                        {/* Judul: Lebar fleksibel (table-auto), tapi terpotong di mobile (<sm) */}
                        <TableHead className="w-1/3 py-3 text-white font-bold min-w-[150px] text-sm">
                            Judul
                        </TableHead>

                        {/* Kategori: Hanya terlihat di desktop (>md) */}
                        <TableHead className="hidden md:table-cell py-3 text-white font-bold min-w-[100px] text-sm">
                            Kategori
                        </TableHead>

                        {/* Variabel: Hanya terlihat di desktop (>md) */}
                        <TableHead className="hidden md:table-cell py-3 text-white font-bold min-w-20 text-sm">
                            Variabel
                        </TableHead>

                        {/* Status: Lebar fleksibel */}
                        <TableHead className="py-3 text-white font-bold min-w-20 text-sm">
                            Status
                        </TableHead>

                        {/* Aksi: Lebar tetap di desktop, diperkecil di mobile */}
                        <TableHead className="text-white font-bold text-center w-[150px] min-w-[100px] pr-2 text-sm">
                            Aksi
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={6}
                                className="h-24 text-center text-muted-foreground text-sm"
                            >
                                Belum ada data kuesioner
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item, index) => {
                            const nomor = (page - 1) * limit + index + 1;
                            const isArsip = item.status === "Arsip";
                            const isDraft = item.status === "Draft";
                            return (
                                <TableRow
                                    key={item.kuesionerId}
                                    className="cursor-pointer hover:bg-gray-100 transition-colors"
                                    onClick={() =>
                                        router.push(
                                            `/admin/kuesioner/${item.kuesionerId}`
                                        )
                                    }
                                >
                                    {/* Data Sel: Padding py-2 di desktop (default shadcn), py-1.5 di mobile */}
                                    <TableCell className="px-2 py-2 sm:py-1.5 text-center text-sm sm:text-xs">{nomor}</TableCell>

                                    {/* Judul: Terpotong di mobile (<md) */}
                                    <TableCell className="font-medium py-2 sm:py-1.5 text-sm sm:text-xs max-w-none sm:max-w-[150px] truncate">
                                        {item.judul}
                                    </TableCell>

                                    {/* Kategori: Disembunyikan di mobile (<md) */}
                                    <TableCell className="hidden md:table-cell py-2 text-sm">
                                        {item.kategori.nama}
                                    </TableCell>

                                    {/* Variabel: Disembunyikan di mobile (<md) */}
                                    <TableCell className="hidden md:table-cell py-2 text-sm">
                                        {item._count.variabel}
                                    </TableCell>

                                    <TableCell className="py-2 sm:py-1.5">
                                        <KuesionerStatusBadge status={item.status} />
                                    </TableCell>

                                    {/* Kolom Aksi */}
                                    <TableCell
                                        className="text-center p-2 sm:p-0.5" // p-2 di desktop, p-0.5 di mobile
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="flex justify-center gap-2">
                                            {/* EDIT */}
                                            <Button
                                                size="sm"
                                                className="bg-yellow-500 hover:bg-yellow-600"
                                                disabled={!isDraft}
                                                onClick={() => onEdit(item)}
                                            >
                                                <Pencil className="h-4 w-4" />
                                                <span className="ml-1 hidden md:block">Edit</span>
                                            </Button>

                                            {/* DELETE */}
                                            <Button
                                                size="sm"
                                                className="bg-red-600 hover:bg-red-700"
                                                onClick={() => onDelete(item.kuesionerId)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span className="ml-1 hidden md:block">Hapus</span>
                                            </Button>

                                            {/* SHARE */}
                                            <Button
                                                size="sm"
                                                className="bg-blue-500 hover:bg-blue-600"
                                                disabled={isArsip}
                                                onClick={() => onShare(item.kuesionerId)}
                                            >
                                                <Share2 className="h-4 w-4" />
                                                <span className="ml-1 hidden md:block">Share</span>
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
    );
}