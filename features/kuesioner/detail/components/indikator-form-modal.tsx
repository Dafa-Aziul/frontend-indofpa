"use client";

import { useEffect, useRef } from "react";
import { useForm, useWatch, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
    Dialog, DialogContent, DialogHeader, DialogTitle, 
    DialogDescription, DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
    Select, SelectContent, SelectItem, 
    SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Field, FieldLabel } from "@/components/ui/field";
import { IndikatorFormExtendedSchema, IndikatorFormExtendedValues } from "../schemas";
import { Variabel } from "../types";

type Props = {
    open: boolean;
    defaultValues?: Partial<IndikatorFormExtendedValues>;
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
        control,
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<IndikatorFormExtendedValues>({
        resolver: zodResolver(IndikatorFormExtendedSchema),
        defaultValues: { kode: "", nama: "", variabelId: 0 },
    });

    const watchedVariabelId = useWatch({ control, name: "variabelId" });
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open) {
            reset(defaultValues ?? { kode: "", nama: "", variabelId: 0 });
        } else {
            reset();
        }
    }, [open, defaultValues, reset]);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLButtonElement>) => {
        const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
        if (!isMobile) return;

        const target = e.target;

        if (target instanceof HTMLInputElement && target.type === "number" && target.value === "0") {
            const name = target.name as Path<IndikatorFormExtendedValues>;
            setValue(name, "");
        }

        if (scrollAreaRef.current) {
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
            <DialogContent className="w-[95vw] sm:max-w-md p-0 flex flex-col overflow-hidden top-[45%] sm:top-[50%] transition-all">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col min-h-0">
                    <DialogHeader className="p-4 sm:p-6 border-b bg-white shrink-0 relative z-50">
                        <DialogTitle className="text-base sm:text-lg">
                            {isEditMode ? "Edit Indikator" : "Tambah Indikator"}
                        </DialogTitle>
                        <DialogDescription className="text-xs text-muted-foreground mt-1">
                            {isEditMode ? "Perbarui informasi indikator." : "Lengkapi data indikator kuesioner."}
                        </DialogDescription>
                    </DialogHeader>

                    <div ref={scrollAreaRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 transition-all duration-300">
                        <Field>
                            <FieldLabel className="text-xs font-bold uppercase text-gray-500 tracking-wider">Variabel Induk</FieldLabel>
                            <Select
                                value={watchedVariabelId ? String(watchedVariabelId) : ""}
                                onValueChange={(v) => setValue("variabelId", Number(v), { shouldValidate: true })}
                                disabled={isEditMode}
                            >
                                <SelectTrigger className="h-9 mt-1" onFocus={handleFocus}>
                                    <SelectValue placeholder="Pilih Variabel" />
                                </SelectTrigger>
                                <SelectContent>
                                    {variabelList.map((v) => (
                                        <SelectItem key={v.variabelId} value={String(v.variabelId)}>
                                            [{v.kode}] {v.nama}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.variabelId && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.variabelId.message}</p>}
                        </Field>

                        <Field>
                            <FieldLabel className="text-xs font-bold uppercase text-gray-500 tracking-wider">Kode Indikator</FieldLabel>
                            <Input
                                id="kode"
                                placeholder="Contoh: I1.1"
                                className="h-9 mt-1"
                                {...register("kode")}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                autoComplete="off"
                            />
                            {errors.kode && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.kode.message}</p>}
                        </Field>

                        <Field>
                            <FieldLabel className="text-xs font-bold uppercase text-gray-500 tracking-wider">Nama Indikator</FieldLabel>
                            <Input
                                id="nama"
                                placeholder="Contoh: Pegawai cepat tanggap"
                                className="h-9 mt-1"
                                {...register("nama")}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                autoComplete="off"
                            />
                            {errors.nama && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.nama.message}</p>}
                        </Field>
                    </div>

                    <DialogFooter className="p-4 border-t bg-gray-50 flex flex-row gap-2 shrink-0 z-50">
                        <Button type="button" variant="outline" onClick={onClose} className="flex-1 h-9 text-sm">Batal</Button>
                        <Button type="submit" disabled={isSubmitting} className="flex-1 h-9 text-sm">
                            {isSubmitting ? "..." : (isEditMode ? "Simpan" : "Tambah")}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}