"use client";

import { useEffect, useRef } from "react";
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
    FieldLabel,
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

    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open) {
            reset(defaultValues ?? {
                kode: "",
                nama: "",
                deskripsi: "",
            });
        } else {
            reset();
        }
    }, [open, defaultValues, reset]);

    // ✅ LOGIKA KHUSUS MOBILE: Mencegah input tertutup keyboard
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const target = e.target;
        const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

        if (isMobile && scrollAreaRef.current) {
            // Beri ruang di bawah agar input bisa di-scroll ke atas keyboard
            scrollAreaRef.current.style.paddingBottom = "250px";
            
            setTimeout(() => {
                target.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 300);
        }
    };

    const handleBlur = () => {
        const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
        
        // Kembalikan padding hanya jika di mode mobile
        if (isMobile && scrollAreaRef.current) {
            scrollAreaRef.current.style.paddingBottom = "0px";
        }
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <DialogContent className="w-[95vw] sm:max-w-md p-0 flex flex-col overflow-hidden max-h-[90vh] top-[45%] sm:top-[50%] transition-all">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col min-h-0">
                    
                    <DialogHeader className="p-4 sm:p-6 border-b bg-white shrink-0 relative z-50">
                        <DialogTitle className="text-base sm:text-lg">
                            {defaultValues ? "Edit Variabel" : "Tambah Variabel"}
                        </DialogTitle>
                        <DialogDescription className="text-xs">
                            {defaultValues
                                ? "Perbarui informasi variabel kuesioner."
                                : "Lengkapi data variabel untuk kuesioner baru."}
                        </DialogDescription>
                    </DialogHeader>

                    {/* Area Konten Scrollable */}
                    <div 
                        ref={scrollAreaRef}
                        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 transition-all duration-300"
                    >
                        <div className="grid grid-cols-1 gap-4">
                            <Field>
                                <FieldLabel className="text-xs font-bold uppercase text-gray-500 tracking-wider">
                                    Kode Variabel
                                </FieldLabel>
                                <Input
                                    id="kode"
                                    placeholder="Contoh: V1"
                                    className="h-10 mt-1"
                                    {...register("kode")}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    autoComplete="off"
                                />
                                {errors.kode && (
                                    <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.kode.message}</p>
                                )}
                            </Field>

                            <Field>
                                <FieldLabel className="text-xs font-bold uppercase text-gray-500 tracking-wider">
                                    Nama Variabel
                                </FieldLabel>
                                <Input
                                    id="nama"
                                    placeholder="Contoh: Kualitas Pelayanan"
                                    className="h-10 mt-1"
                                    {...register("nama")}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    autoComplete="off"
                                />
                                {errors.nama && (
                                    <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.nama.message}</p>
                                )}
                            </Field>

                            <Field>
                                <FieldLabel className="text-xs font-bold uppercase text-gray-500 tracking-wider">
                                    Deskripsi
                                </FieldLabel>
                                <Input
                                    id="deskripsi"
                                    placeholder="Deskripsi singkat variabel"
                                    className="h-10 mt-1"
                                    {...register("deskripsi")}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    autoComplete="off"
                                />
                                {errors.deskripsi && (
                                    <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.deskripsi.message}</p>
                                )}
                            </Field>
                        </div>
                    </div>

                    <DialogFooter className="p-4 border-t bg-gray-50 flex flex-row gap-2 shrink-0 z-50">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onClose}
                            className="flex-1 h-10 text-sm"
                        >
                            Batal
                        </Button>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 h-10 text-sm"
                        >
                            {isSubmitting ? "..." : (defaultValues ? "Simpan" : "Tambah")}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}