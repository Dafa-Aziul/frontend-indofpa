"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { getPublicKuesionerList, getPublicKuesionerDetail } from "./services";
import { PublicKuesioner } from "./types";

export function usePublicKuesioner() {
    const [data, setData] = useState<PublicKuesioner[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            setIsError(false);
            const res = await getPublicKuesionerList();
            setData(res.data || []);
        } catch (error) {
            setIsError(true);
            toast.error("Gagal memuat daftar kuesioner publik");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        data,
        isLoading,
        isError,
        refetch: fetchData
    };
}

export function usePublicDetail(id: string) {
    const [data, setData] = useState<PublicKuesioner | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const fetchData = useCallback(async () => {
        if (!id) return;
        
        try {
            setIsLoading(true);
            setIsError(false);
            const res = await getPublicKuesionerDetail(id);
            setData(res.data || null);
        } catch (error) {
            setIsError(true);
            toast.error("Gagal memuat detail kuesioner");
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        data,
        isLoading,
        isError,
        refetch: fetchData
    };
}