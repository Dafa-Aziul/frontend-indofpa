"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";
import { Search } from "lucide-react";

import KuesionerTable from "@/features/kuesioner/list/components/kuesioner-table";
import KuesionerPagination from "@/features/kuesioner/list/components/kuesioner-pagination";
import KuesionerDeleteDialog from "@/features/kuesioner/list/components/kuesioner-delete-dialog";
import KuesionerShareDialog from "@/features/kuesioner/list/components/kuesioner-share-dialog";
import KuesionerFormModal from "@/features/kuesioner/list/components/kuesioner-form-modal";
import ImportKuesionerModal from "@/features/kuesioner/list/components/ImportKuesionerModal";

import { useKuesioner } from "@/features/kuesioner/list/hooks";
import PageHeader from "@/components/common/page-header";
import AppBreadcrumb from "@/components/common/app-breadcrumb";
import ErrorState from "@/components/common/error-state";

export default function KuesionerPage() {
    const state = useKuesioner();

    // ===== FULL PAGE ERROR (FIRST LOAD ONLY) =====
    if (state.isError && state.data.length === 0 && !state.isLoading) {
        return <ErrorState onRetry={state.refetch} />;
    }

    const kuesionerToDelete = state.data.find(
        (item) => item.kuesionerId === state.deleteId
    );


    return (
        <>
            <PageHeader
                title="Halaman Kuesioner"
                action={
                    <Button
                        variant="outline"
                        onClick={() => state.setOpenImport(true)}
                        className="gap-2 border-green-600 text-green-600"
                    >
                        <Upload className="h-4 w-4" />
                        Import Kuesioner
                    </Button>
                }
            />


            <AppBreadcrumb
                className="pb-3"
                items={[
                    { label: "Daftar kuesioner", href: "/admin/kuesioner" },
                    { label: "List kuesioner yang sudah terdaftar" },
                ]}
            />

            <Card>
                {/* ================= HEADER ================= */}
                <CardHeader className="border-b">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                        {/* Search */}
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Cari kuesioner..."
                                value={state.search}
                                onChange={(e) => state.setSearch(e.target.value)}
                                className="pl-9" // ⬅️ penting biar teks tidak nabrak icon
                            />
                        </div>

                        {/* Button */}
                        <Button
                            onClick={() => {
                                state.setEditData(null);
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
                        limit={state.limit} // ✅ dari hook
                        isLoading={state.isLoading || state.isFetching} // ⬅️ jika table support
                        onEdit={(row) => {
                            state.setEditData({ ...row });
                            state.setOpenForm(true);
                        }}
                        onDelete={state.setDeleteId}
                        onShare={state.openShareDialog}
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
                {/* ================= FORM ================= */}
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
                    kategoriList={state.kategori}
                    onSubmit={state.submitForm}
                    onClose={() => {
                        state.setOpenForm(false);
                        state.setEditData(null);
                    }}
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

                {/* ================= IMPORT ================= */}
                <ImportKuesionerModal
                    open={state.openImport}
                    onOpenChange={state.setOpenImport}
                    onSuccess={state.refetch}
                />
            </Card>
        </>
    );
}