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
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldDescription,
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

    /* ===== RESET SAAT OPEN ===== */
    React.useEffect(() => {
        if (open) {
            reset(
                defaultValues ?? {
                    tanggalMulai: "",
                    tanggalSelesai: "",
                }
            );
        } else {
            setOpenMulai(false);
            setOpenSelesai(false);
        }
    }, [open, defaultValues, reset]);

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent className="max-w-lg">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>
                            {isEdit
                                ? "Update Distribusi Kuesioner"
                                : "Distribusi Kuesioner"}
                        </DialogTitle>
                    </DialogHeader>

                    <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {/* ================= TANGGAL MULAI ================= */}
                        <Field>
                            <FieldLabel>Tanggal Mulai</FieldLabel>

                            <Controller
                                name="tanggalMulai"
                                control={control}
                                render={({ field }) => (
                                    <Popover
                                        open={openMulai}
                                        onOpenChange={setOpenMulai}
                                    >
                                        <PopoverTrigger asChild>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !field.value &&
                                                        "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value
                                                    ? format(
                                                          new Date(
                                                              `${field.value}T00:00:00`
                                                          ),
                                                          "dd/MM/yyyy"
                                                      )
                                                    : "dd/mm/yyyy"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={
                                                    field.value
                                                        ? new Date(
                                                              `${field.value}T00:00:00`
                                                          )
                                                        : undefined
                                                }
                                                onSelect={(date) => {
                                                    field.onChange(
                                                        date
                                                            ? format(
                                                                  date,
                                                                  "yyyy-MM-dd"
                                                              )
                                                            : ""
                                                    );
                                                    setOpenMulai(false);
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                )}
                            />

                            <FieldDescription className="text-destructive">
                                {errors.tanggalMulai?.message}
                            </FieldDescription>
                        </Field>

                        {/* ================= TANGGAL SELESAI ================= */}
                        <Field>
                            <FieldLabel>Tanggal Selesai</FieldLabel>

                            <Controller
                                name="tanggalSelesai"
                                control={control}
                                render={({ field }) => (
                                    <Popover
                                        open={openSelesai}
                                        onOpenChange={setOpenSelesai}
                                    >
                                        <PopoverTrigger asChild>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !field.value &&
                                                        "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value
                                                    ? format(
                                                          new Date(
                                                              `${field.value}T00:00:00`
                                                          ),
                                                          "dd/MM/yyyy"
                                                      )
                                                    : "dd/mm/yyyy"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={
                                                    field.value
                                                        ? new Date(
                                                              `${field.value}T00:00:00`
                                                          )
                                                        : undefined
                                                }
                                                onSelect={(date) => {
                                                    field.onChange(
                                                        date
                                                            ? format(
                                                                  date,
                                                                  "yyyy-MM-dd"
                                                              )
                                                            : ""
                                                    );
                                                    setOpenSelesai(false);
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                )}
                            />

                            <FieldDescription className="text-destructive">
                                {errors.tanggalSelesai?.message}
                            </FieldDescription>
                        </Field>

                        <DialogFooter className="col-span-full pt-6">
                            <Button
                                variant="outline"
                                type="button"
                                onClick={onClose}
                            >
                                Batal
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isEdit ? "Update" : "Simpan"}
                            </Button>
                        </DialogFooter>
                    </FieldGroup>
                </form>
            </DialogContent>
        </Dialog>
    );
}
