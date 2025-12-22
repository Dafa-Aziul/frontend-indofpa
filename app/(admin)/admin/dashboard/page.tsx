"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import SummaryCards from "@/features/dashboard/components/SummaryCards";
import TrendChart from "@/features/dashboard/components/TrendChart";
import DistributionChart from "@/features/dashboard/components/DistributionChart";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendChartSkeleton } from "@/features/dashboard/components/skeletons/TrendChartSkeleton";
import { SummaryCardsSkeleton } from "@/features/dashboard/components/skeletons/SummaryCardsSkeleton";
import { DistributionChartSkeleton } from "@/features/dashboard/components/skeletons/DistributionChartSkeleton";
import PageHeader from "@/components/common/page-header";
import { Loader2, RefreshCw } from "lucide-react";

export default function DashboardPage() {
    // 1. Hook Dashboard (Polling Real-time)
    const { data, loading, isRefetching, refreshManual } = useDashboard();

    // 2. State Management
    const [userName, setUserName] = useState<string>("");
    const [isMounted, setIsMounted] = useState(false);

    // Inisialisasi visualLoading sesuai dengan initial loading state
    const [visualLoading, setVisualLoading] = useState(true);

    // 3. FIX: Menghilangkan Cascading Render pada Mounting & LocalStorage
    useEffect(() => {
        // Gunakan setTimeout 0 untuk memindahkan eksekusi ke macrotask queue
        // Ini memberi waktu React menyelesaikan fase commit render pertama
        const timeout = setTimeout(() => {
            setIsMounted(true);
            const saved = window.localStorage.getItem("user");
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    if (parsed.name) setUserName(parsed.name);
                } catch (e) {
                    console.error("Failed to parse user", e);
                }
            }
        }, 0);

        return () => clearTimeout(timeout);
    }, []);

    // 4. FIX: Menghilangkan Cascading Render pada Loading Logic
    // 4. FIX FINAL: Loading Logic TANPA Cascading Render
    useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null;

        if (!loading) {
            // Delay agar skeleton tidak flicker
            timeoutId = setTimeout(() => {
                setVisualLoading(false);
            }, 300);
        } else {
            // Saat loading dimulai, langsung tampilkan skeleton
            timeoutId = setTimeout(() => {
                setVisualLoading(true);
            }, 0);
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [loading]);


    // 5. Derived State & Hydration Guard
    const displayTitle = useMemo(() => {
        // Selama belum mounted (di server), tampilkan default untuk cegah hydration error
        if (!isMounted) return "Selamat Datang";
        return userName ? `Halo, ${userName.split(" ")[0]}!` : "Selamat Datang";
    }, [isMounted, userName]);

    const showLoading = loading || visualLoading;

    return (
        <div className="pb-10 px-0 sm:px-4 animate-in fade-in duration-500">
            {/* ================= HEADER ================= */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <PageHeader
                    className="pb-0"
                    title={displayTitle}
                    description="Pantau statistik kuesioner Anda secara langsung."
                />

                <div className="flex items-center gap-2 self-start sm:self-center">
                    {isRefetching ? (
                        <div className="flex items-center gap-2 text-[10px] text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            <span className="font-semibold uppercase tracking-tight">Sinkronisasi...</span>
                        </div>
                    ) : (
                        <button
                            onClick={() => refreshManual?.()}
                            className="flex items-center gap-2 text-[10px] text-gray-500 hover:text-green-600 bg-white px-3 py-1.5 rounded-full border border-gray-200 transition-colors"
                        >
                            <RefreshCw className="h-3 w-3" />
                            <span className="font-medium uppercase tracking-wider">Update</span>
                        </button>
                    )}
                </div>
            </div>

            {/* ================= CONTENT ================= */}
            <div className="space-y-6 md:space-y-10">
                {/* 1. Trend Chart */}
                <Card className="shadow-sm border-none sm:border rounded-xl overflow-hidden bg-white">
                    <CardHeader className="p-4 md:p-6 border-b bg-gray-50/30">
                        <CardTitle className="text-lg md:text-xl font-bold text-green-900 font-mono">
                            AKTIVITAS 30 HARI TERAKHIR
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 md:p-6 pt-6">
                        {showLoading ? <TrendChartSkeleton /> : <TrendChart data={data?.last30Days || []} />}
                    </CardContent>
                </Card>

                {/* 2. Grid Summary & Distribution */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
                    <Card className="shadow-sm border-none sm:border rounded-xl bg-white">
                        <CardHeader className="p-4 md:p-6 pb-2">
                            <CardTitle className="text-lg md:text-xl font-bold">Ringkasan Kuesioner</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 md:p-6 pt-0 font-medium">
                            {showLoading ? (
                                <SummaryCardsSkeleton />
                            ) : data?.summary ? (
                                <SummaryCards summary={data.summary} />
                            ) : (
                                <div className="text-center py-6 text-sm text-gray-400">Data kuesioner tidak ditemukan.</div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm border-none sm:border rounded-xl bg-white">
                        <CardHeader className="p-4 md:p-6 pb-2">
                            <CardTitle className="text-lg md:text-xl font-bold">Distribusi Responden</CardTitle>
                        </CardHeader>
                        <CardContent className="p-2 md:p-6 pt-0 flex items-center justify-center min-h-[300px]">
                            {showLoading ? (
                                <DistributionChartSkeleton />
                            ) : data?.distribution ? (
                                <DistributionChart data={data.distribution} />
                            ) : (
                                <div className="text-sm text-gray-400 italic font-medium tracking-tight">Belum ada data distribusi.</div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Spacer mobile */}
            <div className="h-10 md:hidden" />
        </div>
    );
}