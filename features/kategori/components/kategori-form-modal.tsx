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
    FieldDescription,
} from "@/components/ui/field";

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

    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open) {
            reset(defaultValues ?? { nama: "" });
        }
    }, [open, defaultValues, reset]);

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
        if (isMobile && scrollAreaRef.current) {
            scrollAreaRef.current.style.paddingBottom = "0px";
        }
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <DialogContent className="w-[95vw] sm:max-w-[425px] p-0 flex flex-col overflow-hidden max-h-[85vh] top-[45%] sm:top-[50%] transition-all">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col min-h-0">
                    
                    <DialogHeader className="p-4 sm:p-6 border-b bg-white shrink-0 relative z-50">
                        <DialogTitle className="text-base sm:text-lg">
                            {defaultValues ? "Edit Kategori" : "Tambah Kategori"}
                        </DialogTitle>
                        <DialogDescription className="text-xs">
                            {defaultValues
                                ? "Perbarui nama kategori yang dipilih."
                                : "Tambahkan kategori baru ke dalam sistem."}
                        </DialogDescription>
                    </DialogHeader>

                    {/* Area Konten Scrollable */}
                    <div 
                        ref={scrollAreaRef}
                        className="flex-1 overflow-y-auto p-4 sm:p-6 transition-all duration-300"
                    >
                        <Field>
                            <FieldLabel className="text-xs font-bold uppercase text-gray-500 tracking-wider">
                                Nama Kategori
                            </FieldLabel>
                            <Input
                                id="nama"
                                placeholder="Masukkan nama kategori"
                                className="h-10 mt-1"
                                {...register("nama")}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                autoComplete="off"
                            />

                            {errors.nama ? (
                                <p className="text-red-500 text-[10px] mt-1 font-medium">
                                    {errors.nama.message}
                                </p>
                            ) : (
                                <FieldDescription className="text-[10px] mt-1">
                                    Gunakan nama yang mudah dikenali.
                                </FieldDescription>
                            )}
                        </Field>
                    </div>

                    <DialogFooter className="p-4 border-t bg-gray-50 flex flex-row gap-2 shrink-0 z-50">
                        <Button
                            type="button"
                            variant="outline"
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