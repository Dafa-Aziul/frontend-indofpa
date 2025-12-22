"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Field,
    FieldLabel,
} from "@/components/ui/field";

import {
    kuesionerDistribusiSchema,
    KuesionerDistribusiValues,
} from "@/features/kuesioner/list/schemas";

type Props = {
    open: boolean;
    defaultValues?: KuesionerDistribusiValues | null;
    onClose: () => void;
    onSubmit: (body: KuesionerDistribusiValues) => void;
};

export default function KuesionerShareDialog({
    open,
    defaultValues,
    onClose,
    onSubmit,
}: Props) {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<KuesionerDistribusiValues>({
        resolver: zodResolver(kuesionerDistribusiSchema),
        defaultValues: {
            tanggalMulai: "",
            tanggalSelesai: "",
        },
    });

    const [openMulai, setOpenMulai] = React.useState(false);
    const [openSelesai, setOpenSelesai] = React.useState(false);

    const isEdit = !!defaultValues;

    React.useEffect(() => {
        if (open) {
            reset(defaultValues ?? {
                tanggalMulai: "",
                tanggalSelesai: "",
            });
        } else {
            setOpenMulai(false);
            setOpenSelesai(false);
        }
    }, [open, defaultValues, reset]);

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent className="w-[95vw] sm:max-w-lg p-0 flex flex-col overflow-hidden max-h-[85vh]">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col min-h-0">
                    
                    <DialogHeader className="p-4 sm:p-5 border-b bg-white shrink-0">
                        <DialogTitle className="text-base sm:text-lg">
                            {isEdit ? "Update Masa Aktif" : "Atur Masa Aktif"}
                        </DialogTitle>
                        <DialogDescription className="text-xs">
                            Kuesioner hanya dapat diakses pada rentang waktu berikut.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                        {/* GRID 2 KOLOM: Bersebelahan baik di mobile maupun desktop */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            
                            {/* Tanggal Mulai */}
                            <Field>
                                <FieldLabel className="text-[10px] font-bold uppercase text-gray-500">
                                    Mulai
                                </FieldLabel>
                                <Controller
                                    name="tanggalMulai"
                                    control={control}
                                    render={({ field }) => (
                                        <Popover open={openMulai} onOpenChange={setOpenMulai}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal h-9 mt-1 px-2 text-xs sm:text-sm",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-1 h-3.3 w-3.3 sm:mr-2 sm:h-4 sm:w-4 shrink-0" />
                                                    <span className="truncate">
                                                        {field.value ? format(new Date(`${field.value}T00:00:00`), "dd/MM/yy") : "Mulai"}
                                                    </span>
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value ? new Date(`${field.value}T00:00:00`) : undefined}
                                                    onSelect={(date) => {
                                                        field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                                                        setOpenMulai(false);
                                                    }}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    )}
                                />
                                {errors.tanggalMulai && (
                                    <p className="text-[10px] text-destructive mt-1 leading-tight">{errors.tanggalMulai.message}</p>
                                )}
                            </Field>

                            {/* Tanggal Selesai */}
                            <Field>
                                <FieldLabel className="text-[10px] font-bold uppercase text-gray-500">
                                    Selesai
                                </FieldLabel>
                                <Controller
                                    name="tanggalSelesai"
                                    control={control}
                                    render={({ field }) => (
                                        <Popover open={openSelesai} onOpenChange={setOpenSelesai}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal h-9 mt-1 px-2 text-xs sm:text-sm",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-1 h-3.3 w-3.3 sm:mr-2 sm:h-4 sm:w-4 shrink-0" />
                                                    <span className="truncate">
                                                        {field.value ? format(new Date(`${field.value}T00:00:00`), "dd/MM/yy") : "Selesai"}
                                                    </span>
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="end">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value ? new Date(`${field.value}T00:00:00`) : undefined}
                                                    onSelect={(date) => {
                                                        field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                                                        setOpenSelesai(false);
                                                    }}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    )}
                                />
                                {errors.tanggalSelesai && (
                                    <p className="text-[10px] text-destructive mt-1 leading-tight">{errors.tanggalSelesai.message}</p>
                                )}
                            </Field>

                        </div>
                    </div>

                    <DialogFooter className="p-4 border-t bg-gray-50 flex flex-row gap-2 shrink-0">
                        <Button variant="ghost" type="button" onClick={onClose} className="flex-1 h-9 text-sm">
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