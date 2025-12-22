"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import KuesionerTable from "@/features/kuesioner/list/components/kuesioner-table";
import KuesionerPagination from "@/features/kuesioner/list/components/kuesioner-pagination";
import KuesionerDeleteDialog from "@/features/kuesioner/list/components/kuesioner-delete-dialog";
import KuesionerShareDialog from "@/features/kuesioner/list/components/kuesioner-share-dialog";

import { useKuesioner } from "@/features/kuesioner/list/hooks";
import PageHeader from "@/components/common/page-header";
import AppBreadcrumb from "@/components/common/app-breadcrumb";
import KuesionerFormModal from "@/features/kuesioner/list/components/kuesioner-form-modal";
import ErrorState from "@/components/common/error-state";

export default function KuesionerPage() {
    const state = useKuesioner();

    // ===== ERROR STATE =====
    if (state.isError) {
        return <ErrorState onRetry={state.refetch} />;
    }
    const kuesionerToDelete = state.data.find(
        (item) => item.kuesionerId === state.deleteId
    );

    return (
        <>
            <PageHeader title="Halaman Daftar Kuesioner" />

            <AppBreadcrumb
                className="pb-3"
                items={[
                    { label: "Daftar kuesioner", href: "/admin/kuesioner" },
                    { label: "List kuesioner yang sudah terdaftar" },
                ]}
            />

            <Card >
                {/* ================= HEADER ================= */}
                <CardHeader className="border-b">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <Input
                            placeholder="Cari kuesioner..."
                            value={state.search}
                            onChange={(e) => {
                                state.setSearch(e.target.value);
                                state.setPage(1);
                            }}
                            className="max-w-sm"
                        />

                        <Button
                            onClick={() => {
                                state.setEditData(null); // ✅ reset edit state
                                state.setOpenForm(true);
                            }}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Kuesioner
                        </Button>
                    </div>
                </CardHeader>

                {/* ================= CONTENT ================= */}
                <CardContent className="space-y-4">
                    <KuesionerTable
                        data={state.data}
                        page={state.page}
                        limit={10}
                        onEdit={(row) => {
                            state.setEditData({ ...row }); // ✅ clone object
                            state.setOpenForm(true);
                        }}
                        onDelete={(id) => state.setDeleteId(id)}
                        onShare={(id) => state.openShareDialog(id)}
                    />

                    {state.meta && (
                        <KuesionerPagination
                            page={state.page}
                            pages={state.meta.pages}
                            limit={state.meta.limit}
                            total={state.meta.total}
                            count={state.data.length}
                            onPageChange={state.setPage}
                        />
                    )}
                </CardContent>

                {/* ================= FORM KUESIONER ================= */}
                <KuesionerFormModal
                    open={state.openForm}
                    defaultValues={
                        state.editData
                            ? {
                                judul: state.editData.judul,
                                tujuan: state.editData.tujuan,
                                manfaat: state.editData.manfaat ?? "",
                                kategoriId: state.editData.kategoriId,
                                estimasiMenit: state.editData.estimasiMenit,
                                targetResponden: state.editData.targetResponden,
                            }
                            : undefined
                    }
                    onClose={() => {
                        state.setOpenForm(false);
                        state.setEditData(null);
                    }}
                    onSubmit={state.submitForm}
                    kategoriList={state.kategori}
                />

                {/* ================= DELETE ================= */}
                <KuesionerDeleteDialog
                    judul={kuesionerToDelete?.judul || ""}
                    open={!!state.deleteId}
                    onCancel={() => state.setDeleteId(null)}
                    onConfirm={state.confirmDelete}
                />

                {/* ================= DISTRIBUSI ================= */}
                <KuesionerShareDialog
                    open={state.openShare}
                    defaultValues={state.distribusiDefaultValues}
                    onClose={state.closeShareDialog}
                    onSubmit={state.submitShare}
                />
            </Card>
        </>
    );
}
