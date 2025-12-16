// fileName: pertanyaan-delete-dialog.tsx
"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

// ======================================================
// TYPES & PROPS
// ======================================================

type DeleteDialogProps = {
    open: boolean;
    pertanyaanId: number | null;
    isDeleting: boolean; // Opsional: jika Anda ingin menonaktifkan tombol saat proses hapus berjalan
    onClose: () => void;
    onConfirm: () => void;
};

// ======================================================
// KOMPONEN DELETE DIALOG
// ======================================================

export function PertanyaanDeleteDialog({
    open,
    pertanyaanId,
    isDeleting = false,
    onClose,
    onConfirm,
}: DeleteDialogProps) {
    // Teks ID Pertanyaan untuk ditampilkan di modal
    const displayId = pertanyaanId ? `#${pertanyaanId}` : '';

    return (
        <AlertDialog open={open} onOpenChange={(isOpen) => {
            // Tutup modal jika pengguna mengklik di luar atau menekan ESC
            if (!isOpen) onClose();
        }}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
                    <AlertDialogDescription>
                        Apakah Anda yakin ingin menghapus Pertanyaan {displayId}?
                        Tindakan ini tidak dapat dibatalkan.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                        <Button type="button" variant="outline" onClick={onClose}>Batal</Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={onConfirm}
                            disabled={isDeleting}
                        >
                            {isDeleting ? "Menghapus..." : "Hapus"}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}