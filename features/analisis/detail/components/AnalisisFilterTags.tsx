// fileName: src/features/analisis/detail/components/AnalisisFilterTags.tsx
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Filter } from "lucide-react";

// --- PENTING: ASUMSI TIPE ENUM ---
// Anda harus mengimpor tipe enum yang sesuai
type UsiaKategori = "USIA_18_24" | "USIA_25_34" | "USIA_35_44" | "USIA_45_54" | "USIA_55_64" | "USIA_65_PLUS";
type JenisKelamin = "L" | "P";
type TingkatPendidikan = "TidakTamatSD" | "SD" | "SMP" | "SMA" | "Diploma" | "S1" | "S2" | "S3";
type Agama = "Islam" | "KristenProtestan" | "Katolik" | "Hindu" | "Buddha" | "Konghucu" | "Kepercayaan";

interface FilterPayload {
    usiaKategori?: UsiaKategori[];
    tingkatPendidikan?: TingkatPendidikan[];
    agama?: Agama[];
    jenisKelamin?: JenisKelamin;
}

interface AnalisisFilterTagsProps {
    activeFilters: FilterPayload;
    onRemoveFilter: (key: keyof FilterPayload, valueToRemove: any) => void;
}

// --- FUNGSI HELPER: MENGUBAH VALUE ENUM MENJADI LABEL YANG MUDAH DIBACA ---

const ENUM_LABEL_MAP: Record<keyof FilterPayload, { [key: string]: string }> = {
    // Label untuk UsiaKategori (mengambil nilai dari @map)
    usiaKategori: {
        "USIA_18_24": "18-24", "USIA_25_34": "25-34", "USIA_35_44": "35-44",
        "USIA_45_54": "45-54", "USIA_55_64": "55-64", "USIA_65_PLUS": "65+"
    },
    // Label untuk JenisKelamin
    jenisKelamin: { "L": "Laki-laki", "P": "Perempuan" },
    // Label untuk TingkatPendidikan
    tingkatPendidikan: {
        "TidakTamatSD": "Tidak tamat SD", "SD": "SD", "SMP": "SMP", "SMA": "SMA",
        "Diploma": "Diploma", "S1": "S1", "S2": "S2", "S3": "S3"
    },
    // Label untuk Agama
    agama: {
        "Islam": "Islam", "KristenProtestan": "Kristen Protestan", "Katolik": "Katolik",
        "Hindu": "Hindu", "Buddha": "Buddha", "Konghucu": "Konghucu", "Kepercayaan": "Kepercayaan"
    },
    // Jika ada filter lain, tambahkan di sini
};

const FILTER_DISPLAY_NAMES: { [key in keyof FilterPayload]: string } = {
    usiaKategori: "Usia",
    jenisKelamin: "JK",
    tingkatPendidikan: "Pendidikan",
    agama: "Agama",
};


export const AnalisisFilterTags: React.FC<AnalisisFilterTagsProps> = ({ activeFilters, onRemoveFilter }) => {

    // Konversi objek filters menjadi array of tags untuk iterasi
    const tags = React.useMemo(() => {
        const tagList: Array<{ key: keyof FilterPayload; value: any; label: string; displayValue: string }> = [];

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
                    label: `${displayKey}:`, // Label kategori (e.g., "Usia:")
                    displayValue: displayValue // Nilai (e.g., "18-24")
                });
            });
        });

        return tagList;
    }, [activeFilters]);

    if (tags.length === 0) return null;

    // Handler untuk menghapus semua filter
    const handleClearAll = () => {
        // Panggil onRemoveFilter untuk setiap key filter yang ada
        (Object.keys(activeFilters) as (keyof FilterPayload)[]).forEach(key => {
            // Mengirim null atau undefined ke onRemoveFilter di parent akan menghapus key tersebut
            onRemoveFilter(key, null);
        });
    };

    return (
        <div className="flex flex-wrap items-center gap-2 border-t pt-4 mt-6">
            <Filter className="h-4 w-4 text-gray-500" />

            <span className="text-sm font-semibold text-gray-700 mr-2">
                Filter Aktif ({tags.length}):
            </span>

            {/* Loop untuk menampilkan setiap chip */}
            {tags.map((tag, index) => (
                <Badge
                    key={`${tag.key}-${tag.value}-${index}`}
                    variant="default"
                    className="flex items-center space-x-1 pr-1 bg-blue-500 text-white"
                >
                    {/* Tampilkan Label Kategori (e.g., Usia:) */}
                    <span className="font-light opacity-80">{tag.label}</span>
                    {/* Tampilkan Nilai Filter (e.g., 18-24) */}
                    <span className="font-medium">{tag.displayValue}</span>

                    {/* Tombol Hapus */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 rounded-full p-0 ml-1 hover:bg-blue-600/50"
                        onClick={() => onRemoveFilter(tag.key, tag.value)}
                    >
                        <X className="h-3 w-3 text-white" />
                    </Button>
                </Badge>
            ))}

            {/* Tombol Hapus Semua */}
            <Button
                variant="link"
                size="sm"
                className="text-sm text-red-600 ml-2 h-auto p-0"
                onClick={handleClearAll}
            >
                Hapus Semua
            </Button>
        </div>
    );
};