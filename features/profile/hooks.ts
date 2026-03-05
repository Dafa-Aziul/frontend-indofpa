"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

import { getProfileService, changePasswordService } from "./services";

import { ChangePasswordPayload, ProfileUser } from "./types";
import { AxiosError } from "axios";

/* ======================================================
   PROFILE USER
====================================================== */
export function useProfile() {
  const [data, setData] = useState<ProfileUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      const res = await getProfileService();
      setData(res);
    } catch (err: unknown) {
      setIsError(true);
      toast.error(
        err instanceof Error ? err.message : "Gagal memuat data profile",
      );
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
    refetch: fetchData,
  };
}

/* ======================================================
   CHANGE PASSWORD
====================================================== */
export function useChangePassword() {
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (payload: ChangePasswordPayload) => {
    try {
      setIsLoading(true);

      const res = await changePasswordService(payload);

      toast.success(res.message);

      return true;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const message = err.response?.data?.message;
        toast.error(message ?? "Gagal mengganti password");
      } else {
        toast.error("Terjadi kesalahan");
      }

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submit,
    isLoading,
  };
}
