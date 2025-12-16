// fileName: src/features/monitoring/kategori/components/KategoriFormModal.tsx
"use client";

import { useEffect } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldDescription,
} from "@/components/ui/field";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { kategoriSchema, KategoriFormValues } from "../schemas";

type Props = {
    open: boolean;
    defaultValues?: KategoriFormValues;
    onClose: () => void;
    onSubmit: (values: KategoriFormValues) => void;
};

export default function KategoriFormModal({
    open,
    defaultValues,
    onClose,
    onSubmit,
}: Props) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<KategoriFormValues>({
        resolver: zodResolver(kategoriSchema),
        defaultValues: { nama: "" },
    });

    /* ===== SINKRONISASI CREATE / EDIT ===== */
    useEffect(() => {
        if (open) {
            // Memastikan form bersih saat modal dibuka untuk CREATE
            reset(defaultValues ?? { nama: "" });
        }
    }, [open, defaultValues, reset]);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <DialogHeader>
                            <DialogTitle>
                                {defaultValues ? "Edit Kategori" : "Tambah Kategori"}
                            </DialogTitle>
                            <DialogDescription>
                                {defaultValues
                                    ? "Perbarui nama kategori yang dipilih."
                                    : "Tambahkan kategori baru ke dalam sistem."}
                            </DialogDescription>
                        </DialogHeader>

                        {/* ================= FIELD ================= */}
                        <Field>
                            <FieldLabel htmlFor="nama">
                                Nama Kategori
                            </FieldLabel>

                            <Input
                                id="nama"
                                placeholder="Masukkan nama kategori"
                                autoFocus
                                {...register("nama")}
                            />

                            {errors.nama ? (
                                <FieldDescription className="text-red-500">
                                    {errors.nama.message}
                                </FieldDescription>
                            ) : (
                                <FieldDescription>
                                    Gunakan nama yang mudah dikenali.
                                </FieldDescription>
                            )}
                        </Field>

                        {/* ================= ACTION ================= */}
                        {/* ✅ PERBAIKAN: Menambahkan kelas responsif pada DialogFooter */}
                        <DialogFooter className="pt-2 flex flex-col-reverse md:flex-row gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                className="w-full md:w-auto" // Agar Batal mengambil lebar penuh di mobile
                            >
                                Batal
                            </Button>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full md:w-auto" // Agar Simpan mengambil lebar penuh di mobile
                            >
                                {defaultValues ? "Simpan Perubahan" : "Simpan"}
                            </Button>
                        </DialogFooter>
                    </FieldGroup>
                </form>
            </DialogContent>
        </Dialog>
    );
}