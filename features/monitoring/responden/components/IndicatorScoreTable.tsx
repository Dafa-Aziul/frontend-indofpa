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
            <CardContent className="space-x-5">
                <div className="relative w-full overflow-x-auto rounded-lg border">
                    <Table className="min-w-[700px]">
                        <TableHeader className=''>
                            <TableRow className="bg-green-600 hover:bg-green-700">
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
                                    // ✅ PERBAIKAN: Hapus fragment kosong (<> dan </>)
                                    <TableRow key={item.indikatorId} className={`${isHighest ? 'bg-green-50 hover:bg-green-100' : isLowest ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-gray-50'} transition-colors`}>
                                        <TableCell className="font-medium">{index + 1}</TableCell>
                                        <TableCell className="font-medium flex items-center gap-2">
                                            {item.namaIndikator}
                                            {isHighest && <TrendingUp className="h-4 w-4 text-green-600" title="Skor Tertinggi" />}
                                            {isLowest && <TrendingDown className="h-4 w-4 text-red-600" title="Skor Terendah" />}
                                        </TableCell>
                                        <TableCell className="text-right font-bold">{item.scoreRaw.toFixed(2)}</TableCell>
                                        <TableCell className="text-right">{item.maxScore}</TableCell>
                                        <TableCell className="text-right">
                                            {item.scoreNormalized ? `${item.scoreNormalized.toFixed(1)}%` : '-'}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card >
    );
};

export default IndicatorScoreTable;