// fileName: src/features/monitoring/responden/components/IndicatorScoreTable.tsx
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { IndicatorScoreItem } from '../types';

interface IndicatorScoreTableProps {
    scores: IndicatorScoreItem[];
}

const IndicatorScoreTable: React.FC<IndicatorScoreTableProps> = ({ scores }) => {
    if (scores.length === 0) return null;

    const sortedScores = [...scores].sort((a, b) => b.scoreRaw - a.scoreRaw);

    const highestScore = sortedScores[0]?.scoreRaw;
    const lowestScore = sortedScores[sortedScores.length - 1]?.scoreRaw;

    return (
        <Card className="overflow-hidden">
            <CardHeader className="border-b">
                <h3 className="text-xl font-semibold">Skor Per Indikator</h3>
                <p className="text-sm text-muted-foreground">
                    Skor dinilai berdasarkan jawaban responden pada pertanyaan di bawah indikator.
                </p>
            </CardHeader>
            <CardContent className="p-0 sm:p-6">
                {/* --- DESKTOP VIEW: TABLE (Hidden on mobile) --- */}
                <div className="hidden md:block overflow-x-auto">
                    <div className="rounded-lg border">
                        <Table className="min-w-[700px]">
                            <TableHeader>
                                <TableRow className="bg-green-600 hover:bg-green-700 pointer-events-none">
                                    <TableHead className="w-[50px] text-white font-bold">No</TableHead>
                                    <TableHead className="text-white font-bold">Indikator</TableHead>
                                    <TableHead className="text-right text-white font-bold">Skor Mentah</TableHead>
                                    <TableHead className="text-right text-white font-bold">Skor Maks</TableHead>
                                    <TableHead className="text-right text-white font-bold">Skor Normalisasi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sortedScores.map((item, index) => {
                                    const isHighest = item.scoreRaw === highestScore;
                                    const isLowest = item.scoreRaw === lowestScore;

                                    return (
                                        <TableRow
                                            key={item.indikatorId}
                                            className={`${isHighest ? 'bg-green-50 hover:bg-green-100' : isLowest ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-gray-50'} transition-colors`}
                                        >
                                            <TableCell className="font-medium">{index + 1}</TableCell>
                                            <TableCell className="font-medium flex items-center gap-2">
                                                {item.namaIndikator}
                                                {isHighest && <TrendingUp className="h-4 w-4 text-green-600" />}
                                                {isLowest && <TrendingDown className="h-4 w-4 text-red-600" />}
                                            </TableCell>
                                            <TableCell className="text-right font-bold">{item.scoreRaw.toFixed(2)}</TableCell>
                                            <TableCell className="text-right">{item.maxScore}</TableCell>
                                            <TableCell className="text-right font-bold">
                                                {item.scoreNormalized ? `${item.scoreNormalized.toFixed(1)}%` : '-'}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* --- MOBILE VIEW: CARD LIST (Hidden on desktop) --- */}
                <div className="md:hidden divide-y divide-gray-100">
                    {sortedScores.map((item, index) => {
                        const isHighest = item.scoreRaw === highestScore;
                        const isLowest = item.scoreRaw === lowestScore;

                        return (
                            <div
                                key={item.indikatorId}
                                className={`p-4 ${isHighest ? 'bg-green-50' : isLowest ? 'bg-red-50' : 'bg-white'}`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex gap-2 items-center">
                                        <span className="text-xs font-bold text-muted-foreground">#{index + 1}</span>
                                        <h4 className="font-bold text-sm flex items-center gap-1">
                                            {item.namaIndikator}
                                            {isHighest && <TrendingUp className="h-3 w-3 text-green-600" />}
                                            {isLowest && <TrendingDown className="h-3 w-3 text-red-600" />}
                                        </h4>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-muted-foreground">Normalisasi</p>
                                        <p className="font-bold text-green-700">
                                            {item.scoreNormalized ? `${item.scoreNormalized.toFixed(1)}%` : '-'}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-3">
                                    <div className="bg-white/50 p-2 rounded border border-gray-100">
                                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Skor Mentah</p>
                                        <p className="text-sm font-bold">{item.scoreRaw.toFixed(2)}</p>
                                    </div>
                                    <div className="bg-white/50 p-2 rounded border border-gray-100">
                                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Skor Maks</p>
                                        <p className="text-sm font-bold">{item.maxScore}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};

export default IndicatorScoreTable;