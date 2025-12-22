"use client";

import { useEffect, useRef } from "react";
import { useForm, useWatch, Path } from "react-hook-form";
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
import { Field, FieldLabel } from "@/components/ui/field";
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
        control,
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<KuesionerFormValues>({
        resolver: zodResolver(kuesionerSchema),
        defaultValues: {
            judul: "", tujuan: "", manfaat: "", kategoriId: 0, estimasiMenit: 0, targetResponden: 0,
        },
    });

    const watchedKategoriId = useWatch({
        control,
        name: "kategoriId",
    });

    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open) {
            reset(defaultValues ?? {
                judul: "", tujuan: "", manfaat: "", kategoriId: 0, estimasiMenit: 0, targetResponden: 0,
            });
        } else {
            reset();
        }
    }, [open, defaultValues, reset]);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement>) => {
        const target = e.target;
        
        if (target instanceof HTMLInputElement && target.type === "number" && target.value === "0") {
            const name = target.name as Path<KuesionerFormValues>;
            setValue(name, "");
        }

        // ✅ Logic Scroll Mobile
        const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
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
            <DialogContent className="w-[95vw] sm:max-w-[500px] max-h-[90vh] p-0 flex flex-col overflow-hidden top-[45%] sm:top-[50%] transition-all">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 min-h-0 overflow-hidden">

                    <DialogHeader className="p-4 sm:p-5 border-b bg-white shrink-0 relative z-50">
                        <DialogTitle className="text-base sm:text-lg">
                            {defaultValues ? "Edit Kuesioner" : "Tambah Kuesioner"}
                        </DialogTitle>
                        <DialogDescription className="text-xs text-muted-foreground mt-1">
                            {defaultValues 
                                ? "Perbarui informasi kuesioner yang sudah ada." 
                                : "Silakan isi formulir di bawah ini untuk membuat kuesioner baru."}
                        </DialogDescription>
                    </DialogHeader>

                    <div
                        ref={scrollAreaRef}
                        className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 transition-all duration-300"
                    >
                        <Field>
                            <FieldLabel className="text-xs font-bold uppercase text-gray-500">Judul Kuesioner</FieldLabel>
                            <Input
                                {...register("judul")}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                disabled={isSubmitting}
                                placeholder="Contoh: Survei Kepuasan Pelanggan"
                                className="h-9 mt-1"
                            />
                            {errors.judul && <p className="text-red-500 text-[10px] mt-1">{errors.judul.message}</p>}
                        </Field>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel className="text-xs font-bold uppercase text-gray-500">Kategori</FieldLabel>
                                <Select
                                    value={watchedKategoriId ? String(watchedKategoriId) : ""}
                                    onValueChange={(v) => setValue("kategoriId", Number(v), { shouldValidate: true })}
                                >
                                    <SelectTrigger className="h-9 mt-1" onFocus={handleFocus}>
                                        <SelectValue placeholder="Pilih Kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {kategoriList.map((k) => (
                                            <SelectItem key={k.kategoriId} value={String(k.kategoriId)}>{k.nama}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.kategoriId && <p className="text-red-500 text-[10px] mt-1">{errors.kategoriId.message}</p>}
                            </Field>

                            <div className="grid grid-cols-2 gap-2">
                                <Field>
                                    <FieldLabel className="text-[10px] font-bold uppercase text-gray-500">Menit</FieldLabel>
                                    <Input
                                        type="number"
                                        {...register("estimasiMenit", {
                                            valueAsNumber: true,
                                            setValueAs: (val) => (val === "" ? undefined : Number(val))
                                        })}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        className="h-9 mt-1"
                                    />
                                    {errors.estimasiMenit && <p className="text-red-500 text-[10px] mt-1">{errors.estimasiMenit.message}</p>}
                                </Field>
                                <Field>
                                    <FieldLabel className="text-[10px] font-bold uppercase text-gray-500">Target</FieldLabel>
                                    <Input
                                        type="number"
                                        {...register("targetResponden", {
                                            valueAsNumber: true,
                                            setValueAs: (val) => (val === "" ? undefined : Number(val))
                                        })}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        className="h-9 mt-1"
                                    />
                                    {errors.targetResponden && <p className="text-red-500 text-[10px] mt-1">{errors.targetResponden.message}</p>}
                                </Field>
                            </div>
                        </div>

                        <Field>
                            <FieldLabel className="text-xs font-bold uppercase text-gray-500">Tujuan</FieldLabel>
                            <Textarea
                                rows={2}
                                {...register("tujuan")}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                placeholder="Tujuan kuesioner..."
                                className="text-sm mt-1 resize-none"
                            />
                            {errors.tujuan && <p className="text-red-500 text-[10px] mt-1">{errors.tujuan.message}</p>}
                        </Field>

                        <Field>
                            <FieldLabel className="text-xs font-bold uppercase text-gray-500">Manfaat</FieldLabel>
                            <Textarea
                                rows={2}
                                {...register("manfaat")}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                placeholder="Manfaat kuesioner..."
                                className="text-sm mt-1 resize-none"
                            />
                            {errors.manfaat && <p className="text-red-500 text-[10px] mt-1">{errors.manfaat.message}</p>}
                        </Field>
                    </div>

                    <DialogFooter className="p-4 border-t bg-gray-50 flex flex-row gap-2 shrink-0 z-50">
                        <Button variant="outline" type="button" onClick={onClose} className="flex-1 h-9 text-sm">
                            Batal
                        </Button>
                        <Button type="submit" disabled={isSubmitting} className="flex-1 h-9 text-sm">
                            {isSubmitting ? "..." : "Simpan"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}