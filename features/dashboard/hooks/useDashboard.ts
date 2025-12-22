"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { getDashboard } from "../services/dashboard.service";
import { DashboardResponse } from "../types/dashboard";

export function useDashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  // Inisialisasi loading langsung true untuk menghindari cascading render saat mount
  const [loading, setLoading] = useState(true);
  const [isRefetching, setIsRefetching] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchDashboardData = useCallback(async (isInitial = false) => {
    // Hindari mengubah state jika tidak perlu
    if (!isInitial) setIsRefetching(true);

    try {
      const res = await getDashboard();
      setData(res);
    } catch (error) {
      console.error("Dashboard Polling Error:", error);
    } finally {
      // Pastikan loading hanya dimatikan satu kali
      setLoading(false);
      setIsRefetching(false);
    }
  }, []);

  useEffect(() => {
    // 1. Fetch data saat pertama kali mount
    fetchDashboardData(true);

    // 2. Polling Logic (Real-time MySQL)
    const startPolling = () => {
      timerRef.current = setInterval(() => {
        // Hemat Baterai & Data Mobile: Hanya fetch jika tab aktif
        if (document.visibilityState === "visible") {
          fetchDashboardData();
        }
      }, 5000);
    };

    startPolling();

    // 3. Re-sync saat user kembali ke aplikasi (Focus Refetch)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchDashboardData();
      }
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      window.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchDashboardData]);

  return {
    data,
    loading,
    isRefetching,
    refreshManual: () => fetchDashboardData(),
  };
}
