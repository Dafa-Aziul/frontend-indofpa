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
    judul: string; // Tambahkan prop judul agar lebih informatif
    onCancel: () => void;
    onConfirm: () => void;
};

export default function KuesionerDeleteDialog({
    open,
    judul,
    onCancel,
    onConfirm,
}: Props) {
    return (
        <AlertDialog open={open} onOpenChange={onCancel}>
            <AlertDialogContent className="w-[95vw] sm:max-w-[425px]">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Hapus Kuesioner {judul}?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Tindakan ini bersifat permanen. Menghapus kuesioner ini akan menghapus
                        **seluruh variabel, indikator, dan pertanyaan** yang ada di dalamnya.
                        Data yang sudah dihapus tidak dapat dikembalikan.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="flex flex-col-reverse sm:flex-row gap-2">
                    <AlertDialogCancel onClick={onCancel}>
                        Batal
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                    >
                        Hapus Permanen
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}