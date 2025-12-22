// fileName: src/features/analisis/detail/components/AnalisisSummaryConclusion.tsx
"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AnalisisDetailData } from "../types";
import { Zap, Info } from "lucide-react";
import { cn } from "@/lib/utils"; // Pastikan Anda memiliki utilitas cn atau gunakan template literal biasa

interface SummaryConclusionProps {
    data: AnalisisDetailData | null;
}

const getConclusionStyle = (label: string) => {
    let bgColor = "bg-gray-100";
    let iconColor = "text-gray-600";
    let borderColor = "border-gray-400";
    const textColor = "text-gray-900";

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

    return { bgColor, iconColor, borderColor, textColor };
};

export default function AnalisisSummaryConclusion({ data }: SummaryConclusionProps) {
    if (!data || data.overall === null || !data.overallInterpretasi) {
        return (
            <Card className="p-4 border-l-4 border-gray-400 bg-gray-50">
                <p className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Info className="h-5 w-5" /> Data analisis keseluruhan tidak tersedia.
                </p>
            </Card>
        );
    }

    const overallScore = data.overall.toFixed(2);
    const interpretasi = data.overallInterpretasi;
    const { bgColor, iconColor, borderColor } = getConclusionStyle(interpretasi.label);

    return (
        <Card className={cn(
            "shadow-md border-l-[6px] transition-all",
            borderColor,
            bgColor
        )}>
            <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4">

                {/* Ikon KESIMPULAN - Dipusatkan di mobile */}
                <div className={cn(
                    "p-3 rounded-full shrink-0 bg-white border border-dashed shadow-sm",
                    borderColor,
                    iconColor
                )}>
                    <Zap className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>

                {/* Konten Kesimpulan */}
                <div className="flex-1 min-w-0 text-center sm:text-left">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                        Kesimpulan Umum Kinerja
                    </h3>

                    <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                        Berdasarkan rata-rata skor normalisasi kuesioner ini:
                    </p>

                    {/* Grid Statistik - Stack di mobile, Row di desktop */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">

                        {/* Skor Box */}
                        <div className="w-full sm:w-auto py-2 px-5 border rounded-xl bg-white shadow-sm flex flex-col items-center sm:items-start">
                            <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Skor Rata-rata</p>
                            <p className={cn("text-2xl font-black", iconColor)}>
                                {overallScore}%
                            </p>
                        </div>

                        {/* Interpretasi Box */}
                        <div className="w-full sm:w-auto py-2 px-5 border rounded-xl bg-white shadow-sm flex flex-col items-center sm:items-start">
                            <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Interpretasi</p>
                            <p className="text-xl sm:text-2xl font-black text-gray-900 truncate max-w-full">
                                {interpretasi.label}
                            </p>
                        </div>

                        {/* Rentang - Pindah ke bawah di mobile atau tetap kecil */}
                        <div className="text-[11px] sm:text-xs text-gray-500 font-medium italic mt-1 sm:mt-4">
                            Rentang: {interpretasi.range}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}