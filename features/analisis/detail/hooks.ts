"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import axios from "axios";
import { AnalisisDetailData, FilterPayload } from "./types";
import { getAnalisisDetail } from "./services";

interface BackendError {
  message?: string;
}

export function useAnalisisDetail(
  kuesionerId: number,
  filters: FilterPayload = {},
) {
  const [data, setData] = useState<AnalisisDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isConfigMissing, setIsConfigMissing] = useState(false);

  // Kita stringify filters supaya bisa jadi pembanding yang stabil
  const serializedFilters = JSON.stringify(filters);

  const fetchData = useCallback(async () => {
    if (isNaN(kuesionerId) || kuesionerId <= 0) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setIsError(false);
    setIsConfigMissing(false);

    try {
      // Gunakan filters dari argumen hook
      const res = await getAnalisisDetail(kuesionerId, filters);
      setData(res);
    } catch (err) {
      if (axios.isAxiosError<BackendError>(err)) {
        const errorMessage = err.response?.data?.message || err.message;

        if (
          err.response?.status === 400 &&
          errorMessage.includes("AnalisisConfig")
        ) {
          setIsConfigMissing(true);
        } else {
          setIsError(true);
          toast.error(errorMessage || "Gagal mengambil data");
        }
      } else {
        setIsError(true);
        const unexpectedError =
          err instanceof Error ? err.message : "Terjadi kesalahan sistem";
        toast.error(unexpectedError);
      }
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kuesionerId, serializedFilters]);
  // ^^^ Kita pake serializedFilters di sini supaya referensi fungsinya
  // cuma berubah kalau isi filternya beneran beda, bukan karena object reference baru.

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    isError,
    isConfigMissing,
    refetch: fetchData,
  };
}
