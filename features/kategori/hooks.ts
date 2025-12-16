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
  const [data, setData] = useState<Kategori[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState<Kategori | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      const res = await getKategori({
        page,
        limit: 10,
        search,
      });

      // ✅ SESUAI RESPONSE API ANDA
      setData(Array.isArray(res.data) ? res.data : []);
      setMeta(res.meta ?? null);
    } catch {
      setIsError(true);
      setData([]);
      setMeta(null);
    } finally {
      setIsLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
        err instanceof Error ? err.message : "Gagal menyimpan kategori"
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
        err instanceof Error ? err.message : "Gagal menghapus kategori"
      );
    } finally {
      setDeleteId(null);
    }
  };

  return {
    data,
    meta, // ⬅️ PENTING
    page,
    setPage,
    search,
    setSearch,
    isLoading,
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
