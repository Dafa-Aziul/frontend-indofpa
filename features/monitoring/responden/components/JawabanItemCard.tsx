// fileName: src/features/monitoring/responden/components/JawabanItemCard.tsx
"use client";

import React from 'react';
import { JawabanItem } from '../types'; 
import { CheckCircle } from 'lucide-react';

// Asumsi import komponen Tooltip dari Shadcn UI
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"; 

interface JawabanItemCardProps {
    jawaban: JawabanItem;
}

const JawabanItemCard: React.FC<JawabanItemCardProps> = ({ jawaban }) => {
    // 1. Perhitungan Skala dan Persentase
    const scaleKeys = Object.keys(jawaban.labelSkala).map(Number);
    const maxScale = scaleKeys.length > 0 ? Math.max(...scaleKeys) : 5;
    const percentage = (jawaban.nilai / maxScale) * 100;
    
    // Format nilai yang dipilih dan skala (cth: "4/6 — Kurang Setuju")
    const formattedValue = `${jawaban.nilai}/${maxScale} — ${jawaban.labelDipilih}`;

    return (
        <TooltipProvider>
            <div className="p-4 space-y-3"> 

                {/* 1. HEADER PERTANYAAN (Urutan dan Teks) */}
                <div className="flex items-center space-x-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-600 text-white font-bold text-sm">
                        {jawaban.urutan}
                    </div>
                    <p className="font-semibold text-base flex-1">
                        {jawaban.teksPertanyaan}
                    </p>
                </div>

                <div className="pl-10"> 
                    
                    {/* 2. JAWABAN & SKOR LABEL */}
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium text-gray-700">Jawaban</p>
                        <span className="text-sm font-semibold text-green-700 whitespace-nowrap">
                            {formattedValue}
                        </span>
                    </div>

                    {/* 3. PROGRESS BAR DENGAN TOOLTIP DITEMPATKAN DI POSISI % YANG TEPAT */}
                    
                    <div className="relative h-3 w-full rounded-full bg-gray-200">
                        
                        {/* Tooltip Trigger: Span kosong yang diposisikan secara absolut */}
                        <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                                <span 
                                    style={{ 
                                        left: `calc(${percentage}%)`, // Posisikan di persentase yang dihitung
                                        transform: 'translateX(-50%)' // Geser ke kiri 50% untuk centering trigger
                                    }}
                                    className="absolute top-0 h-3 w-3 rounded-full bg-transparent z-10 cursor-pointer"
                                    aria-label={`Nilai dipilih: ${jawaban.nilai}`} 
                                />
                            </TooltipTrigger>
                            <TooltipContent className="bg-gray-800 text-white text-sm" side="top">
                                <p>Nilai: {jawaban.nilai}</p>
                                <p>Label: {jawaban.labelDipilih}</p>
                                <p>Pencapaian: {percentage.toFixed(1)}%</p>
                            </TooltipContent>
                        </Tooltip>
                        
                        {/* Visual Progress Bar (Bar hijau) */}
                        <div className="absolute top-0 left-0 h-3 overflow-hidden rounded-full w-full">
                            <div 
                                style={{ width: `${percentage}%` }}
                                className="h-full bg-green-700 transition-all duration-300"
                            />
                        </div>
                    </div>
                    
                    {/* Skala di bawah Progress Bar (1, 2, 3, dst.) */}
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        {/* Render skala secara dinamis */}
                        {scaleKeys.map(key => (
                            // Menghitung posisi marker skala (hanya label 1 dan Max Scale yang terlihat di desain)
                            <span 
                                key={key} 
                                className={`text-center relative ${key !== 1 && key !== maxScale ? 'opacity-0' : ''}`}
                            >
                                {key}
                            </span>
                        ))}
                    </div>

                    {/* 4. INTERPRETASI/LABEL DI BACKGROUND HIJAU MUDA */}
                    <div className="mt-4 p-3 bg-green-50 rounded-lg flex justify-between items-center border border-green-200">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="font-semibold text-sm text-green-800">
                                Interpretasi: {jawaban.labelDipilih}
                            </span>
                        </div>
                        <span className="text-sm text-green-700 font-bold">
                            {percentage.toFixed(0)} %
                        </span>
                    </div>
                </div>
            </div>
        </TooltipProvider>
    );
};

export default JawabanItemCard;