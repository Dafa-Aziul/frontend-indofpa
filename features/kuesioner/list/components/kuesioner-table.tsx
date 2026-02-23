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
    isLoading: boolean;
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
        <div className="w-full rounded-lg border bg-white shadow-md overflow-hidden">
            <div className="w-full overflow-x-auto block">
                {/* min-w-[600px] di mobile sudah cukup karena kolom Status dipindah */}
                <Table className="table-auto min-w-[600px] md:min-w-[800px] w-full border-collapse">
                    <TableHeader className="sticky top-0 bg-accent z-10">
                        <TableRow className="pointer-events-none border-none">
                            <TableHead className="w-[50px] px-4 py-3 text-center text-white font-bold text-sm whitespace-nowrap">
                                No
                            </TableHead>

                            <TableHead className="px-4 py-3 text-white font-bold text-sm whitespace-nowrap">
                                Info Kuesioner
                            </TableHead>

                            <TableHead className="hidden md:table-cell px-4 py-3 text-white font-bold text-sm text-center whitespace-nowrap">
                                Variabel
                            </TableHead>

                            {/* Status di-hide di mobile (< md) */}
                            <TableHead className="hidden md:table-cell px-4 py-3 text-white font-bold text-sm text-center whitespace-nowrap">
                                Status
                            </TableHead>

                            <TableHead className="w-[120px] md:w-[150px] px-4 py-3 text-white font-bold text-center text-sm whitespace-nowrap">
                                Aksi
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
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
                                        className="cursor-pointer hover:bg-gray-50 transition-colors"
                                        onClick={() =>
                                            router.push(`/admin/kuesioner/${item.kuesionerId}`)
                                        }
                                    >
                                        <TableCell className="px-4 py-3 text-center text-sm whitespace-nowrap">
                                            {nomor}
                                        </TableCell>

                                        {/* Kolom Judul Fleksibel */}
                                        <TableCell className="px-4 py-3 font-medium text-sm whitespace-nowrap">
                                            <div className="flex flex-col gap-1">
                                                <span>{item.judul}</span>
                                                
                                                {/* INFO TAMBAHAN MOBILE: Muncul hanya di layar kecil */}
                                                <div className="md:hidden flex flex-col gap-1.5 font-normal">
                                                    <span className="text-xs text-muted-foreground italic">
                                                        Kategori: {item.kategori.nama}
                                                    </span>
                                                    {/* Status tetap menggunakan Badge original */}
                                                    <div className="w-fit">
                                                        <KuesionerStatusBadge status={item.status} />
                                                    </div>
                                                </div>

                                                {/* INFO DESKTOP: Kategori tipis di bawah judul */}
                                                <span className="hidden md:block text-xs text-muted-foreground font-normal">
                                                    {item.kategori.nama}
                                                </span>
                                            </div>
                                        </TableCell>

                                        <TableCell className="hidden md:table-cell px-4 py-3 text-sm text-center">
                                            {item._count.variabel}
                                        </TableCell>

                                        {/* Status Desktop */}
                                        <TableCell className="hidden md:table-cell px-4 py-3 text-center">
                                            <KuesionerStatusBadge status={item.status} />
                                        </TableCell>

                                        <TableCell
                                            className="px-4 py-3 text-center"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div className="flex justify-center gap-2">
                                                <Button
                                                    size="sm"
                                                    className="bg-yellow-500 hover:bg-yellow-600 text-white h-8 px-2"
                                                    disabled={!isDraft}
                                                    onClick={() => onEdit(item)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                    <span className="ml-1 hidden lg:block text-xs">Edit</span>
                                                </Button>

                                                <Button
                                                    size="sm"
                                                    className="bg-red-600 hover:bg-red-700 text-white h-8 px-2"
                                                    onClick={() => onDelete(item.kuesionerId)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="ml-1 hidden lg:block text-xs">Hapus</span>
                                                </Button>

                                                <Button
                                                    size="sm"
                                                    className="bg-blue-500 hover:bg-blue-600 text-white h-8 px-2"
                                                    disabled={isArsip}
                                                    onClick={() => onShare(item.kuesionerId)}
                                                >
                                                    <Share2 className="h-4 w-4" />
                                                    <span className="ml-1 hidden lg:block text-xs">Share</span>
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