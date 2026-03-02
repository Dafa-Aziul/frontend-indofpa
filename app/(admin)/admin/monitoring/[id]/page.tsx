"use client";

import { useParams, useRouter } from "next/navigation";
import PageHeader from "@/components/common/page-header";
import ErrorState from "@/components/common/error-state";
import AppBreadcrumb from "@/components/common/app-breadcrumb";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2, ArrowLeft, FileSpreadsheet, Upload } from "lucide-react"; // Tambahkan FileSpreadsheet
import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { useMonitoringDetail } from "@/features/monitoring/detail/hooks";
import ProgressChart from "@/features/monitoring/detail/components/progress-chart";
import RespondenTable, { RespondenTableHeader } from "@/features/monitoring/detail/components/responden-table";
import KuesionerPagination from "@/features/kuesioner/list/components/kuesioner-pagination";
import HeaderCards from "@/features/monitoring/detail/components/header-cards";
import ImportRespondenModal from "@/features/monitoring/detail/components/ImportRespondenModal";
import { useState } from "react";

export default function DetailMonitoringPage() {
    const params = useParams();
    const router = useRouter();

    // Pastikan menggunakan kuesionerId sesuai folder [kuesionerId]
    const kuesionerId = Number(params.id);

    const {
        kuesionerInfo,
        respondenList,
        meta,
        isLoading,
        isError,
        isExporting,        // ✅ Ambil dari hook
        handleExportLaporan, // ✅ Ambil dari hook
        refetch,
        page,
        setPage,
    } = useMonitoringDetail(kuesionerId);


    const [openImport, setOpenImport] = useState(false);

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

    if (isError) {
        if (isNaN(kuesionerId) || kuesionerId <= 0) {
            return (
                <ErrorState
                    title="ID Kuesioner Tidak Valid"
                    description="ID monitoring kuesioner pada URL tidak valid."
                    onRetry={() => router.push('/admin/monitoring')}
                />
            );
        }
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

    return (
        <>
            <PageHeader
                title={`Detail Monitoring — ${kuesionerInfo?.judul}`}
                action={
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={handleExportLaporan}
                            disabled={isExporting}
                            className="gap-2 border-green-600 text-green-600"
                        >
                            {isExporting ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <FileSpreadsheet className="h-4 w-4" />
                            )}
                            {isExporting ? "Mengekspor..." : "Export Excel"}
                        </Button>

                        <Button variant="outline" onClick={handleGoBack} className="gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Kembali
                        </Button>
                    </div>
                }
            />

            <AppBreadcrumb
                className="pb-3"
                items={[
                    { label: "Monitoring", href: "/admin/monitoring" },
                    { label: kuesionerInfo?.judul || "Detail" },
                ]}
            />

            <div className="space-y-6">
                <HeaderCards
                    kuesioner={kuesionerInfo!}
                    startDate={kuesionerInfo?.startDate}
                    endDate={kuesionerInfo?.endDate}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ProgressChart
                        responded={kuesionerInfo?.totalResponden || 0}
                        target={kuesionerInfo?.targetResponden || 0}
                        progress={kuesionerInfo?.progress || 0}
                    />

                    <Card>
                        <CardHeader>
                            <h3 className="text-xl font-semibold">Ringkasan Kuesioner</h3>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p className="text-sm text-muted-foreground">Kategori: <span className="font-semibold text-foreground">{kuesionerInfo?.kategori.nama}</span></p>
                            <p className="text-sm text-muted-foreground">Status: <span className="font-semibold text-foreground">{kuesionerInfo?.status}</span></p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader className="border-b flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <h3 className="text-xl font-semibold">
                            Daftar Respon ({kuesionerInfo?.totalResponden} Masuk)
                        </h3>

                        <Button
                            onClick={() => setOpenImport(true)}
                            className="h-11 px-5 bg-primary hover:bg-accent text-primary-foreground font-bold flex items-center gap-2 shadow-sm"
                        >
                            <Upload className="h-4 w-4" />
                            Import Responden
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                        <div className="relative w-full overflow-x-auto rounded-md border">
                            <Table className="min-w-full bg-white">
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

                    <ImportRespondenModal
                        kuesionerId={kuesionerId}
                        open={openImport}
                        onOpenChange={setOpenImport}
                        onSuccess={refetch}
                    />

                    {meta && (kuesionerInfo?.totalResponden ?? 0) > 0 && (
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