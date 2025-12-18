// fileName: src/app/admin/monitoring/page.tsx
"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react"; // Ditambahkan untuk kelengkapan UI

// Import komponen dari feature Monitoring
import MonitoringTable from "@/features/monitoring/list/components/monitoring-table";
import { useMonitoring } from "@/features/monitoring/list/hooks";
import KuesionerPagination from "@/features/kuesioner/list/components/kuesioner-pagination";
import ErrorState from "@/components/common/error-state";
import PageHeader from "@/components/common/page-header";
import AppBreadcrumb from "@/components/common/app-breadcrumb";

export default function MonitoringPage() {
    const router = useRouter();

    // Menggunakan useMonitoring
    const state = useMonitoring();

    // ===== ERROR STATE =====
    if (state.isError) {
        return <ErrorState onRetry={state.refetch} />;
    }

    // Handler untuk navigasi ke detail (seperti Lihat Detail di MonitoringTable)
    const handleViewDetail = (kuesionerId: number) => {
        // ✅ PERBAIKAN: Navigasi ke halaman Detail Monitoring yang benar
        router.push(`/admin/monitoring/${kuesionerId}`);
    };

    // Handler untuk pagination
    const handlePageChange = (newPage: number) => {
        if (state.meta && newPage >= 1 && newPage <= state.meta.pages) {
            state.setPage(newPage);
        }
    };

    // Handler untuk search
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        state.setSearch(e.target.value);
        state.setPage(1); // Reset page ke 1 saat pencarian baru
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

            <Card >
                {/* ================= HEADER ================= */}
                <CardHeader className="border-b">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        {/* Search Bar */}
                        <div className="relative flex-1 max-w-sm">
                            <Input
                                placeholder="Cari kuesioner..."
                                value={state.search}
                                onChange={handleSearchChange}
                                className="pl-9" // Menambahkan padding untuk ikon
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                    </div>
                </CardHeader>

                {/* ================= CONTENT ================= */}
                <CardContent className="space-y-4 pt-6">
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
                </CardContent>
            </Card>
        </>
    );
}