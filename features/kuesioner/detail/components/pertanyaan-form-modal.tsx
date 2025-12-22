"use client";

import { useEffect, useRef } from "react";
import { useForm, useFieldArray, useWatch, Path, PathValue } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";

import { PertanyaanFormValues, PertanyaanFormSchema } from "../schemas";

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

type FormProps = {
    open: boolean;
    defaultValues?: Partial<PertanyaanFormValues>;
    isSubmitting?: boolean;
    onClose: () => void;
    onSubmit: (values: PertanyaanFormValues) => void;
    indikatorList: { indikatorId: number; label: string }[];
    isEditMode: boolean;
};

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
        control, register, handleSubmit, reset, setValue,
        formState: { errors },
    } = useForm<PertanyaanFormValues>({
        resolver: zodResolver(PertanyaanFormSchema),
        defaultValues: {
            teksPertanyaan: "",
            urutan: 0,
            indikatorId: 0,
            templateType: "likert_5",
            customScales: LIKERT_5_SCALES,
        },
    });

    const watchedTemplateType = useWatch({ control, name: "templateType" });
    const watchedIndikatorId = useWatch({ control, name: "indikatorId" });
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const { fields, append, remove } = useFieldArray({
        control,
        name: "customScales",
    });

    useEffect(() => {
        if (open) {
            reset(defaultValues ?? {
                teksPertanyaan: "",
                urutan: 0,
                indikatorId: 0,
                templateType: "likert_5",
                customScales: LIKERT_5_SCALES,
            });
        } else {
            reset();
        }
    }, [open, defaultValues, reset]);

    useEffect(() => {
        if (watchedTemplateType === 'likert_5') {
            setValue('customScales', LIKERT_5_SCALES, { shouldValidate: true });
        } else if (watchedTemplateType === 'likert_6_tt') {
            setValue('customScales', LIKERT_6_TT_SCALES, { shouldValidate: true });
        }
    }, [watchedTemplateType, setValue]);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement>) => {
        const target = e.target;
        const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

        if (target instanceof HTMLInputElement && target.type === "number" && target.value === "0") {
            const name = target.name as Path<PertanyaanFormValues>;
            setValue(name, "");
        }

        if (isMobile && scrollAreaRef.current) {
            scrollAreaRef.current.style.paddingBottom = "280px";
            setTimeout(() => {
                target.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 300);
        }
    };

    const handleBlur = () => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.style.paddingBottom = "20px";
        }
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <DialogContent className="w-[95vw] sm:max-w-xl max-h-[90vh] p-0 flex flex-col overflow-hidden top-[45%] sm:top-[50%] transition-all">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 min-h-0 overflow-hidden">

                    <DialogHeader className="p-4 sm:p-5 border-b bg-white shrink-0 relative z-50">
                        <DialogTitle className="text-base sm:text-lg">
                            {isEditMode ? "Edit Pertanyaan" : "Tambah Pertanyaan"}
                        </DialogTitle>
                        <DialogDescription className="text-xs text-muted-foreground mt-1">
                            Lengkapi data pertanyaan dan tentukan skala respon.
                        </DialogDescription>
                    </DialogHeader>

                    <div ref={scrollAreaRef} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 transition-all duration-300">
                        <Field>
                            <FieldLabel className="text-xs font-bold uppercase text-gray-500">Indikator Induk</FieldLabel>
                            <Select
                                value={watchedIndikatorId ? String(watchedIndikatorId) : ""}
                                onValueChange={(v) => setValue("indikatorId", Number(v), { shouldValidate: true })}
                                disabled={isEditMode || isSubmitting}
                            >
                                <SelectTrigger className="h-9 mt-1" onFocus={handleFocus}>
                                    <SelectValue placeholder="Pilih Indikator" />
                                </SelectTrigger>
                                <SelectContent>
                                    {indikatorList.map((i) => (
                                        <SelectItem key={i.indikatorId} value={String(i.indikatorId)}>{i.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.indikatorId && <p className="text-red-500 text-[10px] mt-1">{errors.indikatorId.message}</p>}
                        </Field>

                        <div className="grid grid-cols-4 gap-4">
                            <Field className="col-span-3">
                                <FieldLabel className="text-xs font-bold uppercase text-gray-500">Teks Pertanyaan</FieldLabel>
                                <Textarea
                                    {...register("teksPertanyaan")}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    placeholder="Teks pertanyaan..."
                                    className="text-sm mt-1 resize-none h-20"
                                />
                                {errors.teksPertanyaan && <p className="text-red-500 text-[10px] mt-1">{errors.teksPertanyaan.message}</p>}
                            </Field>
                            <Field className="col-span-1">
                                <FieldLabel className="text-xs font-bold uppercase text-gray-500">Urutan</FieldLabel>
                                <Input
                                    type="number"
                                    {...register("urutan", { valueAsNumber: true })}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    className="h-9 mt-1"
                                />
                                {errors.urutan && <p className="text-red-500 text-[10px] mt-1">{errors.urutan.message}</p>}
                            </Field>
                        </div>

                        <Field>
                            <FieldLabel className="text-xs font-bold uppercase text-gray-500">Pilih Skala Respon</FieldLabel>
                            <Select
                                value={watchedTemplateType || ""}
                                onValueChange={(v) =>
                                    setValue(
                                        'templateType',
                                        v as PathValue<PertanyaanFormValues, 'templateType'>,
                                        { shouldValidate: true }
                                    )
                                }
                            >
                                <SelectTrigger className="h-9 mt-1" onFocus={handleFocus}>
                                    <SelectValue placeholder="Pilih Template Skala" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="likert_5">Likert 5 Poin</SelectItem>
                                    <SelectItem value="likert_6_tt">Likert 6 Poin (AdaTidak Tahu)</SelectItem>
                                    <SelectItem value="custom">Skala Kustom</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>

                        {watchedTemplateType === 'custom' && (
                            <FieldGroup className="pt-2 border-t mt-4">
                                <FieldLabel className="text-[10px] font-bold uppercase text-blue-600">Definisi Skala Kustom</FieldLabel>
                                {fields.map((field, index) => (
                                    <div key={field.id} className="flex items-center gap-2 mb-2">
                                        <Input value={index + 1} readOnly className="w-10 h-8 text-center text-xs bg-gray-50 shrink-0" />
                                        <Input
                                            {...register(`customScales.${index}.label`)}
                                            placeholder={`Label nilai ${index + 1}`}
                                            className="h-8 text-sm flex-1"
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() => remove(index)}
                                            disabled={fields.length <= 2}
                                            className="h-8 w-8 p-0 text-red-500 shrink-0"
                                        >✕</Button>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => append({ value: fields.length + 1, label: "" })}
                                    className="w-full h-8 text-xs border-dashed"
                                >+ Tambah Poin Skala</Button>
                            </FieldGroup>
                        )}
                    </div>

                    <DialogFooter className="p-4 border-t bg-gray-50 flex flex-row gap-2 shrink-0 z-50">
                        <Button variant="outline" type="button" onClick={onClose} className="flex-1 h-9 text-sm">Batal</Button>
                        <Button type="submit" disabled={isSubmitting} className="flex-1 h-9 text-sm">
                            {isSubmitting ? "..." : (isEditMode ? "Simpan" : "Tambah")}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}