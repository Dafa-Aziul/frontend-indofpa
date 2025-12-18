// fileName: src/features/monitoring/detail/components/header-cards.tsx
"use client";

import React from "react"; // Import React untuk menggunakan React.cloneElement
import { Card, CardContent } from "@/components/ui/card";
// Ganti Calendar dengan CalendarDays jika diperlukan, tapi Calendar cukup representatif di sini
import { Clock, Calendar, Target, CheckCheck, Percent } from "lucide-react";
import { KuesionerMonitoringDetail } from "../types";

interface HeaderCardsProps {
    kuesioner: KuesionerMonitoringDetail;
    startDate?: string;
    endDate?: string;
}

// Utility untuk format tanggal
const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    try {
        // Menggunakan format yang lebih lengkap dan rapi seperti di AnalisisHeaderCards
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(new Date(dateString));
    } catch {
        return dateString.split('T')[0] || '-'; // Fallback
    }
};

// Logika warna (Dibuat sederhana karena ini monitoring, bukan interpretasi)
const greenSolid = "bg-green-600";
const blueSolid = "bg-blue-600";
const yellowSolid = "bg-yellow-600";

// ✅ STRUKTUR MetricCard BARU (Mirip AnalisisHeaderCards)
const MetricCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    colorClass: string; // Tambahkan colorClass
}> = ({ title, value, icon, colorClass }) => {

    const iconElement = icon as React.ReactElement<{ className?: string }>;

    return (
        <Card className="shadow-lg rounded-xl border border-gray-200">
            <CardContent className="p-4 flex items-start space-x-4">

                {/* Ikon dengan Background Solid */}
                <div className={`text-white p-3 rounded-xl shrink-0 ${colorClass}`}>
                    {/* Paksa ukuran ikon menjadi h-7 w-7 */}
                    {React.cloneElement(iconElement, {
                        className: `h-7 w-7 ${iconElement.props.className || ''}`
                    })}
                </div>

                {/* Konten Teks */}
                <div className="flex flex-col justify-start min-w-0">
                    <p className="text-base text-gray-700 font-medium mb-1 truncate">{title}</p>
                    <h4 className="text-lg font-extrabold text-gray-900 truncate">{value}</h4>
                </div>
            </CardContent>
        </Card>
    );
};
// ✅ AKHIR STRUKTUR MetricCard BARU


export default function HeaderCards({ kuesioner, startDate, endDate }: HeaderCardsProps) {

    // Hitung progress untuk menentukan warna dinamis
    const progressValue = kuesioner.progress;
    let progressColorClass = greenSolid;
    if (progressValue < 50) {
        progressColorClass = yellowSolid;
    } else if (progressValue < 20) {
        // Jika Anda ingin warna merah untuk progres sangat rendah, tambahkan di sini
        // progressColorClass = "bg-red-600";
    }

    return (
        // Tetap 5 kolom sesuai desain monitoring Anda
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">

            <MetricCard
                title="Target Responden"
                value={kuesioner.targetResponden.toLocaleString()}
                icon={<Target />}
                colorClass={blueSolid} // Menggunakan biru untuk Target
            />

            <MetricCard
                title="Respon Masuk"
                value={kuesioner.totalResponden.toLocaleString()}
                icon={<CheckCheck />}
                colorClass={greenSolid} // Menggunakan hijau untuk Respon
            />

            <MetricCard
                title="Pencapaian"
                value={`${progressValue.toFixed(1)} %`}
                icon={<Percent />}
                colorClass={progressColorClass} // Warna dinamis berdasarkan progress
            />

            <MetricCard
                title="Tanggal Mulai"
                value={formatDate(startDate)}
                icon={<Calendar />}
                colorClass={greenSolid}
            />

            <MetricCard
                title="Tanggal Berakhir"
                value={formatDate(endDate)}
                icon={<Calendar />}
                colorClass={greenSolid}
            />

        </div>
    );
}