// fileName: src/features/analisis/detail/components/AnalysisPDFDocument.tsx
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { createTw } from 'react-pdf-tailwind';
import { AnalisisDetailData, FilterPayload } from '../types';

/**
 * Interface untuk Config Interpretasi
 */
interface InterpretasiConfigItem {
    min: number;
    max: number;
    label: string;
}

const tw = createTw({
    theme: {
        extend: {
            colors: {
                primary: '#16a34a',
                slate: '#1e293b',
                danger: '#ef4444',
                warning: '#f59e0b',
                info: '#0ea5e9',
            },
        },
        fontFamily: {
            sans: ['Helvetica'],
        },
    },
});

const INTERPRETATION_PALETTE = [
    '#FF9494', // Sangat Rendah
    '#FFBD44', // Rendah
    '#5EE398', // Sedang
    '#32CD32', // Tinggi
    '#2D8A4E', // Sangat Tinggi
];

const getStepColor = (index: number, totalSteps: number): string => {
    if (totalSteps <= 1) return INTERPRETATION_PALETTE[INTERPRETATION_PALETTE.length - 1];
    const factor = (INTERPRETATION_PALETTE.length - 1) / (totalSteps - 1);
    const paletteIndex = Math.round(index * factor);
    return INTERPRETATION_PALETTE[paletteIndex];
};

/**
 * FIX: Menggunakan .toSorted() agar tidak memutasi array asli yang read-only
 */
const getColorForScore = (score: number, interpretasi: InterpretasiConfigItem[]) => {
    const sorted = interpretasi.toSorted((a, b) => a.min - b.min);
    const index = sorted.findIndex((item) => score >= item.min && score <= item.max);
    return index !== -1 ? getStepColor(index, sorted.length) : '#1e293b';
};

const FILTER_LABELS: Record<string, string> = {
    L: 'Laki-laki', P: 'Perempuan',
    USIA_18_24: '18–24 Tahun', USIA_25_34: '25–34 Tahun', USIA_35_44: '35–44 Tahun',
    USIA_45_54: '45–54 Tahun', USIA_55_64: '55–64 Tahun', USIA_65_PLUS: '65+ Tahun',
    TidakTamatSD: 'Tidak Tamat SD', SD: 'SD / Sederajat', SMP: 'SMP / Sederajat',
    SMA: 'SMA / Sederajat', Diploma: 'Diploma (D1–D4)', S1: 'Sarjana (S1)',
    S2: 'Magister (S2)', S3: 'Doktor (S3)',
    Islam: 'Islam', KristenProtestan: 'Kristen Protestan', Katolik: 'Katolik',
    Hindu: 'Hindu', Buddha: 'Buddha', Konghucu: 'Konghucu', Kepercayaan: 'Penghayat Kepercayaan',
};

interface AnalysisPDFDocumentProps {
    data: AnalisisDetailData;
    filters?: FilterPayload;
}

export const AnalysisPDFDocument = ({ data, filters = {} }: AnalysisPDFDocumentProps) => {
    const reportDate = new Date().toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric',
    });

    const activeFilterTexts = Object.entries(filters).map(([key, value]) => {
        if (!value || (Array.isArray(value) && value.length === 0)) return null;
        const categoryName = key.replace(/([A-Z])/g, ' $1').toUpperCase();
        const valueLabels = Array.isArray(value)
            ? value.map(v => FILTER_LABELS[v as string] || v).join(', ')
            : FILTER_LABELS[value as string] || value;
        return { category: categoryName, values: valueLabels };
    }).filter((item): item is { category: string; values: string } => item !== null);

    /**
     * FIX UTAMA: Menggunakan .toSorted() alih-alih .sort() 
     * untuk menghindari error "Cannot assign to read only property"
     */
    const interpretasiConfig: InterpretasiConfigItem[] = data.kuesioner.analisisConfig.interpretasi
        .toSorted((a, b) => a.min - b.min);

    return (
        <Document title={`Laporan Analisis - ${data?.kuesioner?.judul || 'IndoFPA'}`}>
            <Page size="A4" style={[tw('p-10 text-slate'), { fontFamily: 'Helvetica' }]}>

                {/* HEADER */}
                <View style={tw('flex-row items-center mb-6 border-b-2 border-primary pb-3')}>
                    <View style={tw('w-10 h-10 bg-primary rounded-lg items-center justify-center mr-3')}>
                        <View style={tw('w-1.5 h-4 bg-white mx-0.5 mt-2 rounded-sm')} />
                        <View style={tw('w-1.5 h-6 bg-white mx-0.5 rounded-sm')} />
                        <View style={tw('w-1.5 h-3 bg-white mx-0.5 mt-3 rounded-sm')} />
                    </View>
                    <View>
                        <Text style={tw('text-lg font-bold')}>Laporan Analisis Kuesioner</Text>
                        <Text style={tw('text-[10px] text-gray-400 uppercase')}>{data?.kuesioner?.judul}</Text>
                    </View>
                </View>

                {/* FILTER INFO */}
                {activeFilterTexts.length > 0 && (
                    <View style={tw('mb-6 p-3 bg-gray-50 border border-gray-200 rounded-lg')}>
                        <Text style={tw('text-[7px] font-bold text-gray-500 uppercase mb-1')}>Filter Terpasang</Text>
                        <View style={tw('flex-row flex-wrap')}>
                            {activeFilterTexts.map((f, i) => (
                                <Text key={i} style={tw('text-[7px] mr-4')}>
                                    <Text style={tw('text-gray-400 font-bold')}>{f.category}: </Text>{f.values}
                                </Text>
                            ))}
                        </View>
                    </View>
                )}

                {/* SUMMARY CARDS */}
                <View style={tw('flex-row mb-6 gap-4')}>
                    <View style={tw('flex-1 bg-green-50 p-3 rounded-xl border border-green-100')}>
                        <Text style={tw('text-[7px] text-primary font-bold uppercase')}>Skor Indeks Total</Text>
                        <Text style={[tw('text-xl font-bold'), { color: getColorForScore(data.overall, interpretasiConfig) }]}>
                            {data?.overall?.toFixed(1)}%
                        </Text>
                        <Text style={tw('text-[8px] font-bold')}>{data?.overallInterpretasi?.label}</Text>
                    </View>
                    <View style={tw('flex-1 bg-slate-50 p-3 rounded-xl border border-slate-200')}>
                        <Text style={tw('text-[7px] text-slate-400 font-bold uppercase')}>Total Responden</Text>
                        <Text style={tw('text-xl font-bold')}>{data?.totalResponden?.toLocaleString()} Orang</Text>
                        <Text style={tw('text-[8px]')}>Per {reportDate}</Text>
                    </View>
                </View>

                {/* LEGEND INTERPRETASI DINAMIS */}
                <View style={tw('mb-8 p-4 bg-white border border-gray-100 rounded-2xl')}>
                    <Text style={tw('text-[9px] font-bold text-slate-500 mb-3 uppercase tracking-widest')}>
                        Legend Interpretasi Skor
                    </Text>
                    <View style={tw('flex-row flex-wrap gap-y-3')}>
                        {interpretasiConfig.map((item, index, array) => (
                            <View key={index} style={tw('flex-row items-center mr-6')}>
                                <View
                                    style={[
                                        tw('w-3 h-3 rounded-sm mr-2'),
                                        { backgroundColor: getStepColor(index, array.length) }
                                    ]}
                                />
                                <Text style={tw('text-[8px] font-bold text-slate-600')}>
                                    {item.min}%-{item.max}%: {item.label}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* 1. TABEL ANALISIS VARIABEL */}
                <View style={tw('mb-6')}>
                    <Text style={tw('text-[9px] font-bold mb-2 uppercase text-slate-500')}>1. Ringkasan Per Variabel</Text>
                    <View style={tw('border border-gray-200 rounded-lg overflow-hidden')}>
                        <View style={tw('flex-row bg-slate p-2 text-white text-[7px] font-bold')}>
                            <Text style={tw('w-15 text-center')}>KODE</Text>
                            <Text style={tw('flex-1 ml-2')}>VARIABEL</Text>
                            <Text style={tw('w-20 text-center')}>SKOR (%)</Text>
                            <Text style={tw('w-20 text-right pr-2')}>INTERPRETASI</Text>
                        </View>
                        {data?.variabel?.map((v, i) => (
                            <View key={i} style={tw(`flex-row p-2 text-[7px] border-t border-gray-100 ${i % 2 !== 0 ? 'bg-gray-50' : ''}`)}>
                                <Text style={tw('w-15 text-center font-bold text-gray-400')}>{v.kode}</Text>
                                <Text style={tw('flex-1 ml-2')}>{v.nama}</Text>
                                <Text style={[tw('w-20 text-center font-bold'), { color: getColorForScore(v.avgNormalized, interpretasiConfig) }]}>
                                    {v.avgNormalized.toFixed(1)}%
                                </Text>
                                <Text style={tw('w-20 text-right pr-2 font-bold text-slate-500')}>{v.interpretasi?.label}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* 2. TABEL ANALISIS INDIKATOR */}
                <View style={tw('mb-6')}>
                    <Text style={tw('text-[9px] font-bold mb-2 uppercase text-slate-500')}>2. Ringkasan Per Indikator</Text>
                    <View style={tw('border border-gray-200 rounded-lg overflow-hidden')}>
                        <View style={tw('flex-row bg-gray-100 p-2 text-slate text-[7px] font-bold')}>
                            <Text style={tw('w-15 text-center')}>KODE</Text>
                            <Text style={tw('flex-1 ml-2')}>INDIKATOR</Text>
                            <Text style={tw('w-15 text-center')}>ITEM</Text>
                            <Text style={tw('w-20 text-center')}>SKOR (%)</Text>
                        </View>
                        {data?.indikator?.map((ind, i) => (
                            <View key={i} style={tw(`flex-row p-2 text-[7px] border-t border-gray-100 ${i % 2 !== 0 ? 'bg-gray-50' : ''}`)}>
                                <Text style={tw('w-15 text-center font-bold text-gray-400')}>{ind.indikatorKode}</Text>
                                <Text style={tw('flex-1 ml-2')}>{ind.indikatorNama}</Text>
                                <Text style={tw('w-15 text-center text-gray-400')}>{ind.pertanyaanCount}</Text>
                                <Text style={[tw('w-20 text-center font-bold'), { color: getColorForScore(ind.avgNormalized, interpretasiConfig) }]}>
                                    {ind.avgNormalized.toFixed(1)}%
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* 3. DETAIL PERTANYAAN (BREAKDOWN) */}
                <View break style={tw('pt-6')}>
                    <Text style={tw('text-[9px] font-bold mb-4 uppercase text-slate-500')}>3. Detail Jawaban Per Pertanyaan</Text>
                    {data?.pertanyaan?.map((group, groupIdx) => (
                        <View key={groupIdx} style={tw('mb-5')}>
                            <View style={tw('bg-slate-800 p-2 rounded-t-lg')}>
                                <Text style={tw('text-[8px] font-bold text-white')}>INDIKATOR {group.kode}</Text>
                            </View>
                            <View style={tw('border border-slate-200 border-t-0 rounded-b-lg overflow-hidden')}>
                                {group.pertanyaan.map((q, qIdx) => (
                                    <View key={qIdx} style={tw(`p-2 border-b border-slate-100 ${qIdx % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`)}>
                                        <View style={tw('flex-row justify-between mb-1')}>
                                            <Text style={tw('text-[7px] text-gray-400 font-bold')}>ITEM #{q.urutan}</Text>
                                            <Text style={[tw('text-[7px] font-bold'), { color: getColorForScore(q.stats.avgNormalized, interpretasiConfig) }]}>
                                                Skor: {q.stats.avgNormalized.toFixed(1)}% ({q.interpretasi.label})
                                            </Text>
                                        </View>
                                        <Text style={tw('text-[8px] leading-relaxed text-slate')}>{q.teksPertanyaan}</Text>
                                        <View style={tw('flex-row mt-1 gap-4')}>
                                            <Text style={tw('text-[6px] text-gray-500')}>Rerata Raw: {q.stats.avgRaw.toFixed(2)}</Text>
                                            <Text style={tw('text-[6px] text-gray-500')}>Skala: {q.scale.min} - {q.scale.max}</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>

                {/* FOOTER */}
                <View fixed style={tw('absolute bottom-10 left-10 right-10 flex-row justify-between border-t border-gray-100 pt-3')}>
                    <Text style={tw('text-[7px] text-gray-400 italic')}>Laporan Analisis Kuesioner Otomatis - IndoFPA</Text>
                    <Text style={tw('text-[7px] text-gray-400 font-bold')} render={({ pageNumber, totalPages }) => `HALAMAN ${pageNumber} / ${totalPages}`} />
                </View>

            </Page>
        </Document>
    );
};