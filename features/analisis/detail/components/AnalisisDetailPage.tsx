// fileName: src/features/analisis/detail/components/AnalisisPageContent.tsx
"use client";

import { useAnalisisDetail } from '@/features/analisis/detail/hooks'; // Path diperjelas
import AnalisisHeaderCards from '@/features/analisis/detail/components/AnalisisHeaderCards';
import AnalisisCharts from '@/features/analisis/detail/components/AnalisisCharts';
import AnalisisPertanyaanList from '@/features/analisis/detail/components/AnalisisPertanyaanList';

import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Frown, BarChart4 } from "lucide-react";

interface AnalisisPageContentProps {
    kuesionerId: number; // Diterima sebagai prop dari Server Component
}

const LoadingSkeleton = () => (
    <div className="space-y-6 p-4 md:p-8">
        <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-[90px]" />
            <Skeleton className="h-[90px]" />
            <Skeleton className="h-[90px]" />
        </div>
        <div className="grid grid-cols-2 gap-4 h-96">
            <Skeleton className="h-full" />
            <Skeleton className="h-full" />
        </div>
        <Skeleton className="h-48" />
        <div className="space-y-3 mt-8">
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
        </div>
    </div>
);


export default function AnalisisPageContent({ kuesionerId }: AnalisisPageContentProps) {
    // kuesionerId adalah prop yang bersih, tidak perlu useParams()
    const { data, isLoading, isError, refetch } = useAnalisisDetail(kuesionerId); 

    if (isLoading) {
        return <LoadingSkeleton />;
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

    return (
        <div className="space-y-6 p-4 md:p-8">

            {/* Judul Halaman */}
            <header className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <BarChart4 className="h-7 w-7 text-green-600" />
                    Analisis Kuesioner
                </h1>
                <p className="text-xl text-muted-foreground mt-1">{kuesionerTitle}</p>
            </header>

            {/* 1. RINGKASAN KPI */}
            <AnalisisHeaderCards data={data} />

            {/* 2. CHARTS DAN RINGKASAN VARIABEL/INDIKATOR */}
            <AnalisisCharts data={data} />

            {/* 3. DETAIL PERTANYAAN */}
            <AnalisisPertanyaanList data={data} />
        </div>
    );
}