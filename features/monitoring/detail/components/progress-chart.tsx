// fileName: src/features/monitoring/detail/components/progress-chart.tsx
"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';

interface ProgressChartProps {
    responded: number;
    target: number;
    progress: number;
}

const COLORS = ['#10b981', '#f0f0f0']; // Hijau (Emerald 500) dan Abu-abu

export default function ProgressChart({ responded, target, progress }: ProgressChartProps) {
    const remaining = target - responded;
    const data = [
        { name: 'Respon Masuk', value: responded, color: COLORS[0] },
        { name: 'Target Tersisa', value: remaining > 0 ? remaining : 0, color: COLORS[1] },
    ];

    // Total responden di bawah 0 tidak diizinkan di grafik
    const totalCount = target;

    // Persentase target tersisa
    const remainingPercent = ((remaining / target) * 100).toFixed(2);

    return (
        <Card>
            <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Grafik Progress Target</h3>

                <div className="flex flex-col md:flex-row items-center">
                    <div className="w-full h-64 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    dataKey="value"
                                    startAngle={90}
                                    endAngle={-270}
                                    paddingAngle={1}
                                    isAnimationActive={true}
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend layout="horizontal" align="center" verticalAlign="bottom" />
                            </PieChart>
                        </ResponsiveContainer>

                        {/* Teks Tengah Grafik */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
                            <p className="text-2xl font-bold text-gray-800">
                                {progress.toFixed(0)}%
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Capaian
                            </p>
                        </div>
                    </div>

                    {/* Ringkasan Target Tersisa (Sesuai Desain) */}
                    <div className="w-full md:w-1/3 p-4 text-sm space-y-2 border-t md:border-t-0 md:border-l mt-4 md:mt-0">
                        <p className="font-semibold text-green-600">
                            Respon Masuk: {responded} ({progress.toFixed(2)}%)
                        </p>
                        <p className="text-red-500">
                            Target tersisa: {remaining > 0 ? remaining : 0} ({remainingPercent}%)
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}