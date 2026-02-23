"use client";

import { useState, useCallback, useEffect } from "react";
import { getAnalisisList } from "./services";
import { AnalisisItem, AnalisisMeta } from "./schemas";

type AnalisisState = {
  data: AnalisisItem[];
  meta: AnalisisMeta | null;

  isLoading: boolean;   // hanya first load
  isFetching: boolean; // search & pagination
  isError: boolean;

  refetch: () => void;

  page: number;
  setPage: (page: number) => void;
  limit: number;

  search: string;
  setSearch: (search: string) => void;
};

export function useAnalisis(): AnalisisState {
  const LIMIT = 10;

  const [data, setData] = useState<AnalisisItem[]>([]);
  const [meta, setMeta] = useState<AnalisisMeta | null>(null);

  const [isLoading, setIsLoading] = useState(true);     // FIRST LOAD
  const [isFetching, setIsFetching] = useState(false); // SEARCH / PAGE
  const [isError, setIsError] = useState(false);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // ======================
  // DEBOUNCE SEARCH (500ms)
  // ======================
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // ======================
  // FETCH DATA
  // ======================
  const fetchData = useCallback(async () => {
    setIsFetching(true);
    setIsError(false);

    try {
      const result = await getAnalisisList({
        page,
        limit: LIMIT,
        search: debouncedSearch,
      });

      setData(result.data);
      setMeta(result.meta);
    } catch (error) {
      console.error("Gagal fetch analisis:", error);
      setIsError(true);
    } finally {
      setIsFetching(false);
      setIsLoading(false); // hanya mati sekali setelah fetch pertama
    }
  }, [page, debouncedSearch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    meta,
    isLoading,
    isFetching,
    isError,
    refetch: fetchData,
    page,
    setPage,
    limit: LIMIT,
    search,
    setSearch,
  };
}