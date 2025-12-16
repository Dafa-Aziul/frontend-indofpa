// fileName: indikator-delete-dialog.tsx
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
    nama: string; // Nama indikator yang akan dihapus
    onCancel: () => void;
    onConfirm: () => void;
};

export function IndikatorDeleteDialog({
    open,
    nama,
    onCancel,
    onConfirm,
}: Props) {
    return (
        <AlertDialog open={open} onOpenChange={onCancel}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Hapus Indikator {nama}?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Tindakan ini bersifat permanen. Menghapus indikator
                        akan menghapus **semua pertanyaan** yang terkait di bawahnya.
                        Data yang dihapus tidak dapat dikembalikan.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Batal
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                    >
                        Hapus
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}