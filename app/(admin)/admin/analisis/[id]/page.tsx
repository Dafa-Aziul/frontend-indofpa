// fileName: app/(admin)/admin/analisis/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useAnalisisDetail } from '@/features/analisis/detail/hooks';
import AnalisisHeaderCards from '@/features/analisis/detail/components/AnalisisHeaderCards';
import AnalisisCharts from '@/features/analisis/detail/components/AnalisisCharts';
import AnalisisPertanyaanList from '@/features/analisis/detail/components/AnalisisPertanyaanList';
import AnalisisSummaryConclusion from '@/features/analisis/detail/components/AnalisisSummaryConclusion';

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Frown, BarChart4, Loader2, Filter } from "lucide-react";
import React, { useState } from 'react';

import { FilterAnalisisDialog } from '@/features/analisis/detail/components/FilterAnalisisDialog';
import { AnalisisFilterTags } from '@/features/analisis/detail/components/AnalisisFilterTags';
import { FilterPayload } from '@/features/analisis/detail/types';


// ======================================================
// Komponen Spinner Sederhana
// ======================================================

// Page Component Utama (Client Component)
export default function AnalisisPage() {

    /* ================= 1. PANGGIL SEMUA HOOKS DI SINI (TOP-LEVEL) ================= */

    const params = useParams();
    const id = params?.id;
    const kuesionerId = Number(id);

    // [1] STATE FILTER BARU
    const [activeFilters, setActiveFilters] = useState<FilterPayload>({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    // [2] GUNAKAN FILTER SEBAGAI DEPENDENCY DI HOOK DATA
    // ✨ PERBAIKAN: Destructure state loading yang baru
    const { data, isError, refetch} = useAnalisisDetail(kuesionerId, activeFilters);

    // [3] HANDLER PENERAPAN FILTER
    const handleApplyFilters = (newFilters: FilterPayload) => {
        setActiveFilters(newFilters); // Memicu refetch otomatis di hook useAnalisisDetail
        setIsModalOpen(false); // Tutup modal
    };

    // [4] HANDLER PENGHAPUSAN CHIP (Filter individual)
    const handleRemoveFilter = (key: keyof FilterPayload, valueToRemove: any) => {

        // Buat salinan filter aktif
        const updatedFilters: FilterPayload = { ...activeFilters };

        // =========================================================================
        // 1. TANGANI PERINTAH HAPUS SELURUH KEY (dari 'Hapus Semua')
        // =========================================================================
        if (valueToRemove === null || valueToRemove === undefined) {
            // Menggunakan '_ignored' sebagai variabel untuk mencegah linting warning
            const { [key]: _ignored, ...rest } = updatedFilters;
            setActiveFilters(rest);
            return;
        }


        // =========================================================================
        // 2. TANGANI HAPUS NILAI TUNGGAL ('X' pada chip)
        // =========================================================================

        const currentFilterValue = updatedFilters[key];

        // Type guard: Hanya proses jika filterValue benar-benar ada
        if (currentFilterValue !== undefined) {

            // Skenario Multi-select: currentFilterValue adalah Array
            if (Array.isArray(currentFilterValue)) {

                // FilterPayload menjamin isinya adalah UsiaKategori[] | TingkatPendidikan[] | Agama[]
                const newArray = currentFilterValue.filter(v => v !== valueToRemove) as typeof currentFilterValue;

                if (newArray.length === 0) {
                    // Jika array menjadi kosong, hapus key-nya
                    const { [key]: _ignored, ...rest } = updatedFilters;
                    setActiveFilters(rest);
                    return;

                } else {
                    // Perbarui array
                    setActiveFilters({
                        ...updatedFilters,
                        [key]: newArray
                    });
                    return;
                }

            }
            // Skenario Single-select: currentFilterValue adalah String/Enum
            else if (currentFilterValue === valueToRemove) {
                // Hapus key karena nilainya dicocokkan
                const { [key]: _ignored, ...rest } = updatedFilters;
                setActiveFilters(rest);
                return;
            }
        }

        // Jika tidak ada perubahan yang terdeteksi, set state dengan updatedFilters
        setActiveFilters(updatedFilters);
    };


    /* ================= 2. CONDITIONAL RETURN (Awal) ================= */

    if (!id || isNaN(kuesionerId) || kuesionerId <= 0) {
        return (
            <div className="p-4 md:p-8">
                <p className="text-muted-foreground font-semibold">
                    ID kuesioner tidak valid atau tidak ditemukan di URL.
                </p>
            </div>
        );
    }

    // ✨ PERBAIKAN: Gunakan isInitialLoading untuk Loading Awal (Spinner Besar)
    if (!data) {
        return (
            <div className="p-4 md:p-8 flex items-center justify-center h-screen-70">
                <Loader2 className="h-12 w-12 animate-spin text-green-600" />
                <p className="ml-4 text-xl font-semibold text-gray-600">Memuat Analisis Awal...</p>
            </div>
        )
    }

    if (isError || !data) {
        return (
            <div className="p-4 md:p-8">
                <Alert variant="destructive">
                    <Frown className="h-4 w-4" />
                    <AlertTitle>Gagal Memuat Analisis</AlertTitle>
                    <AlertDescription>
                        Terjadi kesalahan saat mengambil data analisis kuesioner ID {kuesionerId}.
                        <button onClick={refetch} className="font-semibold text-blue-700 underline ml-2">Coba Muat Ulang</button>
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    const kuesionerTitle = data.kuesioner.judul;

    /* ================= 3. RENDER UTAMA DENGAN OVERLAY ================= */

    return (
        <div key={kuesionerId} className="relative space-y-6 p-4 md:p-8">
            {/* ✨ PERBAIKAN: Gunakan isFetching untuk loading overlay saat filter aktif */}
            {/* Judul Halaman dan Tombol Filter */}
            <header className="mb-6 flex justify-between items-start">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <BarChart4 className="h-7 w-7 text-green-600" />
                        Analisis Kuesioner
                    </h1>
                    <p className="text-xl text-muted-foreground mt-1">{kuesionerTitle}</p>
                </div>
                {/* [5] TOMBOL FILTER BARU */}
                <Button
                    onClick={() => setIsModalOpen(true)}
                    variant="outline"
                    className="flex items-center gap-2"
                >
                    <Filter className="h-4 w-4" />
                    Filter Data
                </Button>
            </header>

            {/* [6] TAMPILAN CHIP FILTER AKTIF */}
            <AnalisisFilterTags
                activeFilters={activeFilters}
                onRemoveFilter={handleRemoveFilter}
            />

            {/* 1. RINGKASAN KPI */}
            <AnalisisHeaderCards data={data} />

            {/* 2. CHARTS DAN RINGKASAN VARIABEL/INDIKATOR */}
            <AnalisisCharts data={data} />

            {/* 3. DETAIL PERTANYAAN */}
            <AnalisisPertanyaanList data={data} />

            <AnalisisSummaryConclusion data={data} />

            {/* [7] KOMPONEN MODAL FILTER */}
            <FilterAnalisisDialog
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                currentFilters={activeFilters}
                onApplyFilters={handleApplyFilters}
            />
        </div>
    );
}