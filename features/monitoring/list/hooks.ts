// fileName: src/features/monitoring/hooks.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import {
  MonitoringFilterParams,
  MonitoringResponse,
  MonitoringRow,
} from "./types";
import { getMonitoringList } from "./services";

// ======================================================
// ERROR UTILITY
// ======================================================

interface ApiResponseError {
  response?: {
    data?: {
      message?: string | string[];
    };
  };
}

function getApiErrorMessage(
  error: unknown,
  defaultMessage = "Gagal memproses permintaan"
): string {
  const apiError = error as ApiResponseError;

  if (apiError?.response?.data?.message) {
    const message = apiError.response.data.message;
    if (typeof message === "string") return message;
    if (Array.isArray(message) && message.length > 0) return message[0];
  }

  if (error instanceof Error) {
    return error.message;
  }

  return defaultMessage;
}

const DEFAULT_LIMIT = 10;

export function useMonitoring() {
  const [data, setData] = useState<MonitoringRow[]>([]);
  const [meta, setMeta] = useState<MonitoringResponse["meta"] | null>(null);

  // ======================
  // FILTER & PAGINATION
  // ======================
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // 🔹 DEBOUNCED STATE
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [debouncedStatus, setDebouncedStatus] = useState("");

  // ======================
  // UX STATE
  // ======================
  const [isFetching, setIsFetching] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isError, setIsError] = useState(false);

  // ======================
  // DEBOUNCE FILTER (500ms)
  // ======================
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setDebouncedStatus(statusFilter);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, statusFilter]);

  // ======================
  // FETCH DATA (SMOOTH)
  // ======================
  const fetchData = useCallback(async () => {
    setIsError(false);
    setIsFetching(true);

    // ⏳ Loader muncul hanya jika fetch lama
    const loaderTimer = setTimeout(() => {
      setShowLoader(true);
    }, 200);

    try {
      const params: MonitoringFilterParams = {
        page,
        limit: DEFAULT_LIMIT,
        search: debouncedSearch || undefined,
        status: debouncedStatus || undefined,
      };

      const res = await getMonitoringList(params);

      setData(res.data);
      setMeta(res.meta);
    } catch (e: unknown) {
      setIsError(true);
      toast.error(getApiErrorMessage(e, "Gagal memuat data monitoring."));
    } finally {
      clearTimeout(loaderTimer);
      setIsFetching(false);

      // ✨ Fade out loader
      setTimeout(() => setShowLoader(false), 150);
    }
  }, [page, debouncedSearch, debouncedStatus]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    // DATA
    data,
    meta,

    // UX
    isFetching,
    showLoader,
    isError,

    // CONTROLS
    page,
    setPage,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,

    refetch: fetchData,
  };
}