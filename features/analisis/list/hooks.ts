// src/features/analisis/list/hooks/useAnalisis.ts
"use client";

import { useState, useCallback, useMemo } from "react";
// PERBAIKAN PATH: Menggunakan path yang benar (dua tingkat ke atas)
import { getAnalisisList } from "./services";
import { AnalisisItem, AnalisisMeta } from "./schemas";

type AnalisisState = {
  data: AnalisisItem[];
  meta: AnalisisMeta | null;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;

  // Pagination & Search States
  page: number;
  setPage: (page: number) => void;
  limit: number;
  search: string;
  setSearch: (search: string) => void;
};

export function useAnalisis(): AnalisisState {
  const DEFAULT_LIMIT = 10;

  const [data, setData] = useState<AnalisisItem[]>([]);
  const [meta, setMeta] = useState<AnalisisMeta | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit] = useState(DEFAULT_LIMIT);

  const fetchData = useCallback(async () => {
    // Tambahkan delay kecil untuk debounce search (opsional)
    // await new Promise(resolve => setTimeout(resolve, 300));

    setIsLoading(true);
    setIsError(false);
    try {
      const result = await getAnalisisList({ page, limit, search });
      setData(result.data);
      setMeta(result.meta);
    } catch (error) {
      console.error("Gagal fetch analisis:", error);
      setIsError(true);
      setData([]);
      setMeta(null);
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, search]);

  useMemo(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    meta,
    isLoading,
    isError,
    refetch,
    page,
    setPage,
    limit,
    search,
    setSearch,
  };
}
