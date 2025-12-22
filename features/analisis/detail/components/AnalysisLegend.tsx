// src/features/analisis/detail/components/AnalysisLegend.tsx
import React from 'react';
import { getStepColor } from '../utils/color-mapper';
import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
    config: { min: number; max: number; label: string }[];
    onEdit?: () => void; // Prop untuk memicu modal edit
}

export const AnalysisLegend = ({ config, onEdit }: Props) => {
    const sortedConfig = [...config].sort((a, b) => a.min - b.min);

    return (
        <div className="w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm mb-6 relative overflow-hidden">
            {/* Header Section dengan Tombol Edit */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-slate-800">
                    Interpretasi Berdasarkan Rata-rata Skor & Persentase Normalisasi
                </h2>

                {onEdit && (
                    <Button
                        onClick={onEdit}
                        variant="outline"
                        size="sm"
                        className="rounded-full transition-all gap-2 h-9 px-4 font-bold"
                    >
                        <Settings2 className="h-4 w-4" />
                        Update Konfigurasi
                    </Button>
                )}
            </div>

            {/* Section 1: Skala Likert */}
            <div className="mb-8">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                    Skala Likert (Rata-rata Skor):
                </h3>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                    {sortedConfig.map((item, index) => {
                        const likertMin = ((item.min / 100) * 4 + 1).toFixed(1);
                        const likertMax = ((item.max / 100) * 4 + 1).toFixed(1);

                        return (
                            <div key={index} className="flex items-center gap-2">
                                <div
                                    className="w-4 h-4 rounded-md shrink-0"
                                    style={{ backgroundColor: getStepColor(index, sortedConfig.length) }}
                                />
                                <span className="text-xs font-medium text-slate-600">
                                    {likertMin} – {likertMax} = {item.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Section 2: Persentase */}
            <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                    Persentase Normalisasi (Indikator):
                </h3>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                    {sortedConfig.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div
                                className="w-4 h-4 rounded-md shrink-0"
                                style={{ backgroundColor: getStepColor(index, sortedConfig.length) }}
                            />
                            <span className="text-xs font-medium text-slate-600">
                                {item.min}% – {item.max}% = {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};