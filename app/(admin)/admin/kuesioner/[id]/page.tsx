// fileName: page.tsx
"use client";

import { useParams } from "next/navigation";
import {
    useKuesionerDetail,
    useVariabel,
    useIndikator,
    usePertanyaan, // ✅ Import hook Pertanyaan
} from "@/features/kuesioner/detail/hooks";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import PageHeader from "@/components/common/page-header";
import AppBreadcrumb from "@/components/common/app-breadcrumb";

import { KuesionerDetailContent } from "@/features/kuesioner/detail/components/kuesioner-detail-content";
import { KuesionerVariabelSection } from "@/features/kuesioner/detail/components/kuesioner-variabel-section";
import { KuesionerIndikatorSection } from "@/features/kuesioner/detail/components/kuesioner-indikator-section";
import { KuesionerPertanyaanSection } from "@/features/kuesioner/detail/components/kuesioner-pertanyaan-section";

import { VariabelFormModal } from "@/features/kuesioner/detail/components/variabale-form-modal";
import { VariabelDeleteDialog } from "@/features/kuesioner/detail/components/variabel-delete-dialog";
import { IndikatorFormModal } from "@/features/kuesioner/detail/components/indikator-form-modal";
import { IndikatorDeleteDialog } from "@/features/kuesioner/detail/components/indikator-delete-dialog";
// ✅ Import komponen Pertanyaan baru
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
        // Helper Variabel & Indikator (sudah ada)
        addVariabel, updateVariabelLocal, deleteVariabelLocal,
        addIndikator, updateIndikatorLocal, deleteIndikatorLocal,

        // ✅ Helper Pertanyaan (BARU)
        addPertanyaan,
        updatePertanyaanLocal,
        deletePertanyaanLocal,

        // ✅ Data Turunan (BARU)
        indikatorList,
    } = useKuesionerDetail(kuesionerId);


    /* ================= VARIABEL CRUD HOOK ================= */
    const variabel = useVariabel({
        kuesionerId,
        addVariabel,
        updateVariabelLocal,
        deleteVariabelLocal,
    });
    const variabelToDelete = data?.variabel.find(
        (v) => v.variabelId === variabel.deleteId
    );
    const deleteName = variabelToDelete?.nama ?? "";


    /* ================= INDIKATOR CRUD HOOK ================= */
    const indikator = useIndikator({
        addIndikator,
        updateIndikatorLocal,
        deleteIndikatorLocal,
    });
    const indikatorToDelete = data?.indikator.find(
        (i) => i.indikatorId === indikator.deleteId
    );
    const deleteIndikatorName = indikatorToDelete?.nama ?? "";

    const indikatorDefaultValues = indikator.editData
        ? {
            kode: indikator.editData.kode,
            nama: indikator.editData.nama,
            variabelId: indikator.editData.variabelId,
        }
        : undefined;


    /* ================= PERTANYAAN CRUD HOOK (BARU) ================= */
    const pertanyaan = usePertanyaan({
        addPertanyaan,
        updatePertanyaanLocal,
        deletePertanyaanLocal,
    });

    const pertanyaanToDelete = data?.pertanyaan.find(
        (p) => p.pertanyaanId === pertanyaan.deleteId
    );
    const deletePertanyaanText = pertanyaanToDelete?.teksPertanyaan ?? "";

    // ✅ Siapkan default values untuk Pertanyaan Modal (Edit)
    const pertanyaanDefaultValues = pertanyaan.editData
        ? {
            teksPertanyaan: pertanyaan.editData.teksPertanyaan,
            urutan: pertanyaan.editData.urutan,
            indikatorId: pertanyaan.editData.indikatorId,

            // Transformasi labelSkala (Object API) menjadi customScales (Array Form)
            templateType: 'custom', // Selalu anggap kustom saat edit dari API
            customScales: Object.entries(pertanyaan.editData.labelSkala)
                .map(([value, label]) => ({
                    value: Number(value),
                    label: label,
                }))
                .sort((a, b) => a.value - b.value), // Pastikan urut 1, 2, 3...
        }
        : undefined;


    /* ================= STATE RENDER ================= */
    if (loading) return <p>Loading...</p>;
    if (error || !data) return <p>Gagal memuat data</p>;

    return (
        <>
            <PageHeader title="Detail Kuesioner" />

            <AppBreadcrumb
                className="pb-3"
                items={[
                    { label: "Kuesioner", href: "/admin/kuesioner" },
                    { label: `Detail: ${data.kuesioner.judul}` },
                ]}
            />

            <Card>
                <CardHeader className="border-b">
                    <h1 className="text-lg font-semibold">
                        {data.kuesioner.judul}
                    </h1>
                </CardHeader>

                <CardContent className="space-y-10">
                    {/* ================= INFORMASI ================= */}
                    <KuesionerDetailContent kuesioner={data.kuesioner} />

                    {/* ================= VARIABEL SECTION ================= */}
                    <KuesionerVariabelSection
                        data={data.variabel}
                        onAdd={variabel.openCreate}
                        onEdit={variabel.openEdit}
                        onDelete={variabel.openDelete}
                    />

                    {/* Variabel Form Modal (CREATE/EDIT) */}
                    <VariabelFormModal
                        open={variabel.openForm}
                        defaultValues={
                            variabel.editData
                                ? {
                                    kode: variabel.editData.kode,
                                    nama: variabel.editData.nama,
                                    deskripsi: variabel.editData.deskripsi,
                                }
                                : undefined
                        }
                        isSubmitting={variabel.isSubmitting}
                        onClose={variabel.closeForm}
                        onSubmit={variabel.submitForm}
                    />
                    {/* Variabel Delete Dialog */}
                    <VariabelDeleteDialog
                        open={!!variabel.deleteId}
                        nama={deleteName}
                        onCancel={variabel.closeDelete}
                        onConfirm={variabel.confirmDelete}
                    />

                    {/* ================= INDIKATOR SECTION ================= */}
                    <KuesionerIndikatorSection
                        indikator={data.indikator}
                        variabel={data.variabel}
                        onAdd={indikator.openCreate}
                        onEdit={indikator.openEdit}
                        onDelete={indikator.openDelete}
                    />

                    {/* Indikator Form Modal (CREATE/EDIT) */}
                    <IndikatorFormModal
                        open={indikator.openForm}
                        defaultValues={indikatorDefaultValues}
                        isSubmitting={indikator.isSubmitting}
                        onClose={indikator.closeForm}
                        onSubmit={indikator.submitForm}
                        variabelList={data.variabel}
                        isEditMode={!!indikator.editData}
                    />
                    {/* Indikator Delete Dialog */}
                    <IndikatorDeleteDialog
                        open={!!indikator.deleteId}
                        nama={deleteIndikatorName}
                        onCancel={indikator.closeDelete}
                        onConfirm={indikator.confirmDelete}
                    />


                    {/* ================= PERTANYAAN SECTION ================= */}
                    <KuesionerPertanyaanSection
                        pertanyaan={data.pertanyaan}
                        indikator={data.indikator}
                        variabel={data.variabel}
                        // ✅ Kirim fungsi CRUD yang sebenarnya
                        onAdd={pertanyaan.openCreate}
                        onEdit={pertanyaan.openEdit}
                        onDelete={pertanyaan.openDelete}
                    />
                </CardContent>
            </Card>

            {/* ================= PERTANYAAN MODALS (BARU) ================= */}

            {/* Pertanyaan Form Modal (CREATE/EDIT) */}
            <PertanyaanFormModal
                open={pertanyaan.openForm}
                defaultValues={pertanyaanDefaultValues}
                isSubmitting={pertanyaan.isSubmitting}
                onClose={pertanyaan.closeForm}
                onSubmit={pertanyaan.submitForm}
                indikatorList={indikatorList} // Kirim list indikator untuk Select
                isEditMode={!!pertanyaan.editData}
            />

            {/* Pertanyaan Delete Dialog */}
            <PertanyaanDeleteDialog
                open={!!pertanyaan.deleteId}
                pertanyaanId={pertanyaan.deleteId}
                isDeleting={pertanyaan.isSubmitting}
                // Tampilkan 30 karakter pertama teks pertanyaan sebagai konfirmasi
                onClose={pertanyaan.closeDelete}
                onConfirm={pertanyaan.confirmDelete}
            />
        </>
    );
}