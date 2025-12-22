// fileName: src/app/analisis/[id]/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from "next/navigation";
import { useAnalisisDetail } from '@/features/analisis/detail/hooks';

// Dashboard Components
import AnalisisHeaderCards from '@/features/analisis/detail/components/AnalisisHeaderCards';
import AnalisisCharts from '@/features/analisis/detail/components/AnalisisCharts';
import AnalisisPertanyaanList from '@/features/analisis/detail/components/AnalisisPertanyaanList';
import AnalisisSummaryConclusion from '@/features/analisis/detail/components/AnalisisSummaryConclusion';
import { AnalysisLegend } from '@/features/analisis/detail/components/AnalysisLegend';

// Filter Components
import { FilterAnalisisDialog } from '@/features/analisis/detail/components/FilterAnalisisDialog';
import { AnalisisFilterTags } from '@/features/analisis/detail/components/AnalisisFilterTags';
import { FilterPayload } from '@/features/analisis/detail/types';

// New Config Modal
import { ConfigInterpretasiModal } from '@/features/analisis/detail/components/ConfigInterpretasiModal';

// PDF Components
import { PrintAnalysisModal } from '@/features/analisis/detail/components/PrintAnalysisModal';

// UI Components & Icons
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    Frown,
    BarChart4,
    Loader2,
    Filter,
    FileText,
    ChevronLeft,
    RotateCw,
    SearchX,
    Info 
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function AnalisisPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id;
    const kuesionerId = Number(id);

    // State Manajemen
    const [activeFilters, setActiveFilters] = useState<FilterPayload>({});
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
    const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

    // Hook Data Fetching
    const { data, isError, isLoading, isConfigMissing, refetch } = useAnalisisDetail(kuesionerId, activeFilters);

    // CEK KONFIGURASI: Otomatis buka modal jika status isConfigMissing aktif
    useEffect(() => {
        if (isConfigMissing) {
            setIsConfigModalOpen(true);
        }
    }, [isConfigMissing]);

    // Handler Konfigurasi Sukses
    const handleConfigSuccess = () => {
        setIsConfigModalOpen(false);
        refetch(); 
    };

    // Handler Filter
    const handleApplyFilters = (newFilters: FilterPayload) => {
        setActiveFilters(newFilters);
        setIsFilterModalOpen(false);
    };

    const handleRemoveFilter = (key: keyof FilterPayload, valueToRemove: unknown) => {
        const updatedFilters: FilterPayload = { ...activeFilters };
        if (valueToRemove === null || valueToRemove === undefined) {
            const { [key]: _ignored, ...rest } = updatedFilters;
            setActiveFilters(rest);
            return;
        }
        const currentFilterValue = updatedFilters[key];
        if (currentFilterValue !== undefined) {
            if (Array.isArray(currentFilterValue)) {
                const newArray = (currentFilterValue as unknown[]).filter(v => v !== valueToRemove);
                if (newArray.length === 0) {
                    const { [key]: _ignored, ...rest } = updatedFilters;
                    setActiveFilters(rest);
                } else {
                    setActiveFilters({ ...updatedFilters, [key]: newArray as FilterPayload[typeof key] });
                }
            } else if (currentFilterValue === valueToRemove) {
                const { [key]: _ignored, ...rest } = updatedFilters;
                setActiveFilters(rest);
            }
        }
    };

    // 1. INITIAL LOADING STATE
    if (isLoading && !data && !isConfigMissing) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
                <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mb-4" />
                <div className="text-center space-y-1">
                    <p className="text-xl font-bold text-slate-800">Menyusun Laporan...</p>
                    <p className="text-sm text-slate-500">Mohon tunggu sebentar, data sedang diproses.</p>
                </div>
            </div>
        );
    }

    // 2. ERROR STATE
    if (isError && !data && !isConfigMissing) {
        return (
            <div className="p-8 max-w-2xl mx-auto mt-20">
                <Alert variant="destructive" className="border-red-200 bg-red-50 py-6">
                    <Frown className="h-6 w-6" />
                    <AlertTitle className="text-lg font-bold">Gagal Memuat Analisis</AlertTitle>
                    <AlertDescription className="text-base mt-2">
                        Kami mengalami kendala saat mengambil data kuesioner ID {kuesionerId}.
                        <div className="mt-4">
                            <Button onClick={() => refetch()} variant="outline" className="bg-white border-red-200 text-red-600 hover:bg-red-100">
                                <RotateCw className="mr-2 h-4 w-4" /> Coba Muat Ulang
                            </Button>
                        </div>
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    const hasNoData = data?.totalResponden === 0;

    return (
        <div key={kuesionerId} className="relative space-y-6 p-4 md:p-8 bg-slate-50 min-h-screen">

            {/* PROGRESS BAR HALUS */}
            {isLoading && data && (
                <div className="fixed top-0 left-0 right-0 h-1 bg-emerald-100 z-[100]">
                    <div className="h-full bg-emerald-600 animate-pulse w-full" style={{ animationDuration: '1.5s' }} />
                </div>
            )}

            {/* HEADER SECTION */}
            <header className="mb-6 flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="flex items-start gap-3 sm:gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.back()}
                        className="mt-1 hover:bg-white hover:shadow-md transition-all"
                    >
                        <ChevronLeft className="h-6 w-6 text-slate-600" />
                    </Button>
                    <div>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 flex items-center gap-2 sm:gap-3 leading-tight">
                            <BarChart4 className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" />
                            Hasil Analisis
                        </h1>
                        <p className="text-sm sm:text-lg text-slate-500 font-medium mt-1">
                            {isConfigMissing ? "Kuesioner memerlukan konfigurasi interpretasi" : data?.kuesioner.judul}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <Button
                        onClick={() => setIsFilterModalOpen(true)}
                        variant="outline"
                        disabled={isConfigMissing}
                        className="flex-1 md:flex-none h-11 px-4 gap-2 border-slate-200 bg-white shadow-sm font-semibold"
                    >
                        <Filter className="h-4 w-4" />
                        Filter
                    </Button>

                    <Button
                        onClick={() => setIsPrintModalOpen(true)}
                        disabled={hasNoData || isLoading || isConfigMissing}
                        className="flex-1 md:flex-none h-11 px-5 gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transition-all active:scale-95 font-bold"
                    >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
                        {isLoading ? "Memuat..." : "Cetak PDF"}
                    </Button>
                </div>
            </header>

            {!isConfigMissing && (
                <AnalisisFilterTags
                    activeFilters={activeFilters}
                    onRemoveFilter={handleRemoveFilter}
                />
            )}

            <div className={cn(
                "transition-all duration-500 ease-in-out",
                isLoading ? "opacity-40 blur-[1px] pointer-events-none scale-[0.99]" : "opacity-100 blur-0"
            )}>
                {isConfigMissing ? (
                    /* PLACEHOLDER SAAT CONFIG BELUM ADA - THEME GREEN */
                    <div className="bg-white border-2 border-dashed border-emerald-100 rounded-[2rem] p-12 sm:p-20 text-center animate-in zoom-in-95 duration-300">
                        <div className="bg-emerald-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                            <Info className="h-12 w-12 text-emerald-500" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Konfigurasi Interpretasi Diperlukan</h3>
                        <p className="text-slate-500 max-w-sm mx-auto mt-2 text-sm sm:text-base leading-relaxed">
                            Analisis kuesioner ini belum memiliki standar nilai. Silakan atur interpretasi skor untuk melihat laporan lengkap.
                        </p>
                        <Button
                            onClick={() => setIsConfigModalOpen(true)}
                            className="mt-8 bg-emerald-600 hover:bg-emerald-700 px-8 rounded-full font-bold shadow-lg shadow-emerald-100"
                        >
                            Atur Konfigurasi Sekarang
                        </Button>
                    </div>
                ) : hasNoData ? (
                    <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-12 sm:p-20 text-center animate-in zoom-in-95 duration-300">
                        <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                            <SearchX className="h-12 w-12 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Tidak Ada Responden</h3>
                        <p className="text-slate-500 max-w-sm mx-auto mt-2 text-sm sm:text-base leading-relaxed">
                            Kombinasi filter yang Anda gunakan tidak menghasilkan data.
                        </p>
                        <Button
                            onClick={() => setActiveFilters({})}
                            variant="default"
                            className="mt-8 bg-slate-900 hover:bg-slate-800 px-8 rounded-full font-bold"
                        >
                            Reset Semua Filter
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {data && (
                            <>
                                <AnalisisHeaderCards data={data} />
                                <AnalisisCharts data={data} />
                                {data.kuesioner.analisisConfig?.interpretasi && (
                                    <AnalysisLegend config={data.kuesioner.analisisConfig.interpretasi}
                                        onEdit={() => setIsConfigModalOpen(true)} />
                                )}
                                <AnalisisPertanyaanList data={data} />
                                <AnalisisSummaryConclusion data={data} />
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* DIALOGS & MODALS */}
            <ConfigInterpretasiModal
                onClose={() => setIsConfigModalOpen(false)} // FIXED: Sebelumnya setIsModalOpen
                isOpen={isConfigModalOpen}
                kuesionerId={kuesionerId}
                onSuccess={handleConfigSuccess}
                initialData={data?.kuesioner?.analisisConfig?.interpretasi}
            />

            <FilterAnalisisDialog
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                currentFilters={activeFilters}
                onApplyFilters={handleApplyFilters}
            />

            <PrintAnalysisModal
                open={isPrintModalOpen}
                onClose={() => setIsPrintModalOpen(false)}
                data={data!}
                filters={activeFilters}
            />

            <footer className="pt-10 pb-4 text-center hidden md:block">
                <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold">
                    Laporan Otomatis • IndoFPA Analytics Module
                </p>
            </footer>
        </div>
    );
}