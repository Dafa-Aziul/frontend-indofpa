// fileName: pertanyaan-form-modal.tsx
"use client";

import { useEffect } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Pastikan Anda mengimpor komponen UI Anda di sini
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field";

// Impor dari file lokal
import { PertanyaanFormValues, PertanyaanFormSchema } from "../schemas";

// ======================================================
// DEFINISI TEMPLATE DATA LIKERT
// ======================================================

type ScaleItem = { value: number; label: string };

const LIKERT_5_SCALES: ScaleItem[] = [
    { value: 1, label: "Sangat Tidak Setuju" },
    { value: 2, label: "Tidak Setuju" },
    { value: 3, label: "Netral" },
    { value: 4, label: "Setuju" },
    { value: 5, label: "Sangat Setuju" },
];

const LIKERT_6_TT_SCALES: ScaleItem[] = [
    { value: 1, label: "Tidak Tahu (TT)" },
    { value: 2, label: "Sangat Tidak Setuju (STS)" },
    { value: 3, label: "Tidak Setuju (TS)" },
    { value: 4, label: "Kurang Setuju (KS)" },
    { value: 5, label: "Setuju (S)" },
    { value: 6, label: "Sangat Setuju (SS)" }, 
];


// ======================================================
// TYPES & PROPS
// ======================================================

type FormProps = {
    open: boolean;
    defaultValues?: PertanyaanFormValues; 
    isSubmitting?: boolean;
    onClose: () => void;
    onSubmit: (values: PertanyaanFormValues) => void;
    
    indikatorList: { indikatorId: number; label: string }[];
    isEditMode: boolean;
};

// ======================================================
// KOMPONEN FORM MODAL
// ======================================================

export function PertanyaanFormModal({
    open,
    defaultValues,
    isSubmitting = false,
    onClose,
    onSubmit,
    indikatorList,
    isEditMode,
}: FormProps) {
    const {
        register,
        handleSubmit,
        reset,
        control,
        setValue,
        watch,
        formState: { errors },
    }
    = useForm<PertanyaanFormValues>({
        resolver: zodResolver(PertanyaanFormSchema),
        defaultValues: {
            teksPertanyaan: "",
            urutan: 0,
            templateType: undefined, 
            customScales: undefined,
            indikatorId: undefined, 
        },
    });

    const watchedTemplateType = watch('templateType');
    const watchedIndikatorId = watch('indikatorId');

    /* ================= C. LOGIC: FIELD ARRAY KUSTOM ================= */
    
    const { fields, append, remove } = useFieldArray<PertanyaanFormValues>({
        control, 
        name: "customScales" as const,
    });
    
    const currentScalesCount = fields.length;

    /* ================= A. LOGIC: SYNC DATA & RESET ================= */

    useEffect(() => {
        if (open) {
            reset(defaultValues ?? { 
                teksPertanyaan: "", 
                urutan: 0,
                templateType: undefined, 
                customScales: undefined,
                indikatorId: undefined,
            });
        } else {
            reset(); 
        }
    }, [open, defaultValues, reset]);

    /* ================= B. LOGIC: AUTO-POPULATE TEMPLATE ================= */
    
    useEffect(() => {
        let scalesToSet: ScaleItem[] | undefined;

        if (watchedTemplateType === 'likert_5') {
            scalesToSet = LIKERT_5_SCALES;
        } else if (watchedTemplateType === 'likert_6_tt') {
            scalesToSet = LIKERT_6_TT_SCALES;
        } 
        
        if (scalesToSet) {
            setValue('customScales', scalesToSet, { shouldValidate: true });
        } else if (watchedTemplateType === 'custom' && !fields.length) {
             setValue('customScales', [{ value: 1, label: '' }, { value: 2, label: '' }], { shouldValidate: false });
        }
        
    }, [watchedTemplateType, isEditMode, setValue, fields.length]); 

    /* ================= D. RENDER ================= */

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) onClose();
            }}
        >
            {/* ✅ Perbaikan 1: Gunakan max-h-[90vh] dan overflow-hidden di DialogContent */}
            <DialogContent className="max-w-xl max-h-[90vh] flex flex-col p-0 overflow-hidden"> 
                
                {/* HEADER (Penting: harus ada padding agar header tidak menempel di tepi) */}
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle>
                        {isEditMode ? "Edit Pertanyaan" : "Tambah Pertanyaan"}
                    </DialogTitle>
                    <DialogDescription>
                        Lengkapi data pertanyaan dan definisikan skala responnya.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit as SubmitHandler<PertanyaanFormValues>)} className="flex flex-col flex-1 min-h-0">
                    
                    {/* ✅ Perbaikan 2: Konten Utama Dibuat Scrollable dan mengambil sisa ruang (flex-1) */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        
                        {/* ================= 1. INDIKATOR INDUK ================= */}
                        <Field>
                            <FieldLabel htmlFor="indikatorId">Indikator Induk</FieldLabel>
                            <Select
                                onValueChange={(value) => {
                                    setValue("indikatorId", Number(value), { shouldValidate: true });
                                }}
                                value={watchedIndikatorId ? String(watchedIndikatorId) : "0"} 
                                disabled={isEditMode || isSubmitting}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Indikator" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0" disabled>Pilih Indikator</SelectItem>
                                    {indikatorList.map((i) => (
                                        <SelectItem key={i.indikatorId} value={String(i.indikatorId)}>
                                            {i.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FieldDescription className="text-red-500">
                                {errors.indikatorId?.message}
                            </FieldDescription>
                        </Field>
                        
                        {/* ================= 2. TEKS & URUTAN ================= */}
                        <div className="grid grid-cols-4 gap-4">
                            <Field className="col-span-3">
                                <FieldLabel htmlFor="teksPertanyaan">Teks Pertanyaan</FieldLabel>
                                <Textarea
                                    id="teksPertanyaan"
                                    placeholder="Contoh: Pegawai cepat tanggap dalam melayani kebutuhan pelanggan."
                                    {...register("teksPertanyaan")}
                                    disabled={isSubmitting}
                                />
                                <FieldDescription className="text-red-500">
                                    {errors.teksPertanyaan?.message}
                                </FieldDescription>
                            </Field>

                            <Field className="col-span-1">
                                <FieldLabel htmlFor="urutan">Urutan</FieldLabel>
                                <Input
                                    id="urutan"
                                    type="number"
                                    placeholder="1"
                                    {...register("urutan", { valueAsNumber: true })}
                                    disabled={isSubmitting}
                                />
                                <FieldDescription className="text-red-500">
                                    {errors.urutan?.message}
                                </FieldDescription>
                            </Field>
                        </div>


                        {/* ================= 3. PILIHAN TEMPLATE SKALA ================= */}
                        <Field>
                            <FieldLabel>Pilih Skala Respon</FieldLabel>
                            <Select
                                onValueChange={(value) => {
                                    setValue('templateType', value as PertanyaanFormValues['templateType'], { shouldValidate: true });
                                }}
                                value={watchedTemplateType || ""}
                                disabled={isSubmitting}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Template Skala" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="likert_5">Likert 5 Poin (Sangat T.S. - Sangat S.)</SelectItem>
                                    <SelectItem value="likert_6_tt">Likert 6 Poin (Termasuk 'Tidak Tahu')</SelectItem>
                                    <SelectItem value="custom">Skala Kustom (Masukkan sendiri)</SelectItem>
                                </SelectContent>
                            </Select>
                            <FieldDescription className="text-red-500">
                                {errors.templateType?.message}
                            </FieldDescription>
                        </Field>

                        {/* ================= 4. CUSTOM SCALE INPUT (Hanya tampil jika 'custom') ================= */}
                        {watchedTemplateType === 'custom' && (
                            <FieldGroup className="pt-2 border-t mt-4">
                                <FieldLabel>Definisi Skala Kustom ({currentScalesCount} Poin)</FieldLabel>
                                
                                {/* Header Grid */}
                                <div className="grid grid-cols-8 gap-2 font-semibold text-sm text-gray-600 dark:text-gray-300 mb-2">
                                    <span className="col-span-1">Nilai</span>
                                    <span className="col-span-6">Label Respon</span>
                                    <span className="col-span-1 text-right">Hapus</span>
                                </div>
                                
                                {/* Field Array Mapping */}
                                {fields.map((field, index) => (
                                    <div key={field.id} className="grid grid-cols-8 gap-2 items-center mb-2">
                                        <Input 
                                            value={index + 1} 
                                            readOnly 
                                            disabled 
                                            className="col-span-1 text-center"
                                            {...register(`customScales.${index}.value`, { valueAsNumber: true })} 
                                        />

                                        <Input
                                            className="col-span-6"
                                            placeholder={`Label untuk nilai ${index + 1}`}
                                            {...register(`customScales.${index}.label`)}
                                            disabled={isSubmitting}
                                        />
                                        
                                        <Button 
                                            type="button" 
                                            variant="ghost" 
                                            onClick={() => remove(index)}
                                            disabled={fields.length <= 2 || isSubmitting} 
                                            className="col-span-1 justify-end"
                                        >
                                            X
                                        </Button>
                                        
                                        {errors.customScales?.[index]?.label && (
                                            <p className="col-span-8 text-xs text-red-500 mt-1">
                                                {errors.customScales[index]?.label?.message}
                                            </p>
                                        )}
                                    </div>
                                ))}

                                <Button 
                                    type="button" 
                                    variant="secondary" 
                                    onClick={() => append({ value: fields.length + 1, label: '' })}
                                    disabled={fields.length >= 10 || isSubmitting}
                                    className="mt-2"
                                >
                                    + Tambah Poin Skala ({fields.length}/10)
                                </Button>
                                <FieldDescription className="text-red-500">
                                    {errors.customScales?.message}
                                </FieldDescription>
                            </FieldGroup>
                        )}
                    </div>


                    {/* FOOTER (Penting: Pindahkan DialogFooter ke dalam form, di luar area scroll) */}
                    <DialogFooter className="p-6 pt-0 mt-6">
                        <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                            Batal
                        </Button>

                        <Button type="submit" disabled={isSubmitting}>
                            {isEditMode ? "Simpan Perubahan" : "Tambah Pertanyaan"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}