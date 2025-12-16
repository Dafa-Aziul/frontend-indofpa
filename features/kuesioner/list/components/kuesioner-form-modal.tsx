// fileName: KuesionerFormModal.tsx
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
import { Textarea } from "@/components/ui/textarea";

import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldDescription,
} from "@/components/ui/field";

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

import {
    kuesionerSchema,
    KuesionerFormValues,
} from "@/features/kuesioner/list/schemas";

type Props = {
    open: boolean;
    defaultValues?: KuesionerFormValues;
    onClose: () => void;
    onSubmit: (values: KuesionerFormValues) => void;
    kategoriList?: {
        kategoriId: number;
        nama: string;
    }[];
};

export default function KuesionerFormModal({
    open,
    defaultValues,
    onClose,
    onSubmit,
    kategoriList = [],
}: Props) {
    const {
        watch,
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<KuesionerFormValues>({
        resolver: zodResolver(kuesionerSchema),
        defaultValues: {
            judul: "",
            tujuan: "",
            manfaat: "",
            kategoriId: 0,
            estimasiMenit: 0,
            targetResponden: 0,
        },
    });

    // Watch nilai kategoriId saat ini
    const watchedKategoriId = watch("kategoriId");

    useEffect(() => {
        // Logika reset yang dioptimalkan
        if (open) {
            reset(
                defaultValues ?? {
                    judul: "",
                    tujuan: "",
                    manfaat: "",
                    kategoriId: 0,
                    estimasiMenit: 0,
                    targetResponden: 0,
                }
            );
        } else {
            reset(); // Reset form ketika ditutup
        }
    }, [open, defaultValues, reset]);

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) onClose();
            }}
        >

            {/* ✅ PERBAIKAN: DialogContent diatur sebagai flex container utama dengan max-h */}
            <DialogContent className="max-w-lg max-h-[90vh] p-0 flex flex-col">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 min-h-0">

                    {/* 1. HEADER (Di luar area scroll) */}
                    <DialogHeader className="p-6 pb-0">
                        <DialogTitle>
                            {defaultValues ? "Edit Kuesioner" : "Tambah Kuesioner"}
                        </DialogTitle>

                        <DialogDescription>
                            {defaultValues
                                ? "Perbarui informasi kuesioner."
                                : "Lengkapi informasi kuesioner yang akan dibuat."}
                        </DialogDescription>

                    </DialogHeader>

                    {/* ✅ 2. KONTEN UTAMA: Area scroll (flex-1) */}
                    {/* Mengambil sisa ruang (flex-1) dan mengaktifkan scroll */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">

                        {/* ================= JUDUL ================= */}
                        <Field>
                            <FieldLabel htmlFor="judul">Judul</FieldLabel>
                            <Input {...register("judul")} disabled={isSubmitting} />
                            <FieldDescription className="text-red-500">{errors.judul?.message}</FieldDescription>
                        </Field>

                        {/* ================= TUJUAN ================= */}
                        <Field>
                            <FieldLabel htmlFor="tujuan">Tujuan</FieldLabel>
                            <Textarea rows={4} {...register("tujuan")} disabled={isSubmitting} />
                            <FieldDescription className="text-red-500">{errors.tujuan?.message}</FieldDescription>
                        </Field>

                        {/* ================= MANFAAT ================= */}
                        <Field>
                            <FieldLabel htmlFor="manfaat">Manfaat</FieldLabel>
                            <Textarea rows={4} {...register("manfaat")} disabled={isSubmitting} />
                            <FieldDescription className="text-red-500">{errors.manfaat?.message}</FieldDescription>
                        </Field>

                        {/* ================= KATEGORI ================= */}
                        <Field>
                            <FieldLabel>Kategori</FieldLabel>
                            <Select
                                // Gunakan watchedKategoriId untuk mengontrol Select
                                value={String(watchedKategoriId || "")}
                                onValueChange={(v) => setValue("kategoriId", Number(v), { shouldValidate: true })}
                                disabled={isSubmitting}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0" disabled>Pilih Kategori</SelectItem>
                                    {kategoriList.map((k) => (
                                        <SelectItem
                                            key={k.kategoriId}
                                            value={String(k.kategoriId)}
                                        >
                                            {k.nama}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FieldDescription className="text-red-500">{errors.kategoriId?.message}</FieldDescription>
                        </Field>

                        {/* ================= ESTIMASI ================= */}
                        <Field>
                            <FieldLabel>Estimasi Waktu (Menit)</FieldLabel>
                            <Input
                                type="number"
                                {...register("estimasiMenit", { valueAsNumber: true })}
                                disabled={isSubmitting}
                            />
                            <FieldDescription className="text-red-500">{errors.estimasiMenit?.message}</FieldDescription>
                        </Field>

                        {/* ================= TARGET ================= */}
                        <Field>
                            <FieldLabel>Target Responden</FieldLabel>
                            <Input
                                type="number"
                                {...register("targetResponden", { valueAsNumber: true })}
                                disabled={isSubmitting}
                            />
                            <FieldDescription className="text-red-500">{errors.targetResponden?.message}</FieldDescription>
                        </Field>
                    </div>

                    {/* 3. FOOTER (Di luar area scroll) */}
                    <DialogFooter className="p-6 pt-3 border-t mt-auto">
                        <Button variant="outline" type="button" onClick={onClose} disabled={isSubmitting}>
                            Batal
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {defaultValues ? "Simpan Perubahan" : "Simpan"}
                        </Button>
                    </DialogFooter>

                </form>
            </DialogContent>
        </Dialog>
    );
}