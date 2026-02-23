"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import {
  getKategori,
  createKategori,
  updateKategori,
  deleteKategori,
} from "./services";
import { Kategori } from "./types";
import { KategoriFormValues } from "./schemas";

type Meta = {
  page: number;
  limit: number;
  total: number;
  pages: number;
  search: string | null;
};

export function useKategori() {
  const LIMIT = 10;

  const [data, setData] = useState<Kategori[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);

  const [page, setPage] = useState(1);

  // 🔹 SEARCH STATE
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // 🔹 LOADING STATE
  const [isLoading, setIsLoading] = useState(true); // first load
  const [isFetching, setIsFetching] = useState(false); // search / pagination
  const [isError, setIsError] = useState(false);

  // 🔹 UI STATE
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState<Kategori | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // ======================
  // DEBOUNCE SEARCH (500ms)
  // ======================
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // reset page saat search berubah
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // ======================
  // FETCH DATA
  // ======================
  const fetchData = useCallback(async () => {
    // 🔑 first load vs fetch berikutnya
    setIsFetching(!isLoading);
    setIsError(false);

    try {
      const res = await getKategori({
        page,
        limit: LIMIT,
        search: debouncedSearch || undefined,
      });

      setData(Array.isArray(res.data) ? res.data : []);
      setMeta(res.meta ?? null);
    } catch {
      setIsError(true);
      setData([]);
      setMeta(null);
    } finally {
      setIsFetching(false);
      setIsLoading(false);
    }
  }, [page, debouncedSearch, isLoading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ======================
  // CRUD ACTIONS
  // ======================
  const submitForm = async (values: KategoriFormValues) => {
    try {
      if (editData) {
        await updateKategori(editData.kategoriId, values);
        toast.success("Kategori diperbarui");
      } else {
        await createKategori(values);
        toast.success("Kategori ditambahkan");
      }

      setOpenForm(false);
      setEditData(null);
      fetchData();
    } catch (err: unknown) {
      toast.error(
        err instanceof Error ? err.message : "Gagal menyimpan kategori",
      );
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteKategori(deleteId);
      toast.success("Kategori dihapus");
      fetchData();
    } catch (err: unknown) {
      toast.error(
        err instanceof Error ? err.message : "Gagal menghapus kategori",
      );
    } finally {
      setDeleteId(null);
    }
  };

  return {
    data,
    meta,

    page,
    setPage,

    search,
    setSearch,

    isLoading,
    isFetching,
    isError,

    openForm,
    setOpenForm,
    editData,
    setEditData,
    deleteId,
    setDeleteId,

    submitForm,
    confirmDelete,
    refetch: fetchData,
  };
}
