// src/features/analisis/detail/components/ConfigInterpretasiModal.tsx
"use client";

import { useEffect, useRef } from "react";
import { useForm, useFieldArray, Path, PathValue } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info, Plus, Trash2, Save, RotateCcw, X, ArrowRight } from "lucide-react"; // Tambah ArrowRight
import { toast } from "sonner";

import { FieldLabel } from "@/components/ui/field";
import { ConfigInterpretasiValues, ConfigInterpretasiSchema } from "../schemas";
import { updateAnalisisConfig } from "../services";
import { InterpretasiRange } from "../types";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    kuesionerId: number;
    initialData?: InterpretasiRange[];
    onSuccess: () => void;
};

const DEFAULT_SCALES = [
    { min: 0, max: 20, label: "Sangat Rendah" },
    { min: 21, max: 40, label: "Rendah" },
    { min: 41, max: 60, label: "Cukup" },
    { min: 61, max: 80, label: "Tinggi" },
    { min: 81, max: 100, label: "Sangat Tinggi" },
];


export function ConfigInterpretasiModal({ isOpen, onClose, kuesionerId, initialData, onSuccess }: Props) {
    const {
        control, register, handleSubmit, reset, setValue,
        formState: { isSubmitting },
    } = useForm<ConfigInterpretasiValues>({
        resolver: zodResolver(ConfigInterpretasiSchema),
        defaultValues: {
            interpretasi: DEFAULT_SCALES,
        },
    });

    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const { fields, append, remove } = useFieldArray({
        control,
        name: "interpretasi",
    });

    useEffect(() => {
        if (isOpen) {
            if (initialData && initialData.length > 0) {
                reset({ interpretasi: initialData });
            } else {
                reset({ interpretasi: DEFAULT_SCALES });
            }
        }
    }, [isOpen, initialData, reset]);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const target = e.target;
        const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
        if (target.type === "number" && target.value === "0") {
            const name = target.name as Path<ConfigInterpretasiValues>;
            setValue(
                name,
                "" as PathValue<ConfigInterpretasiValues, Path<ConfigInterpretasiValues>>
            );
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

    const onFormSubmit = async (values: ConfigInterpretasiValues) => {
        try {
            await updateAnalisisConfig(kuesionerId, values);
            toast.success("Konfigurasi interpretasi berhasil disimpan");
            onSuccess();
            onClose();
        } catch (err: unknown) {
            toast.error(
                err instanceof Error ? err.message : "Gagal menyimpan kategori"
            );
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
            <DialogContent
                className="w-[95vw] sm:max-w-xl max-h-[90vh] p-0 flex flex-col overflow-hidden top-[45%] sm:top-[50%] transition-all border-none shadow-2xl"
            >
                <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col flex-1 min-h-0 overflow-hidden">

                    <DialogHeader className="p-4 sm:p-5 border-b bg-white shrink-0 relative z-50">
                        <Button
                            type="button"
                            onClick={onClose}
                            className="absolute right-4 top-4 p-1 rounded-md opacity-70 hover:opacity-100 transition-opacity focus:outline-none"
                        >
                            <X className="h-4 w-4 text-gray-500" />
                        </Button>

                        <div className="flex items-center justify-between mr-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-50 rounded-lg">
                                    <Info className="h-5 w-5 text-emerald-600" />
                                </div>
                                <div>
                                    <DialogTitle className="text-base sm:text-lg">Update Interpretasi</DialogTitle>
                                    <DialogDescription className="text-xs text-muted-foreground mt-1">
                                        Sesuaikan rentang skor (%) aplikasi Anda.
                                    </DialogDescription>
                                </div>
                            </div>
                        </div>
                    </DialogHeader>

                    <div ref={scrollAreaRef} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 transition-all duration-300">
                        <div className="flex justify-between items-center">
                            <FieldLabel className="text-[10px] font-bold uppercase text-emerald-600">
                                Definisi Rentang Skor (%)
                            </FieldLabel>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => reset({ interpretasi: DEFAULT_SCALES })}
                                className="h-7 text-[10px] text-emerald-600 hover:bg-emerald-50 font-bold px-2"
                            >
                                <RotateCcw className="h-3 w-3 mr-1" /> Reset Default
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-200">
                                    <div className="w-8 h-9 flex items-center justify-center text-[10px] bg-gray-50 border border-gray-100 text-gray-400 font-bold rounded-md shrink-0">
                                        {index + 1}
                                    </div>

                                    {/* Rentang Min - Max dengan Ikon */}
                                    <div className="flex items-center gap-1.5 shrink-0 bg-gray-50/50 p-1 rounded-lg border border-gray-100">
                                        <Input
                                            type="number"
                                            {...register(`interpretasi.${index}.min` as const, { valueAsNumber: true })}
                                            placeholder="Min"
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            className="h-8 w-14 text-center text-xs focus-visible:ring-emerald-500 bg-white"
                                        />
                                        <ArrowRight className="h-3 w-3 text-emerald-400" />
                                        <Input
                                            type="number"
                                            {...register(`interpretasi.${index}.max` as const, { valueAsNumber: true })}
                                            placeholder="Max"
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            className="h-8 w-14 text-center text-xs focus-visible:ring-emerald-500 bg-white"
                                        />
                                    </div>

                                    <Input
                                        {...register(`interpretasi.${index}.label` as const)}
                                        placeholder="Label (Contoh: Tinggi)"
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        className="h-9 text-xs flex-1 bg-emerald-50/30 border-emerald-100 focus-visible:ring-emerald-500"
                                    />

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => remove(index)}
                                        disabled={fields.length <= 1}
                                        className="h-9 w-9 p-0 text-red-500 hover:bg-red-50 shrink-0"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => append({ min: 0, max: 0, label: "" })}
                            className="w-full h-9 text-xs border-dashed mt-2 border-2 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
                        >
                            <Plus className="mr-2 h-4 w-4" /> Tambah Rentang
                        </Button>
                    </div>

                    <DialogFooter className="p-4 border-t bg-gray-50 flex flex-row gap-3 shrink-0 z-50">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="flex-1 h-10 text-sm font-semibold border-gray-200 text-gray-600 hover:bg-white"
                        >
                            Batalkan
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-2 h-10 text-sm font-bold bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100 shadow-lg transition-all active:scale-95 text-white"
                        >
                            {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
                            {!isSubmitting && <Save className="ml-2 h-4 w-4" />}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}