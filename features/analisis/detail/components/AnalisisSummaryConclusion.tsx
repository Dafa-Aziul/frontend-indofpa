// fileName: src/features/analisis/detail/components/AnalisisSummaryConclusion.tsx
"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AnalisisDetailData } from "../types";
import { Zap, TrendingUp, Info } from "lucide-react";

interface SummaryConclusionProps {
    data: AnalisisDetailData | null;
}

// ======================================================
// UTILS
// ======================================================

// Logika warna untuk Chip/Card background (berdasarkan interpretasi skor 0-100)
const getConclusionStyle = (label: string) => {
    let bgColor = "bg-gray-100";
    let iconColor = "text-gray-600";
    let borderColor = "border-gray-400";

    if (label.includes("Sangat Tinggi")) {
        bgColor = "bg-green-50";
        iconColor = "text-green-700";
        borderColor = "border-green-700";
    } else if (label.includes("Tinggi")) {
        bgColor = "bg-green-100";
        iconColor = "text-green-600";
        borderColor = "border-green-600";
    } else if (label.includes("Cukup")) {
        bgColor = "bg-yellow-50";
        iconColor = "text-yellow-600";
        borderColor = "border-yellow-600";
    } else if (label.includes("Rendah")) {
        bgColor = "bg-orange-50";
        iconColor = "text-orange-600";
        borderColor = "border-orange-600";
    }

    return { bgColor, iconColor, borderColor };
};


// ======================================================
// KOMPONEN UTAMA
// ======================================================

export default function AnalisisSummaryConclusion({ data }: SummaryConclusionProps) {
    if (!data || data.overall === null || !data.overallInterpretasi) {
        return (
            <Card className="p-4 border-l-4 border-gray-400 bg-gray-50">
                <p className="text-muted-foreground flex items-center gap-2">
                    <Info className="h-5 w-5" /> Data analisis keseluruhan tidak tersedia.
                </p>
            </Card>
        );
    }

    const overallScore = data.overall.toFixed(2);
    const interpretasi = data.overallInterpretasi;
    const { bgColor, iconColor, borderColor } = getConclusionStyle(interpretasi.label);

    return (
        <Card className={`shadow-md border-l-4 ${borderColor} ${bgColor}`}>
            <CardContent className="p-5 flex items-start space-x-4">

                {/* Ikon KESIMPULAN */}
                <div className={`p-3 rounded-full shrink-0 ${iconColor} bg-white border border-dashed ${borderColor}`}>
                    <Zap className="h-6 w-6" />
                </div>

                {/* Konten Kesimpulan */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-1">
                        Kesimpulan Umum Kinerja Kuesioner
                    </h3>

                    <p className="text-base text-gray-700 mb-2">
                        Berdasarkan rata-rata skor normalisasi dari semua variabel dan indikator:
                    </p>

                    <div className="flex items-center space-x-4">
                        {/* Skor */}
                        <div className="py-1 px-4 border rounded-lg bg-white">
                            <p className="text-xs font-medium text-gray-500">Skor Rata-rata</p>
                            <p className={`text-2xl font-extrabold ${iconColor}`}>
                                {overallScore}%
                            </p>
                        </div>

                        {/* Interpretasi */}
                        <div className="py-1 px-4 border rounded-lg bg-white">
                            <p className="text-xs font-medium text-gray-500">Interpretasi</p>
                            <p className="text-2xl font-extrabold text-gray-900">
                                {interpretasi.label}
                            </p>
                        </div>

                        {/* Rentang */}
                        <div className="text-sm text-gray-600 pt-3">
                            (Rentang: {interpretasi.range})
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}