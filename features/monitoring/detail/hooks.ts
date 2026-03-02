"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import {
    MonitoringDetailResponse,
    RespondenItem,
    KuesionerMonitoringDetail,
} from "./types";
import { getMonitoringDetail, exportMonitoringLaporan, importRespondenExcel, ImportRespondenSuccess} from "./services"; // ✅ Import service ekspor

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
    
    // ✅ State tambahan untuk proses ekspor
    const [isExporting, setIsExporting] = useState(false);

    const fetchData = useCallback(async () => {
        if (isNaN(kuesionerId) || kuesionerId <= 0) {
            setIsLoading(false);
            setIsError(true);
            return;
        }

        setIsLoading(true);
        setIsError(false);

        try {
            const res = await getMonitoringDetail(kuesionerId);
            setKuesionerInfo(res.kuesioner);
            setRespondenList(res.items);
            setMeta(res.meta);
        } catch (e: unknown) {
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
    }, [kuesionerId]);

    // ✅ Fungsi Handler untuk Ekspor Laporan
    const handleExportLaporan = async () => {
        if (!kuesionerId) return;
        
        setIsExporting(true);
        try {
            // Gunakan toast.promise agar user melihat progress-nya
            await toast.promise(exportMonitoringLaporan(kuesionerId), {
                loading: "Sedang menyiapkan laporan Excel...",
                success: "Laporan berhasil diunduh",
                error: (err) => getApiErrorMessage(err, "Gagal mengekspor laporan"),
            });
        } catch (error) {
            console.error("Export error:", error);
        } finally {
            setIsExporting(false);
        }
    };

    useEffect(() => {
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
        isExporting, 
        handleExportLaporan,
        refetch: fetchData,
        page,
        setPage,
        search,
        setSearch,
    };
}

export function useImportResponden(kuesionerId: number) {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const resetState = () => {
    setFile(null);
    setLoading(false);
    };

    const onOpen = () => {
    resetState();
    setOpen(true);
    };

    const onClose = () => {
    resetState();
    setOpen(false);
    };

    const onFileSelect = (selected: File | null) => {
    setFile(selected);
    };

    const submit = async (): Promise<ImportRespondenSuccess | null> => {
    if (!file) {
        toast.error("Silakan pilih file Excel (.xlsx)");
        return null;
    }

    try {
        setLoading(true);

        const result = await importRespondenExcel(kuesionerId, file);

        toast.success(result.message);
        onClose();

        return result;
    } catch (error) {
        const err = error as Error;
        toast.error(err.message);
        return null;
    } finally {
        setLoading(false);
    }
    };

    return {
    /** STATE */
    open,
    file,
    loading,

    /** HANDLER */
    onOpen,
    onClose,
    onFileSelect,
    submit,
    };
}