// fileName: src/features/analisis/detail/components/AnalisisCharts.tsx
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { AnalisisDetailData } from '../types';

interface AnalisisChartsProps {
    data: AnalisisDetailData | null;
}

// ======================================================
// UTILS
// ======================================================

// BAR CHART: Mapping data untuk Pertanyaan ([Kode Indikator]-[Urutan])
const mapPertanyaanData = (pertanyaanGroupArray: AnalisisDetailData['pertanyaan']) => {
    const dataList = [];
    pertanyaanGroupArray.forEach(group => {
        const indikatorKode = group.kode;
        group.pertanyaan.forEach(p => {
            const label = `${indikatorKode}-${p.urutan}`;
            dataList.push({
                name: label,
                score: p.stats.avgNormalized,
                // Tambahkan detail interpretasi dan teks untuk akses mudah di Tooltip
                interpretasi: p.interpretasi,
                teksPertanyaan: p.teksPertanyaan
            });
        });
    });
    return dataList;
};

// RADAR CHART: Mapping data untuk Indikator
const mapIndikatorData = (indikatorArray: AnalisisDetailData['indikator']) => {
    return indikatorArray.map(i => ({
        subject: i.indikatorKode,
        score: i.avgNormalized,
        fullMark: 100,
        // Tambahkan detail interpretasi dan nama indikator untuk akses mudah di Tooltip
        interpretasi: i.interpretasi,
        indikatorNama: i.indikatorNama
    }));
};

const getInterpretasiColor = (label: string) => {
    if (label.includes("Sangat Tinggi")) return "text-green-700";
    if (label.includes("Tinggi")) return "text-green-500";
    if (label.includes("Cukup")) return "text-yellow-600";
    return "text-gray-500";
};

// ======================================================
// SUB-KOMPONEN: TABEL RINGKASAN VARIABEL
// ======================================================

const RingkasanVariabelTable: React.FC<AnalisisChartsProps> = ({ data }) => {
    // Utility getInterpretasiColor harus tersedia di scope ini (sudah ada di AnalisisCharts.tsx)
    const getInterpretasiColor = (label: string) => {
        if (label.includes("Sangat Tinggi")) return "text-green-700";
        if (label.includes("Tinggi")) return "text-green-500";
        if (label.includes("Cukup")) return "text-yellow-600";
        return "text-gray-500";
    };

    return (
        <Card className="shadow-md">
            <CardHeader className='border-b'>
                <CardTitle className="text-lg">Ringkasan Kinerja Variabel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="relative w-full overflow-x-auto rounded-lg border">
                    <Table>
                        {/* ✅ PERBAIKAN: Menggunakan styling header yang menonjol */}
                        <TableHeader className="bg-green-600">
                            <TableRow className="pointer-events-none">
                                <TableHead className="font-bold text-white">Kode</TableHead>
                                <TableHead className="font-bold text-white">Nama Variabel</TableHead>
                                <TableHead className="text-right font-bold text-white">Skor (0-100)</TableHead>
                                <TableHead className="text-right font-bold text-white">Interpretasi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.variabel.map((v) => (
                                <TableRow className="hover:bg-grey-200" key={v.variabelId}>
                                    <TableCell className="font-medium">{v.kode}</TableCell>
                                    <TableCell>{v.nama}</TableCell>
                                    <TableCell className="text-right font-bold">
                                        {v.avgNormalized !== null ? v.avgNormalized.toFixed(2) : 'N/A'}
                                    </TableCell>
                                    <TableCell className={`text-right font-semibold ${getInterpretasiColor(v.interpretasi?.label || 'N/A')}`}>
                                        {v.interpretasi?.label || 'N/A'}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

// ======================================================
// CUSTOM TOOLTIP COMPONENTS
// ======================================================

// Tipe untuk data yang dicari dalam Tooltip
type CustomTooltipProps = {
    active?: boolean;
    payload?: any;
    label?: string;
    dataMapping?: any[]; // Array data chart (pertanyaanChartData atau indikatorRadarData)
    type: 'pertanyaan' | 'indikator';
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, dataMapping, type }) => {
    if (active && payload && payload.length) {
        const item = dataMapping?.find(d => (type === 'pertanyaan' ? d.name === label : d.subject === label));
        const score = item?.score || payload[0]?.value;
        const interpretasi = item?.interpretasi;

        if (score === null) {
            return (
                <div className="bg-white/80 border border-gray-300 p-2 text-sm shadow-lg backdrop-blur-sm">
                    <p className="font-bold">{label}</p>
                    <p className="text-red-500">Skor: Tidak ada data.</p>
                </div>
            );
        }

        return (
            <div className="bg-white/80 border border-gray-300 p-3 text-sm shadow-lg backdrop-blur-sm rounded-lg">
                {type === 'pertanyaan' ? (
                    <>
                        <p className="font-bold text-gray-700 mb-1">{label} - Skor Pertanyaan</p>
                        <p className="mb-2 italic text-gray-600">"{item.teksPertanyaan}"</p>
                    </>
                ) : (
                    <>
                        <p className="font-bold text-gray-700 mb-1">{label} - {item.indikatorNama}</p>
                    </>
                )}

                <p className="text-sm">Skor Rata-rata: <span className="font-bold text-green-600">{score.toFixed(2)} %</span></p>

                {interpretasi?.label && (
                    <p className="text-sm">Interpretasi: <span className="font-bold">{interpretasi.label}</span> (<span className="text-xs">{interpretasi.range}</span>)</p>
                )}
            </div>
        );
    }
    return null;
};


// ======================================================
// KOMPONEN UTAMA
// ======================================================

export default function AnalisisCharts({ data }: AnalisisChartsProps) {
    if (!data || data.pertanyaan.length === 0 || data.indikator.length === 0) {
        return (
            <Card className="h-96 flex items-center justify-center">
                <p className="text-muted-foreground">Tidak ada data analisis yang cukup untuk ditampilkan.</p>
            </Card>
        );
    }

    const pertanyaanChartData = mapPertanyaanData(data.pertanyaan);
    const indikatorRadarData = mapIndikatorData(data.indikator);

    return (
        <div className="space-y-6">
            {/* 1. Ringkasan Variabel (Tabel) */}
            <RingkasanVariabelTable data={data} />


            {/* 2. Bar Chart (Pertanyaan) & Radar Chart (Indikator) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* 1A. Bar Chart: Pertanyaan Performance */}
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="text-lg">Kinerja Pertanyaan</CardTitle>
                    </CardHeader>
                    <CardContent className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={pertanyaanChartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" angle={-30} textAnchor="end" height={50} />
                                <YAxis domain={[0, 100]} />
                                {/* ✅ GUNAKAN CUSTOM TOOLTIP */}
                                <Tooltip content={<CustomTooltip dataMapping={pertanyaanChartData} type="pertanyaan" />} />
                                <Bar
                                    dataKey="score"
                                    name="Skor (%)"
                                    fill="#4ade80"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* 1B. Radar Chart: Indikator Performance */}
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="text-lg">Kinerja Indikator</CardTitle>
                    </CardHeader>
                    <CardContent className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={indikatorRadarData}>
                                <PolarGrid stroke="#e5e7eb" />
                                <PolarAngleAxis dataKey="subject" />
                                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#e5e7eb" />
                                <Radar
                                    name="Skor Indikator"
                                    dataKey="score"
                                    stroke="#22c55e"
                                    fill="#22c55e"
                                    fillOpacity={0.6}
                                />
                                {/* ✅ GUNAKAN CUSTOM TOOLTIP */}
                                <Tooltip content={<CustomTooltip dataMapping={indikatorRadarData} type="indikator" />} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>


        </div>
    );
}