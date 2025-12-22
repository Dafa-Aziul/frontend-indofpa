// fileName: src/features/monitoring/detail/components/header-cards.tsx
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Target, CheckCheck, Percent } from "lucide-react";
import { KuesionerMonitoringDetail } from "../types";
import { cn } from "@/lib/utils";

interface HeaderCardsProps {
    kuesioner: KuesionerMonitoringDetail;
    startDate?: string;
    endDate?: string;
}

const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    try {
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'short', // Menggunakan 'short' agar lebih hemat ruang di mobile
            year: 'numeric'
        }).format(new Date(dateString));
    } catch {
        return dateString.split('T')[0] || '-';
    }
};

const greenSolid = "bg-green-600";
const blueSolid = "bg-blue-600";
const yellowSolid = "bg-yellow-600";

const MetricCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    colorClass: string;
}> = ({ title, value, icon, colorClass }) => {
    const iconElement = icon as React.ReactElement<{ className?: string }>;

    return (
        <Card className="shadow-md rounded-xl border border-gray-200 overflow-hidden">
            <CardContent className="p-3 sm:p-4 flex items-center space-x-3 sm:space-x-4">
                {/* Ikon: Ukuran lebih kecil di mobile (h-5/w-5) dan normal di desktop (h-7/w-7) */}
                <div className={cn("text-white p-2.5 sm:p-3 rounded-xl shrink-0", colorClass)}>
                    {React.cloneElement(iconElement, {
                        className: cn("h-5 w-5 sm:h-7 sm:w-7", iconElement.props.className)
                    })}
                </div>

                {/* Konten Teks: Font size disesuaikan */}
                <div className="flex flex-col justify-center min-w-0 flex-1">
                    <p className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-wider truncate mb-0.5">
                        {title}
                    </p>
                    <h4 className="text-sm sm:text-lg font-black text-gray-900 truncate leading-tight">
                        {value}
                    </h4>
                </div>
            </CardContent>
        </Card>
    );
};

export default function HeaderCards({ kuesioner, startDate, endDate }: HeaderCardsProps) {
    const progressValue = kuesioner.progress;
    let progressColorClass = greenSolid;
    
    if (progressValue < 50) {
        progressColorClass = yellowSolid;
    } else if (progressValue < 20) {
        progressColorClass = "bg-red-600";
    }

    return (
        /* RESPONSIVE GRID:
           - 1 kolom pada mobile sangat kecil (layar < 400px)
           - 2 kolom pada mobile menengah (sm)
           - 5 kolom pada desktop (lg)
        */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-5">
            <MetricCard
                title="Target Responden"
                value={kuesioner.targetResponden.toLocaleString()}
                icon={<Target />}
                colorClass={blueSolid}
            />

            <MetricCard
                title="Respon Masuk"
                value={kuesioner.totalResponden.toLocaleString()}
                icon={<CheckCheck />}
                colorClass={greenSolid}
            />

            <MetricCard
                title="Pencapaian"
                value={`${progressValue.toFixed(1)} %`}
                icon={<Percent />}
                colorClass={progressColorClass}
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