// fileName: hooks.ts
"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

import {
  getKuesioner,
  createKuesioner,
  updateKuesioner,
  deleteKuesioner,
  getKategori,
  createDistribusi,
  patchDistribusi,
} from "./services";

import { Kuesioner } from "./types";
import { KuesionerFormValues, KuesionerDistribusiValues } from "./schemas";

/* ================= TYPES ================= */

type Meta = {
  page: number;
  limit: number;
  total: number;
  pages: number;
};

type Kategori = {
  kategoriId: number;
  nama: string;
};

/* ================= ERROR UTILITY ================= */

/**
 * Helper untuk mengekstrak pesan error dari respons API.
 * Asumsi: respons error memiliki format error.response.data.message
 */
function getApiErrorMessage(
  error: unknown,
  defaultMessage: string = "Gagal memproses permintaan",
) {
  // Casting ke any di sini diperbolehkan karena error response Axios sangat dinamis
  const err = error as {
    response?: { data?: { message?: string | string[] } };
  };

  if (err?.response?.data?.message) {
    const msg = err.response.data.message;
    return Array.isArray(msg) ? msg[0] : msg;
  }

  if (error instanceof Error) return error.message;
  return defaultMessage;
}

/* ================= HOOK ================= */

export function useKuesioner() {
  /* ===== DATA ===== */
  const LIMIT = 10;
  const [data, setData] = useState<Kuesioner[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);

  /* ===== KATEGORI ===== */
  const [kategori, setKategori] = useState<Kategori[]>([]);
  const [isKategoriLoading, setIsKategoriLoading] = useState(false);

  /* ===== FILTER ===== */
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  /* ===== STATE ===== */
  const [isLoading, setIsLoading] = useState(true); // FIRST LOAD
  const [isFetching, setIsFetching] = useState(false); // SEARCH / PAGE
  const [isError, setIsError] = useState(false);

  /* ===== FORM KUESIONER ===== */
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState<Kuesioner | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  /* ===== DISTRIBUSI ===== */
  const [openShare, setOpenShare] = useState(false);
  const [editDistribusiId, setEditDistribusiId] = useState<number | null>(null);
  const [shareKuesionerId, setShareKuesionerId] = useState<number | null>(null);
  const [distribusiMode, setDistribusiMode] = useState<
    "create" | "edit" | null
  >(null);

  const [distribusiDefaultValues, setDistribusiDefaultValues] =
    useState<KuesionerDistribusiValues | null>(null);

  /* ================= FETCH ================= */

  const fetchData = useCallback(async () => {
    setIsFetching(true);
    setIsFetching(true);
    setIsError(false);
    
    try {
      const res = await getKuesioner({
        page,
        limit: LIMIT,
        search: debouncedSearch,
      });

      setData(Array.isArray(res.data) ? res.data : []);
      setMeta(res.meta ?? null);
    } catch (e) {
      setIsError(true);
      setData([]);
      setMeta(null);
      toast.error(getApiErrorMessage(e, "Gagal memuat daftar kuesioner"));
    } finally {
      setIsFetching(false);

      if (isLoading) setIsLoading(false);
    }
  }, [page, debouncedSearch, isLoading]);

  const fetchKategori = useCallback(async () => {
    try {
      setIsKategoriLoading(true);
      const res = await getKategori();
      setKategori(Array.isArray(res) ? res : []);
    } catch (e) {
      // ✅ Tangkap error
      toast.error(getApiErrorMessage(e, "Gagal memuat kategori")); // ✅ Pakai utilitas
      setKategori([]);
    } finally {
      setIsKategoriLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchKategori();
  }, [fetchKategori]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /* ================= SUBMIT KUESIONER ================= */

  const submitForm = async (values: KuesionerFormValues) => {
    try {
      if (editData) {
        const payload: Partial<KuesionerFormValues> = {};
        const keys = Object.keys(values) as (keyof KuesionerFormValues)[];

        keys.forEach((key) => {
          const newValue = values[key];
          const oldValue = (editData as unknown as KuesionerFormValues)[key];

          if (newValue !== oldValue) {
            Object.assign(payload, { [key]: newValue });
          }
        });

        if (Object.keys(payload).length === 0) {
          toast.info("Tidak ada perubahan data");
          return;
        }

        await updateKuesioner(editData.kuesionerId, payload);
        toast.success("Kuesioner berhasil diperbarui");
      } else {
        await createKuesioner(values);
        toast.success("Kuesioner berhasil ditambahkan");
      }

      setOpenForm(false);
      setEditData(null);
      fetchData();
    } catch (e) {
      toast.error(getApiErrorMessage(e, "Gagal menyimpan kuesioner"));
    }
  };

  /* ================= DELETE ================= */

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteKuesioner(deleteId);
      toast.success("Kuesioner berhasil dihapus");
      fetchData();
    } catch (e) {
      // ✅ Tangkap error
      toast.error(getApiErrorMessage(e, "Gagal menghapus kuesioner")); // ✅ Pakai utilitas
    } finally {
      setDeleteId(null);
    }
  };

  /* ================= OPEN DISTRIBUSI ================= */

  const openShareDialog = (kuesionerId: number) => {
    const row = data.find((k) => k.kuesionerId === kuesionerId);
    setShareKuesionerId(kuesionerId); // Tambahkan set ID di sini

    const distribusi = row?.distribusi?.[0];

    if (distribusi) {
      // ===== EDIT =====
      setDistribusiMode("edit");
      setEditDistribusiId(distribusi.distribusiId);
      setDistribusiDefaultValues({
        tanggalMulai: distribusi.tanggalMulai.slice(0, 10),
        tanggalSelesai: distribusi.tanggalSelesai.slice(0, 10),
      });
    } else {
      // ===== CREATE =====
      setDistribusiMode("create");
      setEditDistribusiId(null);
      setDistribusiDefaultValues(null);
    }

    setOpenShare(true);
  };

  /* ================= CLOSE DISTRIBUSI ================= */

  const closeShareDialog = () => {
    setOpenShare(false);
    setEditDistribusiId(null);
    setShareKuesionerId(null);
    setDistribusiDefaultValues(null);
    setDistribusiMode(null);
  };

  /* ================= SUBMIT DISTRIBUSI ================= */

  const submitShare = async (values: KuesionerDistribusiValues) => {
    try {
      if (editDistribusiId) {
        // PATCH
        if (!distribusiDefaultValues) return;

        const payload: Partial<KuesionerDistribusiValues> = {};

        (Object.keys(values) as (keyof KuesionerDistribusiValues)[]).forEach(
          (key) => {
            if (values[key] !== distribusiDefaultValues[key]) {
              payload[key] = values[key];
            }
          },
        );

        if (Object.keys(payload).length === 0) {
          toast.info("Tidak ada perubahan distribusi");
          return;
        }

        await patchDistribusi(editDistribusiId, payload);
        toast.success("Distribusi berhasil diperbarui");
      } else {
        // CREATE
        if (!shareKuesionerId) return;

        await createDistribusi(shareKuesionerId, values);
        toast.success("Distribusi berhasil dibuat");
      }

      closeShareDialog();
      fetchData();
    } catch (e) {
      toast.error(getApiErrorMessage(e, "Gagal menyimpan distribusi")); // ✅ Pakai utilitas
    }
  };

  /* ================= RETURN ================= */

  return {
    data,
    meta,
    kategori,
    isKategoriLoading,

    page,
    setPage,
    search,
    setSearch,
    limit: LIMIT,

    isLoading, // FIRST LOAD (skeleton)
    isFetching,
    isError,

    // Kuesioner Form
    openForm,
    setOpenForm,
    editData,
    setEditData,

    // Kuesioner Delete
    deleteId,
    setDeleteId,

    // Distribusi/Share
    openShare,
    distribusiMode,
    distribusiDefaultValues,
    openShareDialog,
    closeShareDialog,
    submitShare,

    // Mutasi
    submitForm,
    confirmDelete,
    refetch: fetchData,
  };
}
