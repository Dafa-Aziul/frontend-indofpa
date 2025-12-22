// fileName: src/features/analisis/detail/components/AnalisisFilterTags.tsx
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Filter, Trash2 } from "lucide-react";
import {
    FilterPayload, FilterTag
} from '../types'; // Pastikan path import benar

interface AnalisisFilterTagsProps {
    activeFilters: FilterPayload;
    onRemoveFilter: (
        key: keyof FilterPayload,
        valueToRemove: string | null
    ) => void;

}

const ENUM_LABEL_MAP: Record<keyof FilterPayload, { [key: string]: string }> = {
    usiaKategori: {
        "USIA_18_24": "18-24", "USIA_25_34": "25-34", "USIA_35_44": "35-44",
        "USIA_45_54": "45-54", "USIA_55_64": "55-64", "USIA_65_PLUS": "65+"
    },
    jenisKelamin: { "L": "Laki-laki", "P": "Perempuan" },
    tingkatPendidikan: {
        "TidakTamatSD": "Tidak tamat SD", "SD": "SD", "SMP": "SMP", "SMA": "SMA",
        "Diploma": "Diploma", "S1": "S1", "S2": "S2", "S3": "S3"
    },
    agama: {
        "Islam": "Islam", "KristenProtestan": "Kristen Protestan", "Katolik": "Katolik",
        "Hindu": "Hindu", "Buddha": "Buddha", "Konghucu": "Konghucu", "Kepercayaan": "Kepercayaan"
    },
};

const FILTER_DISPLAY_NAMES: { [key in keyof FilterPayload]: string } = {
    usiaKategori: "Usia",
    jenisKelamin: "JK",
    tingkatPendidikan: "Pendidikan",
    agama: "Agama",
};

export const AnalisisFilterTags: React.FC<AnalisisFilterTagsProps> = ({ activeFilters, onRemoveFilter }) => {
    const tags = React.useMemo(() => {
        const tagList: FilterTag[] = [];

        (Object.keys(activeFilters) as (keyof FilterPayload)[]).forEach(key => {
            const filterValue = activeFilters[key];
            if (!filterValue) return;

            const values = Array.isArray(filterValue) ? filterValue : [filterValue];
            values.forEach(val => {
                const displayKey = FILTER_DISPLAY_NAMES[key] || key;
                const displayValue = ENUM_LABEL_MAP[key]?.[val as string] || val;

                tagList.push({
                    key: key,
                    value: val,
                    label: displayKey,
                    displayValue: displayValue
                });
            });
        });

        return tagList;
    }, [activeFilters]);

    if (tags.length === 0) return null;

    const handleClearAll = () => {
        (Object.keys(activeFilters) as (keyof FilterPayload)[]).forEach(key => {
            onRemoveFilter(key, null);
        });
    };

    return (
        <div className="space-y-3 border-t pt-4 mt-6 animate-in fade-in duration-300">
            {/* Header: Info & Tombol Hapus Semua */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Filter className="h-3.5 w-3.5 text-slate-500" />
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Filter Aktif ({tags.length})
                    </span>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs text-red-500 hover:text-red-600 hover:bg-red-50 gap-1.5 pr-0 sm:pr-2"
                    onClick={handleClearAll}
                >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Hapus Semua</span>
                    <span className="sm:hidden">Reset</span>
                </Button>
            </div>

            {/* Container Chip: Flex-wrap agar ramah mobile */}
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <Badge
                        key={`${tag.key}-${tag.value}-${index}`}
                        variant="secondary"
                        className="pl-2.5 pr-1 py-1 h-8 flex items-center gap-1.5 border-none bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                    >
                        <span className="text-[10px] font-semibold text-slate-400 uppercase">
                            {tag.label}:
                        </span>
                        <span className="text-xs font-bold whitespace-nowrap">
                            {tag.displayValue}
                        </span>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 rounded-full hover:bg-slate-300 transition-colors"
                            onClick={() => onRemoveFilter(tag.key, tag.value)}
                        >
                            <X className="h-3 w-3 text-slate-500" />
                            <span className="sr-only">Hapus {tag.displayValue}</span>
                        </Button>
                    </Badge>
                ))}
            </div>
        </div>
    );
};