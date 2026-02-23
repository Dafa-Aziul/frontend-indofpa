// src/app/admin/kategori/page.tsx
"use client";

import {
    Card,
    CardHeader,
    CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Search } from "lucide-react";

import KategoriTable from "@/features/kategori/components/kategori-table";
import KategoriFormModal from "@/features/kategori/components/kategori-form-modal";
import KategoriDeleteDialog from "@/features/kategori/components/kategori-delete-dialog";
import KategoriPagination from "@/features/kategori/components/kategori-pagination";

import { useKategori } from "@/features/kategori/hooks";
import ErrorState from "@/components/common/error-state";
import PageHeader from "@/components/common/page-header";
import AppBreadcrumb from "@/components/common/app-breadcrumb";

export default function KategoriPage() {
    const state = useKategori();

    if (state.isError) {
        return <ErrorState onRetry={state.refetch} />;
    }

    const kategoriToDelete = state.data.find(
        (item) => item.kategoriId === state.deleteId
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        state.setSearch(e.target.value);
        state.setPage(1);
    };

    return (
        <>
            <PageHeader title="Halaman Kategori" />

            <AppBreadcrumb
                className="pb-3"
                items={[
                    { label: "Kategori", href: "/admin/kategori" },
                    { label: "Daftar Kategori" },
                ]}
            />

            <Card>
                {/* ================= HEADER ================= */}
                <CardHeader className="border-b">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="relative flex-1 max-w-sm">
                            <Input
                                placeholder="Cari Kategori..."
                                value={state.search}
                                onChange={handleSearchChange}
                                className="pl-9"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>

                        <Button onClick={() => state.setOpenForm(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Kategori
                        </Button>
                    </div>
                </CardHeader>

                {/* ================= CONTENT ================= */}
                <CardContent className="space-y-4">
                    <KategoriTable
                        data={state.data}
                        page={state.page}
                        limit={10}
                        onEdit={(row) => {
                            state.setEditData(row);
                            state.setOpenForm(true);
                        }}
                        onDelete={(id) => state.setDeleteId(id)}
                    />

                    {state.meta && (
                        <KategoriPagination
                            page={state.page}
                            pages={state.meta.pages}
                            limit={state.meta.limit}
                            total={state.meta.total}
                            count={state.data.length}
                            onPageChange={state.setPage}
                        />
                    )}
                </CardContent>

                {/* ================= MODALS ================= */}
                <KategoriFormModal
                    open={state.openForm}
                    defaultValues={
                        state.editData ? { nama: state.editData.nama } : undefined
                    }
                    onClose={() => {
                        state.setOpenForm(false);
                        state.setEditData(null);
                    }}
                    onSubmit={state.submitForm}
                />

                <KategoriDeleteDialog
                    nama={kategoriToDelete?.nama || ""}
                    open={!!state.deleteId}
                    onCancel={() => state.setDeleteId(null)}
                    onConfirm={state.confirmDelete}
                />
            </Card>
        </>
    );
}