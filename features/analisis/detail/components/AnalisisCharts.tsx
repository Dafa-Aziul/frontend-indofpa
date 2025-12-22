// fileName: src/features/analisis/detail/components/AnalisisCharts.tsx
"use client";

import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, RadarChart, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis, Radar, Cell, TooltipProps
} from 'recharts';
import {
    AnalisisDetailData,
    InterpretasiRange,
    AnalisisVariabel,
    InterpretasiResult
} from '../types';
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

interface AnalisisChartsProps {
    data: AnalisisDetailData | null;
}

// Interface untuk data yang dipetakan ke Bar Chart
interface ChartDataItem {
    name: string;
    score: number;
    interpretasi: InterpretasiResult;
    teksPertanyaan: string;
    interpretasiConfig: InterpretasiRange[];
}

// Interface untuk data yang dipetakan ke Radar Chart
interface RadarDataItem {
    subject: string;
    score: number;
    fullMark: number;
    indikatorNama: string;
    interpretasi: InterpretasiResult | null;
    interpretasiConfig: InterpretasiRange[];
}

// ======================================================
// UTILS & COLOR LOGIC
// ======================================================

const INTERPRETATION_PALETTE = ['#FF9494', '#FFBD44', '#5EE398', '#32CD32', '#2D8A4E'];

const getDynamicColor = (score: number, interpretasiConfig: InterpretasiRange[]) => {
    if (!interpretasiConfig || interpretasiConfig.length === 0) return '#94a3b8';

    const sorted = [...interpretasiConfig].sort((a, b) => a.min - b.min);
    const index = sorted.findIndex(item => score >= item.min && score <= item.max);

    if (index === -1) return '#94a3b8';

    const factor = (INTERPRETATION_PALETTE.length - 1) / (Math.max(1, sorted.length - 1));
    return INTERPRETATION_PALETTE[Math.round(index * factor)];
};

// ======================================================
// CUSTOM TOOLTIP (No Any Type)
// ======================================================

interface CustomTooltipProps extends TooltipProps<number, string> {
    dataMapping: (ChartDataItem | RadarDataItem)[];
    type: 'pertanyaan' | 'indikator';
    payload?: [];
    label?: string | number;
}

const CustomTooltip = ({ active, payload, label, dataMapping, type }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        // Mencari item asli dari mapping berdasarkan label/name
        const item = dataMapping.find((d) =>
            type === 'pertanyaan'
                ? (d as ChartDataItem).name === label
                : (d as RadarDataItem).subject === label
        );

        if (!item) return null;

        const isPertanyaan = type === 'pertanyaan';
        const currentItem = item as ChartDataItem & RadarDataItem;

        return (
            <div className="bg-white p-3 border rounded-xl shadow-xl max-w-60 sm:max-w-[300px] text-xs">
                <p className="font-bold text-slate-800 mb-1">
                    {label} {currentItem.indikatorNama ? `- ${currentItem.indikatorNama}` : ''}
                </p>

                {isPertanyaan && currentItem.teksPertanyaan && (
                    <p className="italic text-slate-500 mb-2 line-clamp-3">{currentItem.teksPertanyaan}</p>
                )}

                <div className="flex justify-between items-center border-t pt-2 gap-4">
                    <span className="font-medium text-slate-600">
                        Skor: <span className="font-bold text-slate-900">{currentItem.score.toFixed(1)}%</span>
                    </span>
                    {currentItem.interpretasi && (
                        <span
                            className="font-bold uppercase text-[10px] px-2 py-0.5 rounded-full text-white"
                            style={{ backgroundColor: getDynamicColor(currentItem.score, currentItem.interpretasiConfig) }}
                        >
                            {currentItem.interpretasi.label}
                        </span>
                    )}
                </div>
            </div>
        );
    }
    return null;
};

// ======================================================
// SUB-KOMPONEN: TABEL VARIABEL
// ======================================================

const RingkasanVariabelTable: React.FC<{ data: AnalisisDetailData }> = ({ data }) => {
    const config = data.kuesioner.analisisConfig.interpretasi;

    return (
        <Card className="shadow-md overflow-hidden border-none sm:border">
            <CardHeader className='border-b bg-slate-50/50 py-4 px-4 sm:px-6'>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base sm:text-lg font-bold">Ringkasan Kinerja Variabel</CardTitle>
                    <div className="flex lg:hidden items-center gap-1 text-[10px] text-slate-400 font-medium italic">
                        <span>Geser</span>
                        <div className="w-4 h-0.5 bg-slate-300 rounded-full animate-pulse" />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-5">
                <div className="relative w-full overflow-x-auto rounded-lg border">
                    <Table className="min-w-[600px] border-collapse">
                        <TableHeader className="bg-green-600">
                            <TableRow className="hover:bg-green-600 border-none">
                                <TableHead className="text-white font-bold h-12 px-4 whitespace-nowrap">KODE</TableHead>
                                <TableHead className="text-white font-bold h-12 px-4">NAMA VARIABEL</TableHead>
                                <TableHead className="text-right text-white font-bold h-12 px-4 whitespace-nowrap">SKOR (%)</TableHead>
                                <TableHead className="text-right text-white font-bold h-12 px-4 whitespace-nowrap">INTERPRETASI</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.variabel.map((v: AnalisisVariabel, idx: number) => (
                                <TableRow key={v.variabelId} className={cn(
                                    "hover:bg-slate-50 border-b border-slate-100 transition-colors",
                                    idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                                )}>
                                    <TableCell className="font-bold text-slate-500 px-4">{v.kode}</TableCell>
                                    <TableCell className="font-semibold text-slate-700 px-4">{v.nama}</TableCell>
                                    <TableCell className="text-right font-black text-slate-900 px-4">
                                        {v.avgNormalized.toFixed(1)}%
                                    </TableCell>
                                    <TableCell className="text-right px-4">
                                        <span
                                            className="font-bold text-[11px] sm:text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-white shadow-sm border border-slate-100"
                                            style={{ color: getDynamicColor(v.avgNormalized, config) }}
                                        >
                                            {v.interpretasi.label}
                                        </span>
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
// MAIN COMPONENT
// ======================================================

export default function AnalisisCharts({ data }: AnalisisChartsProps) {
    if (!data) return null;

    const interpretasiConfig = data.kuesioner.analisisConfig.interpretasi;

    const pertanyaanChartData = useMemo<ChartDataItem[]>(() => {
        const list: ChartDataItem[] = [];
        data.pertanyaan.forEach(group => {
            group.pertanyaan.forEach(p => {
                list.push({
                    name: `${group.kode}-${p.urutan}`,
                    score: p.stats.avgNormalized,
                    interpretasi: p.interpretasi,
                    teksPertanyaan: p.teksPertanyaan,
                    interpretasiConfig
                });
            });
        });
        return list;
    }, [data.pertanyaan, interpretasiConfig]);

    const indikatorRadarData = useMemo<RadarDataItem[]>(() => {
        return data.indikator.map(i => ({
            subject: i.indikatorKode,
            score: i.avgNormalized,
            fullMark: 100,
            indikatorNama: i.indikatorNama,
            interpretasi: i.interpretasi,
            interpretasiConfig
        }));
    }, [data.indikator, interpretasiConfig]);

    return (
        <div className="space-y-6">
            <RingkasanVariabelTable data={data} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* BAR CHART */}
                <Card className="shadow-md">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <Info className="w-3 h-3" /> Kinerja Per Pertanyaan
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] sm:h-[400px] px-0 sm:px-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={pertanyaanChartData} margin={{ top: 10, right: 10, left: -25, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }}
                                    angle={-45}
                                    textAnchor="end"
                                    interval={0}
                                />
                                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#cbd5e1' }} />
                                <Tooltip content={<CustomTooltip dataMapping={pertanyaanChartData} type="pertanyaan" />} />
                                <Bar dataKey="score" radius={[4, 4, 0, 0]} barSize={20}>
                                    {pertanyaanChartData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={getDynamicColor(entry.score, interpretasiConfig)}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* RADAR CHART */}
                <Card className="shadow-md">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <Info className="w-3 h-3" /> Radar Kinerja Indikator
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] sm:h-[400px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={indikatorRadarData}>
                                <PolarGrid stroke="#e2e8f0" />
                                <PolarAngleAxis
                                    dataKey="subject"
                                    tick={{ fontSize: 9, fontWeight: 800, fill: '#64748b' }}
                                />
                                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 8 }} />
                                <Radar
                                    name="Skor"
                                    dataKey="score"
                                    stroke="#16a34a"
                                    fill="#22c55e"
                                    fillOpacity={0.5}
                                />
                                <Tooltip content={<CustomTooltip dataMapping={indikatorRadarData} type="indikator" />} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}