"use client";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";

type Props = {
    open: boolean;
    nama: string; // ✅ Tambahkan nama kategori agar lebih informatif
    onCancel: () => void;
    onConfirm: () => void;
};

export default function KategoriDeleteDialog({
    open,
    nama,
    onCancel,
    onConfirm,
}: Props) {
    return (
        <AlertDialog open={open} onOpenChange={onCancel}>
            {/* ✅ Tambahkan max-width dan width responsif */}
            <AlertDialogContent className="w-[95vw] sm:max-w-[425px]">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Hapus Kategori {nama}?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Tindakan ini bersifat permanen. Menghapus kategori ini akan 
                        memutus hubungan dengan kuesioner yang terkait. 
                        Data yang dihapus tidak dapat dikembalikan.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                    <AlertDialogCancel onClick={onCancel} className="mt-0">
                        Batal
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className="bg-red-600 hover:bg-red-700 focus:ring-red-600 w-full sm:w-auto"
                    >
                        Hapus Permanen
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}