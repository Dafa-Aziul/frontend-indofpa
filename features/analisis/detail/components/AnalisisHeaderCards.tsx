// fileName: src/features/analisis/detail/components/AnalisisHeaderCards.tsx
"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, TrendingUp, BarChart3, CalendarDays } from "lucide-react";
import { AnalisisDetailData, InterpretasiRange } from "../types";
import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

interface HeaderCardsProps {
    data: AnalisisDetailData | null;
}

/**
 * Perbaikan pada typing MetricCard:
 * Gunakan React.ReactElement untuk icon agar kita bisa meng-clone props-nya
 */
const MetricCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactElement<SVGProps<SVGSVGElement>>;
    bgColor?: string;
    colorClass?: string;
}> = ({ title, value, icon, bgColor, colorClass }) => {
    return (
        <Card className="shadow-md rounded-2xl border border-slate-100 overflow-hidden transition-all hover:shadow-lg">
            <CardContent className="p-3 sm:p-4 lg:p-5 flex items-center gap-3 sm:gap-4">
                <div
                    className={cn(
                        "flex items-center justify-center shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl text-white shadow-sm",
                        colorClass
                    )}
                    style={bgColor ? { backgroundColor: bgColor } : {}}
                >
                    {/* FIX UTAMA: Tambahkan casting 'as any' atau tentukan interface props
                      untuk memberitahu TypeScript bahwa elemen ini menerima className
                    */}
                    {React.cloneElement(icon, {
                        className: cn(
                            "h-5 w-5 sm:h-6 sm:w-6",
                            icon.props.className
                        ),
                    })}

                </div>

                <div className="flex flex-col min-w-0 flex-1">
                    <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider truncate">
                        {title}
                    </p>
                    <h4 className="text-sm sm:text-base lg:text-lg font-bold text-slate-900 leading-tight wrap-break-words">
                        {value}
                    </h4>
                </div>
            </CardContent>
        </Card>
    );
};

export default function AnalisisHeaderCards({ data }: HeaderCardsProps) {
    if (!data) return null;

    // Gradasi warna sesuai index interpretasi (dari merah ke hijau)
    const getStepColor = (
        score: number,
        interpretasi: InterpretasiRange[]
    ): string => {

        const sorted = [...interpretasi].sort((a, b) => a.min - b.min);
        const index = sorted.findIndex(item => score >= item.min && score <= item.max);
        const palette = ['#FF9494', '#FFBD44', '#5EE398', '#32CD32', '#2D8A4E'];
        if (index === -1) return '#94a3b8';
        const factor = (palette.length - 1) / (Math.max(1, sorted.length - 1));
        return palette[Math.round(index * factor)];
    };

    const isOverallAvailable = data.overall !== null && data.overall !== undefined;
    const overallScore = isOverallAvailable ? data.overall.toFixed(1) : "N/A";
    const overallLabel = data.overallInterpretasi?.label || "N/A";
    const dynamicScoreColor = isOverallAvailable
        ? getStepColor(data.overall, data.kuesioner.analisisConfig.interpretasi)
        : undefined;

    const rawDate = data.kuesioner.distribusi?.[0]?.tanggalSelesai;
    let tanggalAkhir = "N/A";
    if (rawDate) {
        const dateObj = new Date(rawDate);
        tanggalAkhir = new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }).format(dateObj);
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            <MetricCard
                title="Total Responden"
                value={`${data.totalResponden.toLocaleString()} Orang`}
                icon={<Users />}
                colorClass="bg-blue-500"
            />

            <MetricCard
                title="Skor Indeks"
                value={isOverallAvailable ? `${overallScore}%` : overallScore}
                icon={<TrendingUp />}
                bgColor={dynamicScoreColor}
            />

            <MetricCard
                title="Interpretasi"
                value={overallLabel}
                icon={<BarChart3 />}
                bgColor={dynamicScoreColor}
            />

            <MetricCard
                title="Batas Pengisian"
                value={tanggalAkhir}
                icon={<CalendarDays />}
                colorClass="bg-slate-800"
            />
        </div>
    );
}