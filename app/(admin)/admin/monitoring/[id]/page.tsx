// fileName: src/app/admin/monitoring/[kuesionerId]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import PageHeader from "@/components/common/page-header";
import ErrorState from "@/components/common/error-state";
import AppBreadcrumb from "@/components/common/app-breadcrumb";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";
import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Import komponen monitoring detail
import { useMonitoringDetail } from "@/features/monitoring/detail/hooks"; // import HeaderCards from "@/features/monitoring/detail/components/header-cards"; 
import ProgressChart from "@/features/monitoring/detail/components/progress-chart";
import RespondenTable, { RespondenTableHeader } from "@/features/monitoring/detail/components/responden-table";
import KuesionerPagination from "@/features/kuesioner/list/components/kuesioner-pagination";
import HeaderCards from "@/features/monitoring/detail/components/header-cards";

export default function DetailMonitoringPage() {
    const params = useParams();
    const router = useRouter();
    // Mendapatkan ID
    console.log("Raw Params:", params);
    console.log("Raw Kuesioner ID:", params.kuesionerId);
    const kuesionerId = Number(params.id);

    // **********************************************
    // ✅ PERBAIKAN: MEMANGGIL HOOK DI TINGKAT ATAS
    // **********************************************
    const {
        kuesionerInfo,
        respondenList,
        meta,
        isLoading,
        isError,
        refetch,
        page,
        setPage,
    } = useMonitoringDetail(kuesionerId);

    // --- Handlers ---
    const handleGoBack = () => {
        router.push('/admin/monitoring');
    };

    const handleViewAnswer = (respondenId: number) => {
        router.push(`/admin/monitoring/${kuesionerId}/responden/${respondenId}`);
    };

    const handlePageChange = (newPage: number) => {
        if (meta && newPage >= 1 && newPage <= meta.pages) {
            setPage(newPage);
        }
    };

    // --- Render Loading/Error States ---

    // Kasus ID Invalid (NaN/<=0) ditangani di hook, mengembalikan isError=true
    if (isError) {
        // Cek eksplisit ID jika Anda ingin pesan error yang berbeda untuk NaN vs. error server
        if (isNaN(kuesionerId) || kuesionerId <= 0) {
            return (
                <ErrorState
                    title="ID Kuesioner Tidak Valid"
                    description="ID monitoring kuesioner pada URL tidak valid. Silakan kembali ke daftar monitoring."
                    onRetry={() => router.push('/admin/monitoring')}
                />
            );
        }

        // Kasus Error Server/404
        return (
            <ErrorState
                title="Gagal Memuat Detail Monitoring"
                description={`Data monitoring untuk ID ${kuesionerId} tidak ditemukan.`}
                onRetry={refetch}
            />
        );
    }

    if (isLoading && !kuesionerInfo) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
            </div>
        );
    }
    const title = `Detail Monitoring — ${kuesionerInfo!.judul}`;
    const targetResponden = kuesionerInfo!.targetResponden;
    const responMasuk = kuesionerInfo!.totalResponden;
    const progress = kuesionerInfo!.progress;


    return (
        <>
            <PageHeader
                title={title}
                action={
                    <Button variant="outline" onClick={handleGoBack} className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Kembali ke Monitoring
                    </Button>
                }
            />

            <AppBreadcrumb
                className="pb-3"
                items={[
                    { label: "Monitoring", href: "/admin/monitoring" },
                    { label: kuesionerInfo!.judul },
                ]}
            />

            <div className="space-y-6">

                {/* 1. Header Metrics (Target, Respon Masuk, Pencapaian, Tanggal) */}
                <HeaderCards
                    kuesioner={kuesionerInfo!}
                    startDate={kuesionerInfo!.startDate} // Contoh
                    endDate={kuesionerInfo!.endDate}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* 2. Grafik Progress */}
                    <ProgressChart
                        responded={responMasuk}
                        target={targetResponden}
                        progress={progress}
                    />

                    {/* 3. Placeholder untuk Metrik Tambahan / Ringkasan */}
                    <Card>
                        <CardHeader>
                            <h3 className="text-xl font-semibold">Ringkasan Kuesioner</h3>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">Kategori: <span className="font-semibold">{kuesionerInfo!.kategori.nama}</span></p>
                            <p className="text-sm">Status: <span className="font-semibold">{kuesionerInfo!.status}</span></p>
                        </CardContent>
                    </Card>
                </div>


                {/* 4. Daftar Respon Masuk (Tabel) */}
                <Card>
                    <CardHeader className="border-b">
                        <h3 className="text-xl font-semibold">Daftar Respon ({responMasuk} Masuk)</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="relative w-full overflow-x-auto">
                            <Table className="min-w-full border bg-white shadow-sm">
                                <RespondenTableHeader />
                                <RespondenTable
                                    data={respondenList}
                                    isLoading={isLoading}
                                    page={page}
                                    limit={meta?.limit ?? 20}
                                    total={meta?.total ?? 0}
                                    onViewAnswer={handleViewAnswer}
                                />
                            </Table>
                        </div>
                    </CardContent>

                    {/* Pagination Responden */}
                    {meta && responMasuk > 0 && (
                        <div className="p-4 border-t">
                            <KuesionerPagination
                                page={page}
                                pages={meta.pages}
                                limit={meta.limit}
                                total={meta.total}
                                count={respondenList.length}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </Card>

            </div>
        </>
    );
}