// fileName: src/features/analisis/detail/components/FilterAnalisisDialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect } from 'react';
import { Separator } from "@/components/ui/separator";
import { RefreshCcw } from "lucide-react"; // Import ikon untuk Reset

// Import tipe yang telah diperbaiki dari types.ts
import type { UsiaKategori, JenisKelamin, TingkatPendidikan, Agama, FilterPayload } from '@/features/analisis/detail/types';


// =========================================================================
// 1. DEFINISI ENUM OPTIONS 
// (Tetap sama)
// =========================================================================

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

// =========================================================================
// 3. KOMPONEN UTAMA
// =========================================================================

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

    // Helper untuk memperbarui state secara aman
    const updateTempFilters = <K extends keyof FilterPayload>(
        key: K,
        value: FilterPayload[K]
    ) => {
        setTempFilters(prev => {
            // Jika nilainya kosong, hapus key dari state
            if (
                (Array.isArray(value) && value.length === 0) ||
                (typeof value === 'string' && value.trim() === '')
            ) {
                const { [key]: _ignored, ...rest } = prev;
                return rest;
            }
            return {
                ...prev,
                [key]: value
            };
        });
    };

    useEffect(() => {
        setTempFilters(currentFilters);
    }, [currentFilters]);

    // Handler Multi-select (Checkbox)
    const handleCheckboxChange = (
        key: Extract<keyof FilterPayload, 'usiaKategori' | 'tingkatPendidikan' | 'agama'>,
        value: string,
        checked: boolean
    ) => {
        const currentValues = (tempFilters[key] || []) as string[];

        let newValues: string[];
        if (checked) {
            if (!currentValues.includes(value)) {
                newValues = [...currentValues, value];
            } else {
                newValues = currentValues;
            }
        } else {
            newValues = currentValues.filter(v => v !== value);
        }

        updateTempFilters(key, newValues as FilterPayload[typeof key]);
    };

    // Handler Single-select (Radio)
    const handleValueChange = (
        key: Extract<keyof FilterPayload, 'jenisKelamin'>,
        value: string
    ) => {
        // Jika nilai yang dipilih sama dengan nilai saat ini, set menjadi string kosong untuk menghapus filter.
        const newValue = tempFilters[key] === value ? '' : value;
        updateTempFilters(key, newValue as FilterPayload[typeof key]);
    };

    const handleReset = () => {
        setTempFilters({});
    };

    const handleApply = () => {
        const cleanFilters: FilterPayload = {};

        (Object.keys(tempFilters) as (keyof FilterPayload)[]).forEach(key => {
            const value = tempFilters[key];

            if (Array.isArray(value) && value.length > 0) {
                cleanFilters[key] = value as FilterPayload[typeof key];
            } else if (typeof value === 'string' && value.trim() !== '') {
                cleanFilters[key] = value as FilterPayload[typeof key];
            }
        });

        onApplyFilters(cleanFilters);
        onClose();
    };

    const filterCount = Object.values(tempFilters).filter(v => (Array.isArray(v) && v.length > 0) || (typeof v === 'string' && v.length > 0)).length;

    // Komponen Helper untuk Checkbox Group (Multi-select)
    const CheckboxGroup = ({ title, options, filterKey }: {
        title: string,
        options: { value: string, label: string }[],
        filterKey: keyof FilterPayload
    }) => {
        const multiSelectKey = filterKey as Extract<keyof FilterPayload, 'usiaKategori' | 'tingkatPendidikan' | 'agama'>;

        return (
            <div className="p-4 border bg-gray-50/50 rounded-lg shadow-sm">
                <Label className="text-sm font-bold text-gray-700 block mb-3">{title}</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {options.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                            <Checkbox
                                id={option.value}
                                checked={(tempFilters[filterKey] as string[])?.includes(option.value)}
                                onCheckedChange={(checked) => handleCheckboxChange(
                                    multiSelectKey,
                                    option.value,
                                    !!checked
                                )}
                            />
                            <Label htmlFor={option.value} className="font-normal cursor-pointer text-sm">
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
            <DialogContent className="sm:max-w-[700px] flex flex-col max-h-[90vh]"> {/* Menggunakan flex-col dan max-h */}

                {/* HEADER (TETAP) */}
                <DialogHeader className="pt-6">
                    <DialogTitle>Filter Data Responden ({filterCount} Aktif)</DialogTitle>
                </DialogHeader>

                <Separator className="mb-2" />

                {/* CONTENT (DAPAT DI-SCROLL) */}
                <div className="flex-1 overflow-y-auto px-2 space-y-6 pb-4"> {/* Menambahkan overflow-y-auto dan pb untuk scroll padding */}

                    {/* JENIS KELAMIN (Radio Group - Single Select) */}
                    <div className="p-4 border bg-gray-50/50 rounded-lg shadow-sm">
                        <Label className="text-sm font-bold text-gray-700 block mb-3">Jenis Kelamin</Label>
                        <RadioGroup
                            onValueChange={(val) => handleValueChange('jenisKelamin', val)}
                            value={tempFilters.jenisKelamin as string || ""}
                            className="flex space-x-6 mt-2"
                        >
                            {JENIS_KELAMIN_OPTIONS.map((option) => (
                                <div key={option.value} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option.value} id={`jk-${option.value}`} />
                                    <Label htmlFor={`jk-${option.value}`}>{option.label}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>

                    {/* RENTANG USIA (Multi-select) */}
                    <CheckboxGroup
                        title="Rentang Usia"
                        options={USIA_KATEGORI_OPTIONS as { value: string, label: string }[]}
                        filterKey="usiaKategori"
                    />

                    {/* TINGKAT PENDIDIKAN (Multi-select) */}
                    <CheckboxGroup
                        title="Tingkat Pendidikan"
                        options={TINGKAT_PENDIDIKAN_OPTIONS as { value: string, label: string }[]}
                        filterKey="tingkatPendidikan"
                    />

                    {/* AGAMA (Multi-select) */}
                    <CheckboxGroup
                        title="Agama"
                        options={AGAMA_OPTIONS as { value: string, label: string }[]}
                        filterKey="agama"
                    />

                </div>

                {/* SEPARATOR DAN FOOTER (TETAP) */}
                <Separator className="mt-2" />

                <DialogFooter className="py-4 flex flex-row justify-between items-center px-4 sm:px-6">
                    {/* Tombol Reset yang diperbaiki */}
                    <Button
                        variant="ghost"
                        onClick={handleReset}
                        className="text-red-500 hover:text-red-700 p-0 h-auto"
                    >
                        <RefreshCcw className="h-4 w-4 mr-2" />
                        Reset Filter
                    </Button>

                    {/* Grup Tombol Aksi */}
                    <div className="space-x-2">
                        <Button variant="outline" onClick={onClose}>
                            Batalkan
                        </Button>
                        <Button onClick={handleApply}>
                            Terapkan Filter
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};