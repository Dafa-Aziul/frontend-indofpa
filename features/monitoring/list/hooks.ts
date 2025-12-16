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
// ERROR UTILITY (Menggunakan unknown dan type checking)
// ======================================================

interface ApiResponseError {
  response?: {
    data?: {
      message?: string | string[];
    };
  };
}

function getApiErrorMessage(
  error: unknown, // ✅ Ganti 'any' menjadi 'unknown'
  defaultMessage: string = "Gagal memproses permintaan"
): string {
  const apiError = error as ApiResponseError; // Casting sementara untuk pengecekan respons umum

  if (
    apiError &&
    apiError.response &&
    apiError.response.data &&
    apiError.response.data.message
  ) {
    const message = apiError.response.data.message;

    if (typeof message === "string") {
      return message;
    }
    if (Array.isArray(message) && message.length > 0) {
      return message[0];
    }
  }

  // Pengecekan tipe Error standar
  if (error instanceof Error) {
    return error.message;
  }

  return defaultMessage;
}

const DEFAULT_LIMIT = 10;

export function useMonitoring() {
  const [data, setData] = useState<MonitoringRow[]>([]);
  const [meta, setMeta] = useState<MonitoringResponse["meta"] | null>(null);

  // State Filter & Pagination
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>(""); // Untuk filter status

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const params: MonitoringFilterParams = {
        page,
        limit: DEFAULT_LIMIT,
        search: search || undefined,
        status: statusFilter || undefined,
      };

      const res = await getMonitoringList(params);

      setData(res.data);
      setMeta(res.meta);
    } catch (e: unknown) {
      // ✅ Tangkap sebagai 'unknown'
      setIsError(true);
      setData([]);
      setMeta(null);
      toast.error(getApiErrorMessage(e, "Gagal memuat data monitoring."));
    } finally {
      setIsLoading(false);
    }
  }, [page, search, statusFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    meta,
    isLoading,
    isError,

    // Controls
    page,
    setPage,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,

    refetch: fetchData,
  };
}
