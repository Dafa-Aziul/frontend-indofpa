"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import { z } from "zod";
import {
  getKuesionerDetail,
  createVariabel,
  updateVariabel,
  deleteVariabel,
  createIndikator,
  updateIndikator,
  deleteIndikator,
  createPertanyaan,
  updatePertanyaan,
  deletePertanyaan,
  PertanyaanApiPayload,
} from "./services";
import {
  KuesionerDetailResponse,
  Variabel,
  Indikator,
  Pertanyaan,
} from "./types";
import {
  VariabelFormValues,
  PertanyaanFormValues,
  indikatorSchema,
} from "./schemas";

function getApiErrorMessage(
  error: unknown,
  defaultMessage: string = "Terjadi kesalahan"
): string {
  if (error instanceof Error) {
    return error.message;
  }
  return defaultMessage;
}

/* ======================================================
    KUESIONER DETAIL (SOURCE OF TRUTH)
====================================================== */

export function useKuesionerDetail(id: number) {
  const [data, setData] = useState<KuesionerDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchDetail = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await getKuesionerDetail(id);
      setData(res);
    } catch {
      setError(true);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetchDetail();
  }, [id, fetchDetail]);

  const addVariabel = (row: Variabel) => {
    setData((prev) =>
      prev ? { ...prev, variabel: [...prev.variabel, row] } : prev
    );
  };
  const updateVariabelLocal = (row: Variabel) => {
    setData((prev) =>
      prev
        ? {
            ...prev,
            variabel: prev.variabel.map((v) =>
              v.variabelId === row.variabelId ? row : v
            ),
          }
        : prev
    );
  };
  const deleteVariabelLocal = (id: number) => {
    setData((prev) =>
      prev
        ? {
            ...prev,
            variabel: prev.variabel.filter((v) => v.variabelId !== id),
          }
        : prev
    );
  };

  const addIndikator = (row: Indikator) => {
    setData((prev) =>
      prev ? { ...prev, indikator: [...prev.indikator, row] } : prev
    );
  };
  const updateIndikatorLocal = (row: Indikator) => {
    setData((prev) =>
      prev
        ? {
            ...prev,
            indikator: prev.indikator.map((i) =>
              i.indikatorId === row.indikatorId ? row : i
            ),
          }
        : prev
    );
  };
  const deleteIndikatorLocal = (id: number) => {
    setData((prev) =>
      prev
        ? {
            ...prev,
            indikator: prev.indikator.filter((i) => i.indikatorId !== id),
          }
        : prev
    );
  };

  const addPertanyaan = (row: Pertanyaan) => {
    setData((prev) =>
      prev ? { ...prev, pertanyaan: [...prev.pertanyaan, row] } : prev
    );
  };
  const updatePertanyaanLocal = (row: Pertanyaan) => {
    setData((prev) =>
      prev
        ? {
            ...prev,
            pertanyaan: prev.pertanyaan.map((p) =>
              p.pertanyaanId === row.pertanyaanId ? row : p
            ),
          }
        : prev
    );
  };
  const deletePertanyaanLocal = (id: number) => {
    setData((prev) =>
      prev
        ? {
            ...prev,
            pertanyaan: prev.pertanyaan.filter((p) => p.pertanyaanId !== id),
          }
        : prev
    );
  };

  const indikatorList = useMemo(() => {
    if (!data) return [];
    return data.indikator.map((i) => ({
      indikatorId: i.indikatorId,
      label: `[${i.kode}] ${i.nama} (Variabel ${i.variabelId})`,
    }));
  }, [data]);

  return {
    data,
    loading,
    error,
    refetch: fetchDetail,
    indikatorList,
    addVariabel,
    updateVariabelLocal,
    deleteVariabelLocal,
    addIndikator,
    updateIndikatorLocal,
    deleteIndikatorLocal,
    addPertanyaan,
    updatePertanyaanLocal,
    deletePertanyaanLocal,
  };
}

/* ======================================================
    VARIABEL CRUD
====================================================== */

type UseVariabelProps = {
  kuesionerId: number;
  addVariabel: (v: Variabel) => void;
  updateVariabelLocal: (v: Variabel) => void;
  deleteVariabelLocal: (id: number) => void;
};

export function useVariabel({
  kuesionerId,
  addVariabel,
  updateVariabelLocal,
  deleteVariabelLocal,
}: UseVariabelProps) {
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState<Variabel | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openCreate = () => {
    setEditData(null);
    setOpenForm(true);
  };
  const openEdit = (row: Variabel) => {
    setEditData(row);
    setOpenForm(true);
  };
  const closeForm = () => {
    setOpenForm(false);
    setEditData(null);
  };
  const openDelete = (id: number) => setDeleteId(id);
  const closeDelete = () => setDeleteId(null);

  const submitForm = async (values: VariabelFormValues) => {
    try {
      setIsSubmitting(true);
      if (editData) {
        const res = await updateVariabel(editData.variabelId, values);
        updateVariabelLocal(res);
        toast.success("Variabel berhasil diperbarui");
      } else {
        const res = await createVariabel(kuesionerId, values);
        addVariabel(res);
        toast.success("Variabel berhasil ditambahkan");
      }
      closeForm();
    } catch (e) {
      const errorMessage = getApiErrorMessage(e, "Gagal menyimpan variabel");
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    const idToDelete = deleteId;
    try {
      setIsSubmitting(true);
      await deleteVariabel(idToDelete); // 1. Hapus di Backend dulu
      deleteVariabelLocal(idToDelete); // 2. Jika sukses, baru hapus di UI
      toast.success("Variabel berhasil dihapus");
      closeDelete();
    } catch (e) {
      const errorMessage = getApiErrorMessage(e, "Gagal menghapus variabel");
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    openForm,
    editData,
    isSubmitting,
    deleteId,
    openCreate,
    openEdit,
    closeForm,
    submitForm,
    openDelete,
    closeDelete,
    confirmDelete,
  };
}

/* ======================================================
    INDIKATOR CRUD
====================================================== */

const IndikatorFormExtendedSchema = indikatorSchema.extend({
  variabelId: z.number().int().min(1),
});

type IndikatorFormExtendedValues = z.infer<typeof IndikatorFormExtendedSchema>;

type UseIndikatorProps = {
  addIndikator: (v: Indikator) => void;
  updateIndikatorLocal: (v: Indikator) => void;
  deleteIndikatorLocal: (id: number) => void;
};

export function useIndikator({
  addIndikator,
  updateIndikatorLocal,
  deleteIndikatorLocal,
}: UseIndikatorProps) {
  const [openForm, setOpenForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [editData, setEditData] = useState<Indikator | null>(null);
  const [variabelIdForCreate, setVariabelIdForCreate] = useState<number | null>(
    null
  );

  const openCreate = (variabelId: number) => {
    setEditData(null);
    setVariabelIdForCreate(variabelId);
    setOpenForm(true);
  };
  const openEdit = (row: Indikator) => {
    setEditData(row);
    setVariabelIdForCreate(row.variabelId);
    setOpenForm(true);
  };
  const closeForm = () => {
    setOpenForm(false);
    setEditData(null);
    setVariabelIdForCreate(null);
  };

  const submitForm = async (values: IndikatorFormExtendedValues) => {
    try {
      setIsSubmitting(true);
      const { variabelId, ...payload } = values;
      if (editData) {
        const res = await updateIndikator(editData.indikatorId, payload);
        updateIndikatorLocal(res);
        toast.success("Indikator berhasil diperbarui");
      } else {
        const res = await createIndikator(variabelId, payload);
        addIndikator(res);
        toast.success("Indikator berhasil ditambahkan");
      }
      closeForm();
    } catch (e) {
      const errorMessage = getApiErrorMessage(e, "Gagal menyimpan indikator");
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDelete = (id: number) => setDeleteId(id);
  const closeDelete = () => setDeleteId(null);

  const confirmDelete = async () => {
    if (!deleteId) return;
    const idToDelete = deleteId;
    try {
      setIsSubmitting(true);
      await deleteIndikator(idToDelete); // 1. Hapus di Backend dulu
      deleteIndikatorLocal(idToDelete); // 2. Jika sukses, baru hapus di UI
      toast.success("Indikator berhasil dihapus");
      closeDelete();
    } catch (e) {
      const errorMessage = getApiErrorMessage(e, "Gagal menghapus indikator");
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    openForm,
    editData,
    isSubmitting,
    deleteId,
    openCreate,
    openEdit,
    closeForm,
    submitForm,
    openDelete,
    closeDelete,
    confirmDelete,
  };
}

/* ======================================================
    PERTANYAAN CRUD
====================================================== */

type UsePertanyaanProps = {
  addPertanyaan: (p: Pertanyaan) => void;
  updatePertanyaanLocal: (p: Pertanyaan) => void;
  deletePertanyaanLocal: (id: number) => void;
};

export function usePertanyaan({
  addPertanyaan,
  updatePertanyaanLocal,
  deletePertanyaanLocal,
}: UsePertanyaanProps) {
  const [openForm, setOpenForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [editData, setEditData] = useState<Pertanyaan | null>(null);
  const [indikatorIdForCreate, setIndikatorIdForCreate] = useState<
    number | null
  >(null);

  const openCreate = (indikatorId: number) => {
    setEditData(null);
    setIndikatorIdForCreate(indikatorId);
    setOpenForm(true);
  };
  const openEdit = (row: Pertanyaan) => {
    setEditData(row);
    setIndikatorIdForCreate(row.indikatorId);
    setOpenForm(true);
  };
  const closeForm = () => {
    setOpenForm(false);
    setEditData(null);
    setIndikatorIdForCreate(null);
  };

  const submitForm = async (values: PertanyaanFormValues) => {
    try {
      setIsSubmitting(true);

      if (!values.customScales) {
        toast.error("Gagal: Skala respon tidak terdefinisi.");
        return;
      }

      const labelSkala: Record<string, string> = values.customScales.reduce(
        (acc, item) => {
          acc[String(item.value)] = item.label;
          return acc;
        },
        {} as Record<string, string>
      );

      const apiPayload: PertanyaanApiPayload = {
        teksPertanyaan: values.teksPertanyaan,
        urutan: values.urutan,
        labelSkala: labelSkala,
      };

      if (editData && editData.pertanyaanId) {
        const res = await updatePertanyaan(editData.pertanyaanId, apiPayload);
        updatePertanyaanLocal(res);
        toast.success("Pertanyaan berhasil diperbarui");
      } else {
        const targetIndikatorId = values.indikatorId ?? indikatorIdForCreate;
        if (!targetIndikatorId) {
          toast.error("Gagal: Indikator ID tidak ditemukan.");
          return;
        }

        const res = await createPertanyaan(targetIndikatorId, apiPayload);
        addPertanyaan(res);
        toast.success("Pertanyaan berhasil ditambahkan");
      }

      closeForm();
    } catch (e) {
      const errorMessage = getApiErrorMessage(e, "Gagal menyimpan pertanyaan");
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDelete = (id: number) => setDeleteId(id);
  const closeDelete = () => setDeleteId(null);

  const confirmDelete = async () => {
    if (!deleteId) return;
    const idToDelete = deleteId;
    try {
      setIsSubmitting(true);
      await deletePertanyaan(idToDelete); // 1. Hapus di Backend dulu
      deletePertanyaanLocal(idToDelete); // 2. Jika sukses, baru hapus di UI
      toast.success("Pertanyaan berhasil dihapus");
      closeDelete();
    } catch (e) {
      const errorMessage = getApiErrorMessage(e, "Gagal menghapus pertanyaan");
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    openForm,
    editData,
    isSubmitting,
    deleteId,
    indikatorIdForCreate,
    openCreate,
    openEdit,
    closeForm,
    submitForm,
    openDelete,
    closeDelete,
    confirmDelete,
  };
}
