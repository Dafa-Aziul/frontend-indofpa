// src/features/analisis/detail/hooks/use-analisis-detail.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { AnalisisDetailData, FilterPayload } from "./types";
import { getAnalisisDetail } from "./services";

export function useAnalisisDetail(
  kuesionerId: number,
  filters: FilterPayload = {}
) {
  const [data, setData] = useState<AnalisisDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  // TAMBAHKAN INI: Status khusus untuk config yang hilang
  const [isConfigMissing, setIsConfigMissing] = useState(false);

  const filterString = JSON.stringify(filters);

  const fetchData = useCallback(async () => {
    if (isNaN(kuesionerId) || kuesionerId <= 0) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setIsError(false);
    setIsConfigMissing(false); // Reset status

    try {
      const res = await getAnalisisDetail(kuesionerId, filters);
      setData(res);
    } catch (err: any) {
      // CEK ERROR DARI BACKEND
      const errorMessage = err.response?.data?.message || err.message;

      if (
        err.response?.status === 400 &&
        errorMessage.includes("AnalisisConfig")
      ) {
        // Jika hanya masalah config, jangan anggap sebagai error fatal
        setIsConfigMissing(true);
      } else {
        setIsError(true);
        toast.error(errorMessage || "Gagal mengambil data");
      }
    } finally {
      setIsLoading(false);
    }
  }, [kuesionerId, filterString]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    isError,
    isConfigMissing, // Ekspos status ini
    refetch: fetchData,
  };
}
