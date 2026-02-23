"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";

import MonitoringTable from "@/features/monitoring/list/components/monitoring-table";
import { useMonitoring } from "@/features/monitoring/list/hooks";
import KuesionerPagination from "@/features/kuesioner/list/components/kuesioner-pagination";
import ErrorState from "@/components/common/error-state";
import PageHeader from "@/components/common/page-header";
import AppBreadcrumb from "@/components/common/app-breadcrumb";

export default function MonitoringPage() {
    const router = useRouter();
    const state = useMonitoring();

    // ===== ERROR STATE =====
    if (state.isError) {
        return <ErrorState onRetry={state.refetch} />;
    }

    const handleViewDetail = (kuesionerId: number) => {
        router.push(`/admin/monitoring/${kuesionerId}`);
    };

    const handlePageChange = (newPage: number) => {
        if (state.meta && newPage >= 1 && newPage <= state.meta.pages) {
            state.setPage(newPage);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        state.setSearch(e.target.value);
        state.setPage(1);
    };

    return (
        <>
            <PageHeader title="Halaman Monitoring Kuesioner" />

            <AppBreadcrumb
                className="pb-3"
                items={[
                    { label: "Monitoring", href: "/admin/monitoring" },
                    { label: "List monitoring kuesioner aktif" },
                ]}
            />

            <Card className="relative">
                {/* ================= HEADER ================= */}
                <CardHeader className="border-b">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="relative flex-1 max-w-sm">
                            <Input
                                placeholder="Cari kuesioner..."
                                value={state.search}
                                onChange={handleSearchChange}
                                className="pl-9"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                    </div>
                </CardHeader>

                {/* ================= CONTENT ================= */}
                <CardContent className="space-y-4 pt-6 relative">
                    {/* 🔹 LOADING OVERLAY (SMOOTH) */}
                    {state.showLoader && (
                        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center z-10 transition-opacity">
                            <Loader2 className="h-5 w-5 animate-spin text-accent" />
                        </div>
                    )}

                    {/* 🔹 DATA (DIM SAAT FETCHING) */}
                    <div
                        className={`transition-opacity duration-200 ${state.isFetching ? "opacity-60 pointer-events-none" : "opacity-100"
                            }`}
                    >
                        <MonitoringTable
                            data={state.data}
                            page={state.page}
                            limit={state.meta?.limit ?? 10}
                            onViewDetail={handleViewDetail}
                        />

                        {state.meta && (
                            <KuesionerPagination
                                page={state.page}
                                pages={state.meta.pages}
                                limit={state.meta.limit}
                                total={state.meta.total}
                                count={state.data.length}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </div>
                </CardContent>
            </Card>
        </>
    );
}