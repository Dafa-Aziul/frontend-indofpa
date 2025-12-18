// fileName: src/features/analisis/detail/hooks/use-analisis-detail.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
// 1. Sesuaikan import AnalisisDetailData
import { AnalisisDetailData } from "./types"; // Mengganti './types' menjadi '../types' jika file types.ts berada di root fitur

// 2. Sesuaikan import FilterPayload
// Asumsi: FilterPayload didefinisikan/diekspor dari '@/features/analisis/detail/types'
import { FilterPayload } from "@/features/analisis/detail/types"; // Menggunakan path absolut yang benar (asumsi sudah diperbaiki di types.ts)
import { getAnalisisDetail } from "./services"; // Mengganti './services' menjadi '../services' (Asumsi services.ts berada di root fitur)

// Asumsi getApiErrorMessage ada di project Anda
function getApiErrorMessage(
  error: unknown,
  defaultMessage: string = "Gagal memuat data"
) {
  if (error instanceof Error) return error.message;
  return defaultMessage;
}

// ======================================================
// HOOK DIPERBARUI: Menerima filters sebagai argumen kedua
// ======================================================
export function useAnalisisDetail(
  kuesionerId: number,
  filters: FilterPayload = {}
) {
  // State tetap sama
  const [data, setData] = useState<AnalisisDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    if (isNaN(kuesionerId) || kuesionerId <= 0) {
      setIsLoading(false);
      setIsError(true);
      return;
    }

    setIsLoading(true);
    setIsError(false);

    try {
      // Mengirim objek filters ke service
      const res = await getAnalisisDetail(kuesionerId, filters);

      setData(res);
    } catch (e: unknown) {
      setIsError(true);
      toast.error(
        getApiErrorMessage(e, `Gagal memuat detail analisis ID ${kuesionerId}`)
      );
    } finally {
      setIsLoading(false);
    }
    // filters di dependency array sudah benar: perubahan pada filters (dari parent) akan memicu
    // perubahan pada fetchData, yang kemudian memicu useEffect.
  }, [kuesionerId, filters]);

  useEffect(() => {
    if (isNaN(kuesionerId) || kuesionerId <= 0) {
      setIsLoading(false);
      setIsError(true);
      return;
    }
    fetchData(); // fetchData akan berubah hanya jika kuesionerId atau filters berubah.
  }, [fetchData, kuesionerId]); // kuesionerId di dependency array useEffect tidak diperlukan karena sudah ada di fetchData, tapi tidak salah jika dipertahankan.

  return {
    data,
    isLoading,
    isError,
    refetch: fetchData,
  };
}