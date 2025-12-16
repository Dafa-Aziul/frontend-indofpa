// fileName: indikator-form-modal.tsx
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldDescription,
} from "@/components/ui/field";

import {
    indikatorSchema,
    IndikatorFormValues,
} from "../schemas";
import { Variabel } from "../types";

// Current usage (Compatible with Zod v3 and v4 for number validation)
const IndikatorFormExtendedSchema = indikatorSchema.extend({
    variabelId: z
        .number({
            error: (issue) =>
                issue.input === undefined || issue.input === 0
                    ? "Variabel wajib dipilih"
                    : "Variabel harus berupa angka",
        })
        .int()
        .min(1, "Variabel wajib dipilih"),
});

type IndikatorFormExtendedValues = z.infer<typeof IndikatorFormExtendedSchema>;

type Props = {
    open: boolean;
    defaultValues?: IndikatorFormValues & { variabelId: number };
    isSubmitting?: boolean;
    onClose: () => void;
    onSubmit: (values: IndikatorFormExtendedValues) => void;
    variabelList: Variabel[];
    isEditMode: boolean;
};


export function IndikatorFormModal({
    open,
    defaultValues,
    isSubmitting = false,
    onClose,
    onSubmit,
    variabelList,
    isEditMode,
}: Props) {
    const {
        register,
        handleSubmit,
        reset, // Ambil fungsi reset
        setValue,
        // ✅ WATCH NILAI VARIABELID DARI RHF
        watch,
        formState: { errors },
    } = useForm<IndikatorFormExtendedValues>({
        resolver: zodResolver(IndikatorFormExtendedSchema),
        mode: "onChange", // Mengubah mode validasi agar lebih responsif terhadap setValue
        defaultValues: {
            kode: "",
            nama: "",
            variabelId: 0,
        },
    });

    // ✅ Panggil watch untuk variabelId
    const watchedVariabelId = watch('variabelId');


    /* ================= MANUAL REGISTER ================= */
    useEffect(() => {
        // Daftarkan variabelId ke RHF di awal
        register('variabelId', { required: true, valueAsNumber: true });
    }, [register]);


    /* ================= SYNC EDIT DATA ================= */
    useEffect(() => {
        // Ini digunakan untuk memuat data edit atau menginisialisasi nilai default
        reset(
            defaultValues ?? {
                kode: "",
                nama: "",
                variabelId: 0,
            }
        );
    }, [defaultValues, reset]);
    
    /* ✅ PERBAIKAN: RESET FORM SAAT MODAL DITUTUP */
    useEffect(() => {
        // Panggil reset ke nilai default/kosong RHF ketika prop 'open' menjadi false
        if (!open) {
            reset(); 
        }
    }, [open, reset]);


    // Handle submit form
    const handleFormSubmit = (values: IndikatorFormExtendedValues) => {
        onSubmit(values);
    };


    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) onClose();
            }}
        >
            <DialogContent className="max-w-md">
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <FieldGroup>
                        <DialogHeader>
                            <DialogTitle>
                                {isEditMode ? "Edit Indikator" : "Tambah Indikator"}
                            </DialogTitle>

                            <DialogDescription>
                                {isEditMode
                                    ? "Perbarui informasi indikator."
                                    : "Lengkapi data indikator untuk variabel terpilih."}
                            </DialogDescription>
                        </DialogHeader>

                        {/* ================= VARIABEL ID (SELECT) ================= */}
                        <Field>
                            <FieldLabel htmlFor="variabelId">Variabel Induk</FieldLabel>
                            <Select
                                onValueChange={(value) => {
                                    // 1. Set nilai (memicu update state RHF & watch)
                                    setValue("variabelId", Number(value), { shouldValidate: true });
                                }}
                                // ✅ GUNAKAN NILAI YANG DI-WATCH (SUMBER TUNGGAL DARI RHF)
                                value={String(watchedVariabelId)}
                                disabled={isEditMode}
                            >
                                <SelectTrigger
                                    onBlur={() => {
                                        // Optional: Jika mode validasi bukan onChange
                                    }}
                                >
                                    {/* SelectValue akan menampilkan opsi yang cocok dengan nilai watchedVariabelId */}
                                    <SelectValue placeholder="Pilih Variabel" />
                                </SelectTrigger>
                                <SelectContent>
                                    {!isEditMode && (
                                        <SelectItem value="0" disabled>Pilih Variabel</SelectItem>
                                    )}
                                    {variabelList.map((v) => (
                                        <SelectItem key={v.variabelId} value={String(v.variabelId)}>
                                            [{v.kode}] {v.nama}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FieldDescription>
                                {/* Pesan error seharusnya muncul jika watchedVariabelId masih 0 atau tidak valid */}
                                {errors.variabelId?.message}
                            </FieldDescription>
                        </Field>

                        {/* ================= KODE ================= */}
                        <Field>
                            <FieldLabel htmlFor="kode">Kode Indikator</FieldLabel>
                            <Input
                                id="kode"
                                placeholder="Contoh: I1.1"
                                {...register("kode")}
                            />
                            <FieldDescription>
                                {errors.kode?.message}
                            </FieldDescription>
                        </Field>

                        {/* ================= NAMA ================= */}
                        <Field>
                            <FieldLabel htmlFor="nama">Nama Indikator</FieldLabel>
                            <Input
                                id="nama"
                                placeholder="Contoh: Pegawai cepat tanggap"
                                {...register("nama")}
                            />
                            <FieldDescription>
                                {errors.nama?.message}
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
                                {isEditMode ? "Simpan Perubahan" : "Tambah Indikator"}
                            </Button>
                        </DialogFooter>
                    </FieldGroup>
                </form>
            </DialogContent>
        </Dialog>
    );
}