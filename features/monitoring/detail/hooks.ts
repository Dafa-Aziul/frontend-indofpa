// fileName: src/features/monitoring/detail/hooks/use-monitoring-detail.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import {
    MonitoringDetailResponse,
    RespondenItem,
    KuesionerMonitoringDetail,
} from "./types";
import { getMonitoringDetail } from "./services";

// Asumsi getApiErrorMessage ada di project Anda
function getApiErrorMessage(
    error: unknown,
    defaultMessage: string = "Gagal memuat data"
) {
    if (error instanceof Error) return error.message;
    return defaultMessage;
}

export function useMonitoringDetail(kuesionerId: number) {
    const [kuesionerInfo, setKuesionerInfo] =
        useState<KuesionerMonitoringDetail | null>(null);
    const [respondenList, setRespondenList] = useState<RespondenItem[]>([]);
    const [meta, setMeta] = useState<MonitoringDetailResponse["meta"] | null>(
        null
    );

    // State Filter & Pagination
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const fetchData = useCallback(async () => {
        // Cek apakah ID valid sebelum fetching
        if (isNaN(kuesionerId) || kuesionerId <= 0) {
            setIsLoading(false);
            setIsError(true);
            return;
        }

        setIsLoading(true);
        setIsError(false);

        try {
            // Memanggil service dengan parameter pagination/search
            const res = await getMonitoringDetail(kuesionerId);

            setKuesionerInfo(res.kuesioner);
            setRespondenList(res.items);
            setMeta(res.meta);
        } catch (e: unknown) { // ✅ Menggunakan 'e: unknown'
            setIsError(true);
            setKuesionerInfo(null);
            setRespondenList([]);
            setMeta(null);
            toast.error(
                getApiErrorMessage(
                    e,
                    `Gagal memuat detail monitoring ID ${kuesionerId}`
                )
            );
        } finally {
            setIsLoading(false);
        }
    }, [kuesionerId, page, search]);

    useEffect(() => {
        // Cek lagi di useEffect sebelum memicu fetch
        if (isNaN(kuesionerId) || kuesionerId <= 0) {
            setIsLoading(false);
            setIsError(true);
            return;
        }
        fetchData();
    }, [fetchData, kuesionerId]);

    return {
        kuesionerInfo,
        respondenList,
        meta,
        isLoading,
        isError,
        refetch: fetchData,
        page,
        setPage,
        search,
        setSearch,
    };
}