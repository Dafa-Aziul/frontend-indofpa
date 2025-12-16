// fileName: src/features/monitoring/responden/hooks/use-responden-detail.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import {
    RespondenDetail,
    JawabanItem,
    RingkasanScore,
    IndicatorScoreItem,
} from "./types";
import { getRespondenDetail } from "./services"; // Perhatikan path relatif

// Asumsi getApiErrorMessage ada di project Anda
function getApiErrorMessage(
    error: unknown,
    defaultMessage: string = "Gagal memuat data"
) {
    if (error instanceof Error) return error.message;
    return defaultMessage;
}

export function useRespondenDetail(kuesionerId: number, respondenId: number) {
    const [respondenInfo, setRespondenInfo] = useState<RespondenDetail | null>(null);
    const [jawabanList, setJawabanList] = useState<JawabanItem[]>([]);
    
    // ✅ Tambahkan state baru
    const [ringkasan, setRingkasan] = useState<RingkasanScore | null>(null);
    const [indicatorScores, setIndicatorScores] = useState<IndicatorScoreItem[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const fetchData = useCallback(async () => {
        // Cek ID Validasi
        if (isNaN(kuesionerId) || kuesionerId <= 0 || isNaN(respondenId) || respondenId <= 0) {
            setIsLoading(false);
            setIsError(true);
            return;
        }

        setIsLoading(true);
        setIsError(false);

        try {
            const res = await getRespondenDetail(kuesionerId, respondenId);

            setRespondenInfo(res.responden);
            setJawabanList(res.jawaban);
            // ✅ Set state baru
            setRingkasan(res.ringkasan);
            setIndicatorScores(res.indicatorScores); 

        } catch (e: unknown) {
            setIsError(true);
            setRespondenInfo(null);
            setJawabanList([]);
            setRingkasan(null); // Reset
            setIndicatorScores([]); // Reset
            toast.error(
                getApiErrorMessage(
                    e,
                    `Gagal memuat detail jawaban responden ID ${respondenId}`
                )
            );
        } finally {
            setIsLoading(false);
        }
    }, [kuesionerId, respondenId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        respondenInfo,
        jawabanList,
        ringkasan, // ✅ Dikembalikan
        indicatorScores, // ✅ Dikembalikan
        isLoading,
        isError,
        refetch: fetchData,
    };
}