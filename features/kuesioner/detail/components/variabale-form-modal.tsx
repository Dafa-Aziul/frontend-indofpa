// fileName: variabale-form-modal.tsx
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

import {
    variabelSchema,
    VariabelFormValues,
} from "../schemas";

type Props = {
    open: boolean;
    defaultValues?: VariabelFormValues;
    isSubmitting?: boolean;
    onClose: () => void;
    onSubmit: (values: VariabelFormValues) => void;
};

export function VariabelFormModal({
    open,
    defaultValues,
    isSubmitting = false,
    onClose,
    onSubmit,
}: Props) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<VariabelFormValues>({
        resolver: zodResolver(variabelSchema),
        defaultValues: {
            kode: "",
            nama: "",
            deskripsi: "",
        },
    });

    /* ================= SYNC EDIT DATA (Memastikan form terisi untuk Edit) ================= */
    useEffect(() => {
        // Ini memastikan defaultValues disetel saat mode Edit
        reset(
            defaultValues ?? {
                kode: "",
                nama: "",
                deskripsi: "",
            }
        );
    }, [defaultValues, reset]);

    /* ✅ PERBAIKAN: RESET FORM SAAT MODAL DITUTUP */
    useEffect(() => {
        // Ketika 'open' menjadi false (modal ditutup), panggil reset()
        if (!open) {
            reset(); 
        }
    }, [open, reset]);

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) onClose();
            }}
        >
            <DialogContent className="max-w-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <DialogHeader>
                            <DialogTitle>
                                {defaultValues ? "Edit Variabel" : "Tambah Variabel"}
                            </DialogTitle>

                            <DialogDescription>
                                {defaultValues
                                    ? "Perbarui informasi variabel."
                                    : "Lengkapi data variabel kuesioner."}
                            </DialogDescription>
                        </DialogHeader>

                        {/* ================= KODE ================= */}
                        <Field>
                            <FieldLabel htmlFor="kode">Kode Variabel</FieldLabel>
                            <Input
                                id="kode"
                                placeholder="Contoh: V1"
                                {...register("kode")}
                            />
                            <FieldDescription>
                                {errors.kode?.message}
                            </FieldDescription>
                        </Field>

                        {/* ================= NAMA ================= */}
                        <Field>
                            <FieldLabel htmlFor="nama">Nama Variabel</FieldLabel>
                            <Input
                                id="nama"
                                placeholder="Contoh: Kualitas Pelayanan"
                                {...register("nama")}
                            />
                            <FieldDescription>
                                {errors.nama?.message}
                            </FieldDescription>
                        </Field>

                        {/* ================= DESKRIPSI ================= */}
                        <Field>
                            <FieldLabel htmlFor="deskripsi">Deskripsi</FieldLabel>
                            <Input
                                id="deskripsi"
                                placeholder="Deskripsi singkat variabel"
                                {...register("deskripsi")}
                            />
                            <FieldDescription>
                                {errors.deskripsi?.message}
                            </FieldDescription>
                        </Field>

                        {/* ================= ACTION ================= */}
                        <DialogFooter className="pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                            >
                                Batal
                            </Button>

                            <Button type="submit" disabled={isSubmitting}>
                                {defaultValues ? "Simpan Perubahan" : "Tambah Variabel"}
                            </Button>
                        </DialogFooter>
                    </FieldGroup>
                </form>
            </DialogContent>
        </Dialog>
    );
}