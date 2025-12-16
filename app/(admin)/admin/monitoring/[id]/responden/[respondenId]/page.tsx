// fileName: src/app/admin/analisis/[kuesionerId]/responden/[respondenId]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import PageHeader from "@/components/common/page-header";
import ErrorState from "@/components/common/error-state";
import AppBreadcrumb from "@/components/common/app-breadcrumb";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import Hook
import { useRespondenDetail } from "@/features/monitoring/responden/hooks";

// ✅ Import Komponen Anak yang sudah dipisah
import JawabanSection from "@/features/monitoring/responden/components/JawabanSection";
import RespondenInfoCard from "@/features/monitoring/responden/components/RespondenInfoCard"; // Asumsi ada
import RingkasanScoreCard from "@/features/monitoring/responden/components/RingkasanScoreCard";
import IndicatorScoreTable from "@/features/monitoring/responden/components/IndicatorScoreTable";


export default function DetailJawabanRespondenPage() {
    const params = useParams();
    const router = useRouter();

    // Mengambil ID dari params
    const kuesionerId = Number(params.id);
    const respondenId = Number(params.respondenId);

    const {
        respondenInfo,
        jawabanList,
        ringkasan,         // ✅ State baru
        indicatorScores,  // ✅ State baru
        isLoading,
        isError,
        refetch,
    } = useRespondenDetail(kuesionerId, respondenId);

    const handleGoBack = () => {
        router.push(`/admin/monitoring/${kuesionerId}`);
    };

    // Utility untuk format durasi (dari detik ke Menit/Detik)
    const formatDurasi = (durasiDetik: number | null) => {
        if (durasiDetik === null) return '-';
        if (durasiDetik < 60) return `${durasiDetik} detik`;
        const minutes = Math.floor(durasiDetik / 60);
        const seconds = durasiDetik % 60;
        let result = '';
        if (minutes > 0) result += `${minutes} mnt`;
        if (seconds > 0) result += (minutes > 0 ? ' ' : '') + `${seconds} dtk`;
        return result === '' ? '0 dtk' : result;
    };

    // Utility untuk format tanggal dan waktu
    const formatDateTime = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        } catch {
            return '-';
        }
    };

    // --- Render Loading/Error States ---

    if (isError) {
        if (isNaN(kuesionerId) || kuesionerId <= 0 || isNaN(respondenId) || respondenId <= 0) {
            return (
                <ErrorState
                    title="ID Tidak Valid"
                    description="ID Kuesioner atau ID Responden pada URL tidak valid."
                    onRetry={handleGoBack}
                />
            );
        }

        return (
            <ErrorState
                title="Gagal Memuat Jawaban"
                description={`Data jawaban untuk Responden ID ${respondenId} tidak ditemukan.`}
                onRetry={refetch}
            />
        );
    }

    if (isLoading || !respondenInfo || !ringkasan) { // Tambahkan pengecekan ringkasan
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
            </div>
        );
    }

    // --- Render Content ---
    const title = `Detail Jawaban — ${respondenInfo.nama}`;


    return (
        <>
            <PageHeader
                title={title}
                action={
                    <Button variant="outline" onClick={handleGoBack} className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Kembali
                    </Button>
                }
            />

            <AppBreadcrumb
                className="pb-3"
                items={[
                    { label: "Monitoring", href: "/admin/monitoring" },
                    { label: kuesionerId.toString(), href: `/admin/monitoring/${kuesionerId}` },
                    { label: "Jawaban Responden" },
                ]}
            />

            <div className="space-y-6">


                {/* 3. KARTU PROFIL RESPONDEN */}
                <RespondenInfoCard
                    responden={respondenInfo}
                    formatDurasi={formatDurasi}
                    formatDateTime={formatDateTime}
                />

                {/* 2. TABEL SKOR PER INDIKATOR */}
                {indicatorScores && indicatorScores.length > 0 && (
                    <IndicatorScoreTable scores={indicatorScores} />
                )}
                {/* 4. DAFTAR JAWABAN */}
                <JawabanSection jawabanList={jawabanList} />

                {/* 5. RINGKASAN SKOR */}
                <RingkasanScoreCard ringkasan={ringkasan} />

            </div>
        </>
    );
}