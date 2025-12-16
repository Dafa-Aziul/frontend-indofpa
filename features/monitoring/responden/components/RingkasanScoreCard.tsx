// fileName: src/features/monitoring/responden/components/RingkasanScoreCard.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RingkasanScore } from '../types';

interface RingkasanScoreCardProps {
    ringkasan: RingkasanScore;
}

const RingkasanScoreCard: React.FC<RingkasanScoreCardProps> = ({ ringkasan }) => (
    <Card className="bg-green-600 text-white shadow-lg">
        <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0">

                <div className="space-y-1">
                    <h4 className="text-xl font-bold">Ringkasan Penilaian Survei</h4>
                    <p className="text-sm text-green-200">{ringkasan.teksRingkasan}</p>
                </div>

                <div className="text-right space-y-1">
                    <p className="text-xl font-bold">{ringkasan.totalSkor}</p>

                    <p className="text-sm text-green-200">
                        Rata-rata skor: {ringkasan.rataRataSkor}
                    </p>

                    <p className="text-lg font-bold text-green-300">
                        Pencapaian: {ringkasan.pencapaian}
                    </p>
                </div>
            </div>
        </CardContent>
    </Card>
);

export default RingkasanScoreCard;