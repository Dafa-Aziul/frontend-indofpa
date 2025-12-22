// fileName: src/features/analisis/detail/components/FilterAnalisisDialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect } from 'react';
import { Separator } from "@/components/ui/separator";
import { RefreshCcw } from "lucide-react";

import type { UsiaKategori, JenisKelamin, TingkatPendidikan, Agama, FilterPayload } from '@/features/analisis/detail/types';

const USIA_KATEGORI_OPTIONS: { value: UsiaKategori, label: string }[] = [
    { value: "USIA_18_24", label: "18 - 24 Tahun" },
    { value: "USIA_25_34", label: "25 - 34 Tahun" },
    { value: "USIA_35_44", label: "35 - 44 Tahun" },
    { value: "USIA_45_54", label: "45 - 54 Tahun" },
    { value: "USIA_55_64", label: "55 - 64 Tahun" },
    { value: "USIA_65_PLUS", label: "65+ Tahun" },
];

const JENIS_KELAMIN_OPTIONS: { value: JenisKelamin, label: string }[] = [
    { value: "L", label: "Laki-laki" },
    { value: "P", label: "Perempuan" },
];

const TINGKAT_PENDIDIKAN_OPTIONS: { value: TingkatPendidikan, label: string }[] = [
    { value: "TidakTamatSD", label: "Tidak Tamat SD" },
    { value: "SD", label: "SD / Sederajat" },
    { value: "SMP", label: "SMP / Sederajat" },
    { value: "SMA", label: "SMA / Sederajat" },
    { value: "Diploma", label: "Diploma (D1-D4)" },
    { value: "S1", label: "Sarjana (S1)" },
    { value: "S2", label: "Magister (S2)" },
    { value: "S3", label: "Doktor (S3)" },
];

const AGAMA_OPTIONS: { value: Agama, label: string }[] = [
    { value: "Islam", label: "Islam" },
    { value: "KristenProtestan", label: "Kristen Protestan" },
    { value: "Katolik", label: "Katolik" },
    { value: "Hindu", label: "Hindu" },
    { value: "Buddha", label: "Buddha" },
    { value: "Konghucu", label: "Konghucu" },
    { value: "Kepercayaan", label: "Kepercayaan" },
];

interface FilterAnalisisDialogProps {
    isOpen: boolean;
    onClose: () => void;
    currentFilters: FilterPayload;
    onApplyFilters: (filters: FilterPayload) => void;
}

export const FilterAnalisisDialog: React.FC<FilterAnalisisDialogProps> = ({
    isOpen,
    onClose,
    currentFilters,
    onApplyFilters
}) => {
    const [tempFilters, setTempFilters] = useState<FilterPayload>(currentFilters);

    const updateTempFilters = <K extends keyof FilterPayload>(
        key: K,
        value: FilterPayload[K]
    ) => {
        setTempFilters(prev => {
            if (
                (Array.isArray(value) && value.length === 0) ||
                (typeof value === 'string' && value.trim() === '')
            ) {
                const { [key]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [key]: value };
        });
    };

    useEffect(() => {
        if (isOpen) setTempFilters(currentFilters);
    }, [isOpen, currentFilters]);

    const handleCheckboxChange = (
        key: Extract<keyof FilterPayload, 'usiaKategori' | 'tingkatPendidikan' | 'agama'>,
        value: string,
        checked: boolean
    ) => {
        const currentValues = (tempFilters[key] || []) as string[];
        const newValues = checked
            ? [...currentValues, value]
            : currentValues.filter(v => v !== value);

        updateTempFilters(key, newValues as FilterPayload[typeof key]);
    };

    const handleValueChange = (
        key: Extract<keyof FilterPayload, 'jenisKelamin'>,
        value: string
    ) => {
        const newValue = tempFilters[key] === value ? '' : value;
        updateTempFilters(key, newValue as FilterPayload[typeof key]);
    };

    const handleReset = () => setTempFilters({});

    const handleApply = () => {
        onApplyFilters(tempFilters);
        onClose();
    };

    const filterCount = Object.values(tempFilters).filter(v => (Array.isArray(v) && v.length > 0) || (typeof v === 'string' && v.length > 0)).length;

    const CheckboxGroup = ({ title, options, filterKey }: {
        title: string,
        options: { value: string, label: string }[],
        filterKey: keyof FilterPayload
    }) => {
        const multiSelectKey = filterKey as Extract<keyof FilterPayload, 'usiaKategori' | 'tingkatPendidikan' | 'agama'>;
        return (
            <div className="space-y-3">
                <Label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">
                    {title}
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4 border border-slate-100 bg-slate-50/50 rounded-xl">
                    {options.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                            <Checkbox
                                id={option.value}
                                checked={(tempFilters[filterKey] as string[])?.includes(option.value)}
                                onCheckedChange={(checked) => handleCheckboxChange(multiSelectKey, option.value, !!checked)}
                            />
                            <Label htmlFor={option.value} className="text-sm font-medium cursor-pointer leading-none">
                                {option.label}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[700px] p-0 flex flex-col max-h-[90vh] overflow-hidden border-none shadow-2xl">

                {/* HEADER */}
                <DialogHeader className="p-6 pb-2">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl font-bold">
                            Filter Data Responden
                        </DialogTitle>
                        {filterCount > 0 && (
                            <span className="bg-primary/10 text-primary text-[10px] px-2 py-1 rounded-full font-bold">
                                {filterCount} AKTIF
                            </span>
                        )}
                    </div>
                </DialogHeader>

                <Separator />

                {/* SCROLLABLE CONTENT */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">

                    {/* JENIS KELAMIN */}
                    <div className="space-y-3">
                        <Label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">
                            Jenis Kelamin
                        </Label>
                        <div className="p-4 border border-slate-100 bg-slate-50/50 rounded-xl">
                            <RadioGroup
                                onValueChange={(val) => handleValueChange('jenisKelamin', val)}
                                value={tempFilters.jenisKelamin as string || ""}
                                className="flex flex-wrap gap-6"
                            >
                                {JENIS_KELAMIN_OPTIONS.map((option) => (
                                    <div key={option.value} className="flex items-center space-x-2">
                                        <RadioGroupItem value={option.value} id={`jk-${option.value}`} />
                                        <Label htmlFor={`jk-${option.value}`} className="text-sm font-medium cursor-pointer">
                                            {option.label}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    </div>

                    <CheckboxGroup title="Rentang Usia" options={USIA_KATEGORI_OPTIONS} filterKey="usiaKategori" />
                    <CheckboxGroup title="Tingkat Pendidikan" options={TINGKAT_PENDIDIKAN_OPTIONS} filterKey="tingkatPendidikan" />
                    <CheckboxGroup title="Agama" options={AGAMA_OPTIONS} filterKey="agama" />
                </div>

                <Separator />

                {/* FOOTER */}
                <DialogFooter className="p-4 sm:p-6 flex flex-row items-center justify-between bg-slate-50/50">
                    <Button
                        variant="ghost"
                        onClick={handleReset}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 font-semibold text-xs"
                    >
                        <RefreshCcw className="h-3.5 w-3.5 mr-2" />
                        Reset Filter
                    </Button>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" onClick={onClose} className="h-9 text-xs font-semibold">
                            Batalkan
                        </Button>
                        <Button onClick={handleApply} className="h-9 text-xs font-semibold px-6">
                            Terapkan Filter
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};