"use client";

import { useState, useEffect, useCallback } from "react";
import { getKuesionerData, submitJawaban } from "./services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UserProfile } from "./types";

export function useFillKuesioner(kodeAkses: string) {
    const router = useRouter();
    
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [step, setStep] = useState(1);

    const [profile, setProfile] = useState<UserProfile>({
        nama: "",
        email: "",
        usiaKategori: "",
        jenisKelamin: "",
        tingkatPendidikan: "",
        agama: "",
        pekerjaan: ""
    });

    const [answers, setAnswers] = useState<Record<number, number>>({});

    const fetchDetail = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await getKuesionerData(kodeAkses);
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

    const handleNextStep = () => {
        const isProfileComplete = Object.values(profile).every(val => val !== "");
        if (!isProfileComplete) {
            toast.error("Mohon lengkapi semua data profil responden");
            return;
        }
        setStep(2);
        window.scrollTo(0, 0);
    };

    const handleSubmit = async () => {
        const totalPertanyaan = data?.pertanyaan?.length || 0;
        if (Object.keys(answers).length < totalPertanyaan) {
            toast.error(`Mohon jawab semua pertanyaan (${Object.keys(answers).length}/${totalPertanyaan})`);
            return;
        }

        try {
            setIsSubmitting(true);
            
            const payload = {
                distribusiId: data.distribusiId,
                profile: profile,
                jawaban: Object.entries(answers).map(([id, val]) => ({
                    pertanyaanId: Number(id),
                    nilai: val 
                }))
            };

            // === DEBUGGING LOG ===
            console.log("=== DEBUG SUBMIT ===");
            console.log("URL Akses:", `/api/isi-kuesioner/${kodeAkses}/submit`);
            console.log("Payload yang dikirim:", payload);
            // =====================

            // Pastikan mengirim kodeAkses agar service bisa membangun URL-nya
            await submitJawaban(kodeAkses, payload);
            
            toast.success("Kuesioner berhasil dikirim! Terima kasih.");
            router.push("/kuesioner");
        } catch (error) {
            console.error("Submit Error:", error);
            toast.error("Gagal mengirim kuesioner. Silakan coba lagi.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return { 
        data, 
        isLoading, 
        step, 
        setStep,
        profile, 
        setProfile,
        answers, 
        setAnswers,
        handleNextStep, 
        handleSubmit, 
        isSubmitting 
    };
}