// fileName: src/pages/admin/dashboard/index.tsx (Asumsi Lokasi)
"use client";

import { useEffect, useState } from "react";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import SummaryCards from "@/features/dashboard/components/SummaryCards";
import TrendChart from "@/features/dashboard/components/TrendChart";
import DistributionChart from "@/features/dashboard/components/DistributionChart";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendChartSkeleton } from "@/features/dashboard/components/skeletons/TrendChartSkeleton";
import { SummaryCardsSkeleton } from "@/features/dashboard/components/skeletons/SummaryCardsSkeleton";
import { DistributionChartSkeleton } from "@/features/dashboard/components/skeletons/DistributionChartSkeleton";
import PageHeader from "@/components/common/page-header";

export default function DashboardPage() {
    const { data, loading } = useDashboard();

    // 1. Ambil nama user dari localStorage (client only)
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        const id = requestAnimationFrame(() => {
            const saved = localStorage.getItem("user");
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    setUserName(parsed.name);
                } catch { }
            }
        });

        return () => cancelAnimationFrame(id);
    }, []);


    // ============================
    // LOADING UI
    // ============================
    if (loading) {
        return (
            <div className="space-y-10">
                {/* Menggunakan PageHeader untuk konsistensi di loading state */}
                <PageHeader className="pb-6"
                    title={userName ? `Selamat datang, ${userName}` : "Selamat Datang"}
                    description="Berikut ringkasan aktivitas dan performa kuisioner Anda. Pantau perkembangan responden dan analisis data terbaru secara langsung dari dashboard ini."
                />
                
                <Card className="shadow-sm border rounded-xl">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Aktivitas 30 Hari Terakhir</CardTitle>
                        <p className="text-muted-foreground">
                            Grafik tren responden berdasarkan aktivitas terbaru
                        </p>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <TrendChartSkeleton />
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <Card className="shadow-sm border rounded-xl">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Ringkasan Kuisioner</CardTitle>
                            <p className="text-muted-foreground">
                                Statistik penting dari seluruh kuisioner Anda
                            </p>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <SummaryCardsSkeleton />
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm border rounded-xl">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Distribusi Responden</CardTitle>
                            <p className="text-muted-foreground">
                                Perbandingan jumlah responden
                            </p>
                        </CardHeader>
                        <CardContent className="pt-2">
                            <DistributionChartSkeleton />
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    // ============================
    // DATA KOSONG
    // ============================
    if (!data) {
        return (
            <div className="p-6 text-center text-muted-foreground">
                Data tidak ditemukan
            </div>
        );
    }

    // ============================
    // MAIN CONTENT
    // ============================
    return (
        <>
            {/* Header Section */}
            <PageHeader className="pb-6"
                title={userName ? `Selamat datang, ${userName}`: "Selamat Datang"}
                description="Berikut ringkasan aktivitas dan performa kuisioner Anda. Pantau perkembangan responden dan analisis data terbaru secara langsung dari dashboard ini."
            />
            {/* CONTENT SECTION */}
            <div className="space-y-10">

                {/* Trend Chart */}
                <Card className="shadow-sm border rounded-xl">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                            Aktivitas 30 Hari Terakhir
                        </CardTitle>
                        <p className="text-muted-foreground">
                            Grafik tren responden berdasarkan aktivitas terbaru
                        </p>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <TrendChart data={data.last30Days} />
                    </CardContent>
                </Card>

                {/* Summary & Pie Chart */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <Card className="shadow-sm border rounded-xl">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Ringkasan Kuisioner</CardTitle>
                            <p className="text-muted-foreground">
                                Statistik penting dari seluruh kuisioner Anda
                            </p>
                        </CardHeader>
                        {/* ✅ PERBAIKAN: Menghapus mx-6, karena CardContent sudah mengatur padding */}
                        <CardContent className="pt-4"> 
                            <SummaryCards summary={data.summary} />
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm border rounded-xl">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Distribusi Responden</CardTitle>
                            <p className="text-muted-foreground">
                                Perbandingan jumlah responden pada kuisioner aktif
                            </p>
                        </CardHeader>
                        <CardContent>
                            <DistributionChart data={data.distribution} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}