// fileName: src/features/analisis/detail/components/AnalisisPertanyaanList.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AnalisisDetailData, PertanyaanDetail } from "../types";
import { ChevronsRight } from "lucide-react";
import React from "react"; // Tambahkan import React eksplisit

interface PertanyaanListProps {
    data: AnalisisDetailData | null;
}

// ======================================================
// UTILS
// ======================================================

// Logika warna untuk bar (sedikit disederhanakan/disesuaikan)
const getProgressBarColor = (score: number) => {
    if (score >= 81) return 'bg-green-700';
    if (score >= 61) return 'bg-green-600'; // Hijau sedang untuk Tinggi
    if (score >= 41) return 'bg-yellow-600'; // Kuning untuk Cukup
    return 'bg-gray-500';
};

// Logika warna untuk chip Interpretasi (Hijau/Kuning/Abu-abu)
const getInterpretasiChipClass = (score: number) => {
    if (score >= 61) return 'bg-green-600 text-white';
    if (score >= 41) return 'bg-yellow-600 text-white';
    return 'bg-gray-400 text-white';
};

// ======================================================
// SUB-KOMPONEN: PROGRESS BAR KUSTOM (Dibuat lebih tipis)
// ======================================================

const PertanyaanProgressBar: React.FC<{ normalizedScore: number; avgRaw: number; maxScale: number }> = ({ normalizedScore, avgRaw, maxScale }) => {
    const width = Math.min(100, Math.max(0, normalizedScore));
    const colorClass = getProgressBarColor(normalizedScore);

    // Skor di ujung bar (meniru angka 5. di desain)
    const scoreText = avgRaw.toFixed(1);

    return (
        <div className="w-full relative">

            {/* ✅ PERBAIKAN: Mengubah tinggi h-8 menjadi h-4 (lebih tipis) */}
            <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                    // ✅ PERBAIKAN: Mengubah tinggi h-8 menjadi h-4
                    className={`${colorClass} h-4 rounded-full flex items-center justify-end pr-2 text-white font-bold text-xs`}
                    style={{ width: `${width}%` }}
                >
                    {/* Tampilkan skor mentah di ujung bar hijau */}
                    {normalizedScore > 5 ? scoreText : ''}
                </div>
            </div>

            {/* Jika skor terlalu kecil, tampilkan skor mentah di luar bar (mirip dengan angka 5 di luar) */}
            {normalizedScore <= 5 && (
                <span className="absolute top-1/2 -translate-y-1/2 text-sm font-bold text-gray-700 right-2">
                    {scoreText}
                </span>
            )}
        </div>
    );
};

// ======================================================
// SUB-KOMPONEN: ITEM PERTANYAAN (Mirip Desain)
// ======================================================

const PertanyaanItem: React.FC<{ item: PertanyaanDetail; urutanGlobal: number; indikatorKode: string }> = ({ item, urutanGlobal, indikatorKode }) => {

    // Null checks dan fallbacks
    const avgRaw = item.stats.avgRaw || 0;
    const maxScale = item.scale.max || 5;
    const normalizedScore = item.stats.avgNormalized || 0;
    const interpretasiLabel = item.interpretasi?.label || 'N/A';
    const interpretasiChipClass = getInterpretasiChipClass(normalizedScore);

    return (
        <Card className="shadow-lg rounded-xl">
            {/* ✅ PERBAIKAN: Mengubah space-y-3 menjadi space-y-4 */}
            <CardContent className="p-5 flex flex-col space-y-4">

                {/* 1. Judul Pertanyaan (Nomor Urut di Chip) */}
                <div className="flex items-start gap-4">
                    {/* Chip Nomor Urut */}
                    <div className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white font-bold text-lg">
                        {urutanGlobal}
                    </div>

                    {/* Teks Pertanyaan */}
                    <p className="flex-1 text-lg font-medium text-gray-800 pt-1">
                        {item.teksPertanyaan}
                    </p>
                </div>

                {/* 2. Metadata (Indikator, Rata-rata Skor, Interpretasi) */}
                <div className="flex justify-between items-center text-sm border-b pb-2">

                    {/* Indikator */}
                    <div className="space-y-1">
                        <p className="text-gray-500">Indikator</p>
                        <p className="font-semibold text-gray-800">{indikatorKode}</p>
                    </div>

                    {/* Rata-rata Skor */}
                    <div className="text-center space-y-1">
                        <p className="text-gray-500">Rata-rata Skor</p>
                        <p className="text-xl font-extrabold text-gray-900">
                            {avgRaw.toFixed(1)} / {maxScale}
                        </p>
                    </div>

                    {/* Interpretasi */}
                    <div className="text-right space-y-1">
                        <p className="text-gray-500">Interpretasi</p>
                        <div className={`py-1 px-3 rounded-md font-semibold text-sm ${interpretasiChipClass}`}>
                            {interpretasiLabel}
                        </div>
                    </div>
                </div>

                {/* 3. Progress Bar */}
                <div className="pt-2">
                    <PertanyaanProgressBar
                        normalizedScore={normalizedScore}
                        avgRaw={avgRaw}
                        maxScale={maxScale}
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                        Responden: {item.stats.count} | Skor Normalisasi: {normalizedScore.toFixed(2)}%
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

// ======================================================
// KOMPONEN UTAMA
// ======================================================

export default function AnalisisPertanyaanList({ data }: PertanyaanListProps) {
    if (!data || data.pertanyaan.length === 0) {
        return <p className="text-muted-foreground mt-8">Tidak ada data pertanyaan yang tersedia.</p>;
    }

    let urutanGlobal = 0;

    return (
        <div className="mt-8 space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <ChevronsRight className="h-5 w-5 text-green-600" /> Detail Kinerja per Pertanyaan
            </h2>

            {/* Loop melalui grup pertanyaan (Indikator) */}
            {data.pertanyaan.map((group) => {
                // Temukan nama indikator untuk sub-header
                const indikatorDetail = data.indikator.find(i => i.indikatorId === group.indikatorId);

                return (
                    <div key={group.indikatorId} className="space-y-3">
                        {/* Grup Pertanyaan (Sub-header) */}
                        <h3 className="text-base font-semibold text-gray-700 bg-green-50 p-3 rounded-md border-l-4 border-green-700">
                            <span className="font-bold text-green-700">{group.kode}</span> - {indikatorDetail?.indikatorNama || "Indikator Tidak Ditemukan"}
                        </h3>

                        {/* Loop melalui pertanyaan di dalam grup */}
                        {group.pertanyaan.map((pertanyaanItem) => {
                            urutanGlobal++;
                            return (
                                <PertanyaanItem
                                    key={pertanyaanItem.pertanyaanId}
                                    item={pertanyaanItem}
                                    urutanGlobal={urutanGlobal}
                                    indikatorKode={group.kode}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}