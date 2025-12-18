// fileName: src/features/analisis/detail/components/AnalisisHeaderCards.tsx
"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, TrendingUp, BarChart3, CalendarDays } from "lucide-react";
import { AnalisisDetailData } from "../types";

interface HeaderCardsProps {
    data: AnalisisDetailData | null;
}

const MetricCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    colorClass: string
}> = ({ title, value, icon, colorClass }) => {

    const iconElement = icon as React.ReactElement<{ className?: string }>;

    return (
        <Card className="shadow-lg rounded-xl border border-gray-200">
            <CardContent className="p-4 flex items-start space-x-4">

                <div className={`text-white p-3 rounded-xl shrink-0 ${colorClass}`}>

                    {/* PERBAIKAN: Panggil cloneElement dengan memasukkan className */}
                    {React.cloneElement(iconElement, {
                        className: `h-7 w-7 ${iconElement.props.className || ''}`
                    })}
                </div>

                <div className="flex flex-col justify-start min-w-0">
                    <p className="text-base text-gray-700 font-medium mb-1 truncate">{title}</p>
                    <h4 className="text-lg font-extrabold text-gray-900 truncate">{value}</h4>
                </div>
            </CardContent>
        </Card>
    );
};

export default function AnalisisHeaderCards({ data }: HeaderCardsProps) {
    if (!data) return null;

    // Fungsi untuk menentukan warna background ikon
    const getIconColorClass = (label: string) => {
        if (label.includes("Sangat Tinggi")) return "bg-green-700";
        if (label.includes("Tinggi")) return "bg-green-600";
        if (label.includes("Cukup")) return "bg-yellow-600";
        return "bg-gray-500";
    };

    // ==========================================================
    // ✨ PERBAIKAN UTAMA: NULL CHECK UNTUK data.overall
    // ==========================================================
    const isOverallAvailable = data.overall !== null && data.overall !== undefined;
    
    // Line 55 Fix: Hanya panggil toFixed jika data.overall tersedia
    const overallScore = isOverallAvailable ? data.overall.toFixed(2) : "N/A";
    
    // Line 56 Fix: Akses label hanya jika data.overallInterpretasi tersedia
    const overallLabel = data.overallInterpretasi?.label || "Data Tidak Tersedia";

    const greenSolid = "bg-green-600";
    // Tentukan warna berdasarkan label hanya jika label tersedia (tidak "Data Tidak Tersedia")
    const interpretationColor = overallLabel !== "Data Tidak Tersedia" ? getIconColorClass(overallLabel) : "bg-gray-500";

    // ✅ LOGIKA BARU UNTUK MENGAMBIL DAN MEMFORMAT TANGGAL AKHIR
    const rawDate = data.kuesioner.distribusi?.[0]?.tanggalSelesai;

    let tanggalAkhirFormatted = "N/A";
    if (rawDate) {
        try {
            // Format tanggal dari ISO string ke format lokal yang mudah dibaca
            const dateObj = new Date(rawDate);
            tanggalAkhirFormatted = new Intl.DateTimeFormat('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }).format(dateObj);
        } catch (e) {
            console.error("Failed to format date:", e);
            tanggalAkhirFormatted = typeof rawDate === 'string' ? rawDate.split('T')[0] || "N/A" : "N/A"; // Fallback jika format gagal
        }
    }


    return (
        // ✅ Ubah ke grid 4 kolom
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <MetricCard
                title="Total Responden"
                value={data.totalResponden.toLocaleString()}
                icon={<Users />}
                colorClass={greenSolid}
            />
            <MetricCard
                title="Skor Total Normalisasi"
                value={isOverallAvailable ? `${overallScore}%` : overallScore}
                icon={<TrendingUp />}
                colorClass={greenSolid}
            />
            <MetricCard
                title="Interpretasi Keseluruhan"
                value={overallLabel}
                icon={<BarChart3 />}
                colorClass={interpretationColor}
            />

            {/* ✅ KARTU BARU: TANGGAL AKHIR */}
            <MetricCard
                title="Tanggal Akhir"
                value={tanggalAkhirFormatted}
                icon={<CalendarDays />}
                colorClass={greenSolid}
            />
        </div>
    );
}