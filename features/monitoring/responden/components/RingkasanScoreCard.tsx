// fileName: src/features/monitoring/responden/components/RingkasanScoreCard.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RingkasanScore } from "../types";

interface RingkasanScoreCardProps {
    ringkasan: RingkasanScore;
}

const RingkasanScoreCard: React.FC<RingkasanScoreCardProps> = ({ ringkasan }) => (
    <Card className="bg-green-600 text-white shadow-lg rounded-xl">
        <CardContent className="p-4 sm:p-6">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                {/* Left Section */}
                <div className="space-y-1 text-center sm:text-left">
                    <h4 className="text-lg sm:text-xl font-bold">
                        Ringkasan Penilaian Survei
                    </h4>

                    <p className="text-xs sm:text-sm text-green-200 leading-relaxed">
                        {ringkasan.teksRingkasan}
                    </p>
                </div>

                {/* Right Section */}
                <div className="text-center sm:text-right space-y-1">

                    <p className="text-lg sm:text-xl font-bold">
                        {ringkasan.totalSkor}
                    </p>

                    <p className="text-xs sm:text-sm text-green-200">
                        Rata-rata skor: {ringkasan.rataRataSkor}
                    </p>

                    <p className="text-base sm:text-lg font-bold text-green-300">
                        Pencapaian: {ringkasan.pencapaian}
                    </p>

                </div>

            </div>

        </CardContent>
    </Card>
);

export default RingkasanScoreCard;