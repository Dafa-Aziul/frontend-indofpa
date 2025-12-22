"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getKuesionerData,
  submitJawaban,
  checkEmailDuplicate,
} from "./services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UserProfile } from "./types";
import { profileFormSchema } from "./schemas";

export function useFillKuesioner(kodeAkses: string) {
  const router = useRouter();

  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidatingEmail, setIsValidatingEmail] = useState(false);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [profile, setProfile] = useState<UserProfile>({
    nama: "",
    email: "",
    usiaKategori: "",
    jenisKelamin: "",
    tingkatPendidikan: "",
    agama: "",
    pekerjaan: "",
  });

  const [answers, setAnswers] = useState<Record<number, number>>({});

  // Update profil dan hapus error pada field terkait
  const updateProfile = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const fetchDetail = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getKuesionerData(kodeAkses);
      // Pastikan res.data berisi objek yang ada distribusiId & kuesioner
      setData(res.data);
    } catch (error) {
      toast.error("Gagal mengambil data kuesioner");
    } finally {
      setIsLoading(false);
    }
  }, [kodeAkses]);

  useEffect(() => {
    if (kodeAkses) fetchDetail();
  }, [kodeAkses, fetchDetail]);

  const handleNextStep = async () => {
    setErrors({});

    // 1. Validasi Zod (Client Side)
    const result = profileFormSchema.safeParse(profile);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as string;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      toast.error("Mohon lengkapi formulir dengan benar");
      return;
    }

    // 2. Cek ketersediaan data kuesioner
    const kuesionerId = data?.kuesioner?.kuesionerId;
    if (!kuesionerId) {
      toast.error("Data kuesioner belum dimuat sempurna. Silakan tunggu.");
      return;
    }

    try {
      setIsValidatingEmail(true);

      // 3. Cek Duplikasi Email via Backend
      const check = await checkEmailDuplicate(profile.email, kuesionerId);

      if (check.data?.isDuplicate) {
        setErrors((prev) => ({
          ...prev,
          email:
            check.message || "Email ini sudah pernah mengisi kuesioner ini",
        }));
        toast.error(check.message);
        return;
      }

      // 4. Jika lolos, lanjut ke pertanyaan
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      toast.error(
        err instanceof Error ? err.message : "Gagal menyimpan kategori"
      );
    }
  };

  const handleSubmit = async () => {
    const totalPertanyaan = data?.pertanyaan?.length || 0;

    if (Object.keys(answers).length < totalPertanyaan) {
      toast.error(
        `Mohon jawab semua pertanyaan (${
          Object.keys(answers).length
        }/${totalPertanyaan})`
      );
      return;
    }

    if (!data?.distribusiId) {
      toast.error("ID Distribusi tidak ditemukan.");
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        distribusiId: data.distribusiId,
        profile: profile,
        jawaban: Object.entries(answers).map(([id, val]) => ({
          pertanyaanId: Number(id),
          nilai: val,
        })),
      };

      await submitJawaban(kodeAkses, payload);
      toast.success("Kuesioner berhasil dikirim! Terima kasih.");
      router.push("/kuesioner");
    } catch (error) {
      toast.error("Gagal mengirim kuesioner. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    data,
    isLoading,
    isValidatingEmail,
    isSubmitting,
    step,
    setStep,
    profile,
    updateProfile,
    answers,
    setAnswers,
    errors,
    handleNextStep,
    handleSubmit,
  };
}
