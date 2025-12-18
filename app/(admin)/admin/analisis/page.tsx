// Ganti nama default export agar sesuai dengan AnalisisListContainer jika Anda menggunakannya di page.tsx
// Lokasi: src/features/analisis/list/AnalisisListContainer.tsx (atau AnalisisPage.tsx)

"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

import AnalisisTable from "@/features/analisis/list/components/AnalisisTable";
// PERBAIKAN 1: Mengubah import pagination ke AnalisisPagination yang sesuai
import AnalisisPagination from "@/features/analisis/list/components/AnalisisPagination";

import { useAnalisis } from "@/features/analisis/list/hooks"; // Pastikan path hook-nya benar
import PageHeader from "@/components/common/page-header";
import AppBreadcrumb from "@/components/common/app-breadcrumb";
import ErrorState from "@/components/common/error-state";

export default function AnalisisPage() {
    const state = useAnalisis();

    if (state.isError) {
        return <ErrorState onRetry={state.refetch} />;
    }

    if (state.isLoading && state.data.length === 0) {
        return (
            <div className="flex justify-center items-center h-96">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
        );
    }

    return (
        <>
            <PageHeader title="Halaman Analisis Kuesioner" />

            <AppBreadcrumb
                className="pb-3"
                items={[
                    { label: "Analisis Kuesioner", href: "/admin/analisis" },
                    { label: "Daftar kuesioner yang sudah diisi" },
                ]}
            />

            <Card className="shadow-lg">
                {/* ================= HEADER (SEARCH) ================= */}
                {/* Meniru style KategoriPage: px-4 sm:px-6 py-4 */}
                <CardHeader className="border-b px-4 sm:px-6 py-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <Input
                            placeholder="Cari kuesioner yang sudah diisi..."
                            value={state.search}
                            onChange={(e) => {
                                state.setSearch(e.target.value);
                                state.setPage(1);
                            }}
                            // Meniru style KategoriPage
                            className="w-full md:max-w-sm"
                        />
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 p-0 sm:p-6 sm:pb-4 pb-4">

                    <div className="w-full">
                        <AnalisisTable
                            data={state.data}
                            page={state.page}
                            limit={state.limit}
                        />
                    </div>
                    {state.meta && (
                        <AnalisisPagination
                            page={state.page}
                            pages={state.meta.pages}
                            limit={state.meta.limit}
                            total={state.meta.total}
                            count={state.data.length}
                            onPageChange={state.setPage}
                        />
                    )}
                </CardContent>
            </Card>
        </>
    );
}