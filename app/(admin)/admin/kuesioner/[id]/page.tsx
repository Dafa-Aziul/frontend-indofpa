// fileName: page.tsx
"use client";

import { useParams } from "next/navigation";
import {
    useKuesionerDetail,
    useVariabel,
    useIndikator,
    usePertanyaan,
} from "@/features/kuesioner/detail/hooks";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import PageHeader from "@/components/common/page-header";
import AppBreadcrumb from "@/components/common/app-breadcrumb";

// Components
import { KuesionerDetailContent } from "@/features/kuesioner/detail/components/kuesioner-detail-content";
import { KuesionerVariabelSection } from "@/features/kuesioner/detail/components/kuesioner-variabel-section";
import { KuesionerIndikatorSection } from "@/features/kuesioner/detail/components/kuesioner-indikator-section";
import { KuesionerPertanyaanSection } from "@/features/kuesioner/detail/components/kuesioner-pertanyaan-section";

// Modals & Dialogs
import { VariabelFormModal } from "@/features/kuesioner/detail/components/variabale-form-modal";
import { VariabelDeleteDialog } from "@/features/kuesioner/detail/components/variabel-delete-dialog";
import { IndikatorFormModal } from "@/features/kuesioner/detail/components/indikator-form-modal";
import { IndikatorDeleteDialog } from "@/features/kuesioner/detail/components/indikator-delete-dialog";
import { PertanyaanFormModal } from "@/features/kuesioner/detail/components/pertanyaan-form-modal";
import { PertanyaanDeleteDialog } from "@/features/kuesioner/detail/components/pertanyaan-delete-dialog";

export default function KuesionerDetailPage() {
    const { id } = useParams();
    const kuesionerId = Number(id);

    /* ================= DATA DETAIL ================= */
    const {
        data,
        loading,
        error,
        addVariabel, updateVariabelLocal, deleteVariabelLocal,
        addIndikator, updateIndikatorLocal, deleteIndikatorLocal,
        addPertanyaan, updatePertanyaanLocal, deletePertanyaanLocal,
        indikatorList,
    } = useKuesionerDetail(kuesionerId);

    /* ================= VARIABEL CRUD HOOK ================= */
    const variabel = useVariabel({
        kuesionerId,
        addVariabel,
        updateVariabelLocal,
        deleteVariabelLocal,
    });
    const deleteName = data?.variabel.find((v) => v.variabelId === variabel.deleteId)?.nama ?? "";

    /* ================= INDIKATOR CRUD HOOK ================= */
    const indikator = useIndikator({
        addIndikator,
        updateIndikatorLocal,
        deleteIndikatorLocal,
    });
    const deleteIndikatorName = data?.indikator.find((i) => i.indikatorId === indikator.deleteId)?.nama ?? "";

    const indikatorDefaultValues = indikator.editData
        ? {
            kode: indikator.editData.kode,
            nama: indikator.editData.nama,
            variabelId: indikator.editData.variabelId,
        }
        : undefined;

    /* ================= PERTANYAAN CRUD HOOK ================= */
    const pertanyaan = usePertanyaan({
        addPertanyaan,
        updatePertanyaanLocal,
        deletePertanyaanLocal,
    });

    const pertanyaanDefaultValues = pertanyaan.editData
        ? {
            teksPertanyaan: pertanyaan.editData.teksPertanyaan,
            urutan: pertanyaan.editData.urutan,
            indikatorId: pertanyaan.editData.indikatorId,
            templateType: 'custom' as const,
            customScales: Object.entries(pertanyaan.editData.labelSkala)
                .map(([value, label]) => ({
                    value: Number(value),
                    label: label,
                }))
                .sort((a, b) => a.value - b.value),
        }
        : undefined;

    /* ================= STATE RENDER ================= */
    if (loading) return <div className="p-20 text-center text-gray-500">Memuat detail kuesioner...</div>;
    if (error || !data) return <div className="p-20 text-center text-red-500">Gagal memuat data kuesioner</div>;

    return (
        <div className="flex flex-col gap-6 pb-12">
            {/* Header & Breadcrumb Container */}
            <div className="space-y-1">
                <PageHeader title="Detail Kuesioner" />
                <AppBreadcrumb
                    items={[
                        { label: "Kuesioner", href: "/admin/kuesioner" },
                        { label: `Detail: ${data.kuesioner.judul}` },
                    ]}
                />
            </div>

            <Card className="overflow-hidden border-none shadow-md">
                <CardHeader className="bg-slate-50/50 py-6 px-8 border-b">
                    <div className="space-y-1">
                        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Management Console</p>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                            {data.kuesioner.judul}
                        </h1>
                    </div>
                </CardHeader>

                <CardContent className="p-8 space-y-12">
                    {/* 1. INFORMASI DASAR */}
                    <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <KuesionerDetailContent kuesioner={data.kuesioner} />
                    </section>

                    <Separator />

                    {/* 2. VARIABEL SECTION */}
                    <section className="animate-in fade-in slide-in-from-bottom-2 duration-700">
                        <KuesionerVariabelSection
                            data={data.variabel}
                            onAdd={variabel.openCreate}
                            onEdit={variabel.openEdit}
                            onDelete={variabel.openDelete}
                        />
                    </section>

                    <Separator />

                    {/* 3. INDIKATOR SECTION */}
                    <section className="animate-in fade-in slide-in-from-bottom-2 duration-700">
                        <KuesionerIndikatorSection
                            indikator={data.indikator}
                            variabel={data.variabel}
                            onAdd={() => indikator.openCreate(data.variabel[0]?.variabelId ?? 0)}
                            onEdit={indikator.openEdit}
                            onDelete={indikator.openDelete}
                        />
                    </section>

                    <Separator />

                    {/* 4. PERTANYAAN SECTION */}
                    <section className="animate-in fade-in slide-in-from-bottom-2 duration-1000">
                        <KuesionerPertanyaanSection
                            pertanyaan={data.pertanyaan}
                            indikator={data.indikator}
                            variabel={data.variabel}
                            onAdd={() => pertanyaan.openCreate(data.indikator[0]?.indikatorId ?? 0)}
                            onEdit={pertanyaan.openEdit}
                            onDelete={pertanyaan.openDelete}
                        />
                    </section>
                </CardContent>
            </Card>

            {/* ================= MODALS & DIALOGS ================= */}
            
            {/* Variabel Modals */}
            <VariabelFormModal
                open={variabel.openForm}
                defaultValues={variabel.editData ? {
                    kode: variabel.editData.kode,
                    nama: variabel.editData.nama,
                    deskripsi: variabel.editData.deskripsi,
                } : undefined}
                isSubmitting={variabel.isSubmitting}
                onClose={variabel.closeForm}
                onSubmit={variabel.submitForm}
            />
            <VariabelDeleteDialog
                open={!!variabel.deleteId}
                nama={deleteName}
                onCancel={variabel.closeDelete}
                onConfirm={variabel.confirmDelete}
            />

            {/* Indikator Modals */}
            <IndikatorFormModal
                open={indikator.openForm}
                defaultValues={indikatorDefaultValues}
                isSubmitting={indikator.isSubmitting}
                onClose={indikator.closeForm}
                onSubmit={indikator.submitForm}
                variabelList={data.variabel}
                isEditMode={!!indikator.editData}
            />
            <IndikatorDeleteDialog
                open={!!indikator.deleteId}
                nama={deleteIndikatorName}
                onCancel={indikator.closeDelete}
                onConfirm={indikator.confirmDelete}
            />

            {/* Pertanyaan Modals */}
            <PertanyaanFormModal
                open={pertanyaan.openForm}
                defaultValues={pertanyaanDefaultValues}
                isSubmitting={pertanyaan.isSubmitting}
                onClose={pertanyaan.closeForm}
                onSubmit={pertanyaan.submitForm}
                indikatorList={indikatorList}
                isEditMode={!!pertanyaan.editData}
            />
            <PertanyaanDeleteDialog
                open={!!pertanyaan.deleteId}
                pertanyaanId={pertanyaan.deleteId}
                isDeleting={pertanyaan.isSubmitting}
                onClose={pertanyaan.closeDelete}
                onConfirm={pertanyaan.confirmDelete}
            />
        </div>
    );
}