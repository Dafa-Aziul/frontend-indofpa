// fileName: src/features/monitoring/responden/components/KategoriDeleteDialog.tsx
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
    onCancel: () => void;
    onConfirm: () => void;
};

export default function KategoriDeleteDialog({
    open,
    onCancel,
    onConfirm,
}: Props) {
    return (
        <AlertDialog open={open} onOpenChange={onCancel}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Hapus kategori?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Tindakan ini bersifat permanen. Kategori yang dihapus
                        tidak dapat dikembalikan dan dapat memengaruhi data
                        kuesioner yang terkait.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                {/* ✅ Penyesuaian Responsif pada Footer:
                  Gunakan flex-col-reverse pada mobile (default) agar tombol 'Hapus'
                  berada di atas tombol 'Batal', dan gunakan flex-row pada md: (tablet/desktop)
                  sehingga tombol-tombol berada berdampingan.
                */}
                <AlertDialogFooter className="flex flex-col-reverse md:flex-row md:justify-end gap-2">
                    <AlertDialogCancel>
                        Batal
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className="bg-red-600 hover:bg-red-700 focus:ring-red-600 w-full md:w-auto" // Tambahkan w-full untuk mobile
                    >
                        Hapus
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}