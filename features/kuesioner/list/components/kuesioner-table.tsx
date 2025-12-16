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
        <div className="relative w-full overflow-x-auto rounded-lg border bg-white">
            <Table className="min-w-full">
                <TableHeader>
                    <TableRow className="bg-accent pointer-events-none">
                        <TableHead className="w-[60px] text-center text-white font-bold">
                            No
                        </TableHead>
                        <TableHead className="text-white font-bold">Judul</TableHead>
                        <TableHead className="text-white font-bold">Kategori</TableHead>
                        <TableHead className="text-white font-bold">Variabel</TableHead>
                        <TableHead className="text-white font-bold">Status</TableHead>
                        <TableHead className="text-white font-bold text-center">
                            Aksi
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={6}
                                className="h-10 text-center text-muted-foreground"
                            >
                                Belum ada data kuesioner
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item, index) => {
                            const nomor = (page - 1) * limit + index + 1;
                            const isArsip = item.status === "Arsip";
                            const isDraft = item.status === "Draft"
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
                                    <TableCell className="text-center">{nomor}</TableCell>
                                    <TableCell className="font-medium">
                                        {item.judul}
                                    </TableCell>
                                    <TableCell>{item.kategori.nama}</TableCell>
                                    <TableCell>{item._count.variabel}</TableCell>
                                    <TableCell>
                                        <KuesionerStatusBadge status={item.status} />
                                    </TableCell>

                                    <TableCell
                                        className="text-center"
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
