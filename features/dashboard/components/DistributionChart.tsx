"use client";

import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend } from "recharts";
import { DistributionItem } from "@/features/dashboard/types/dashboard";

// Generate pastel color consistently based on index
function pastelColor(seed: number) {
    const x = Math.sin(seed) * 10000;
    const base = (x - Math.floor(x)) * 255;

    const r = Math.floor(150 + (base % 105));
    const g = Math.floor(150 + ((base * 1.3) % 105));
    const b = Math.floor(150 + ((base * 1.7) % 105));

    return `rgb(${r}, ${g}, ${b})`;
}

interface DistributionChartProps {
    data: DistributionItem[];
}

export default function DistributionChart({ data }: DistributionChartProps) {
    const chartData = data.map((item, idx) => ({
        name: `Kuesioner ${item.kuesionerId}`,
        value: item.count,
        fill: pastelColor(idx + 1),
    }));

    return (
        <div className="w-full">
            <ResponsiveContainer width="100%" aspect={2}>
                <PieChart
                    margin={{
                        top: 20,
                        bottom: 20,
                        right: 40,
                        left: 20,
                    }}
                >
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="35%"        // geser pie ke kiri agar legend cukup tempat
                        cy="50%"
                        outerRadius="80%"
                        label
                    >
                    </Pie>

                    <Legend
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                        iconType="circle"
                    />
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
