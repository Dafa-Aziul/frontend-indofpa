"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import AnalisisTable from "@/features/analisis/list/components/AnalisisTable";
import AnalisisPagination from "@/features/analisis/list/components/AnalisisPagination";

import { useAnalisis } from "@/features/analisis/list/hooks";
import PageHeader from "@/components/common/page-header";
import AppBreadcrumb from "@/components/common/app-breadcrumb";
import ErrorState from "@/components/common/error-state";

export default function AnalisisPage() {
    const state = useAnalisis();

    // ❗ error tetap prioritas
    if (state.isError) {
        return <ErrorState onRetry={state.refetch} />;
    }

    // ✅ Search handler (HALUS & KONSISTEN)
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        state.setSearch(e.target.value);
        state.setPage(1);
    };

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

            <Card className="relative">
                {/* ================= HEADER ================= */}
                <CardHeader className="border-b">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="relative flex-1 max-w-sm">
                            <Input
                                placeholder="Cari kuesioner yang sudah diisi..."
                                value={state.search}
                                onChange={handleSearchChange}
                                className="pl-9"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                    </div>

                </CardHeader>

                {/* ================= CONTENT ================= */}
                <CardContent className="space-y-4 p-4 sm:p-6">
                    <AnalisisTable
                        data={state.data}
                        page={state.page}
                        limit={state.limit}
                    />

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