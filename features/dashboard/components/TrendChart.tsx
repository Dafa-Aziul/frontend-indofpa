"use client";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";
import { TrendItem } from "@/features/dashboard/types/dashboard";

interface TrendChartProps {
    data: TrendItem[];
}

// Tipe custom agar TS tidak error
interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
        name: string;
        value: number;
        payload: TrendItem;
    }>;
    label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (!active || !payload || payload.length === 0) return null;

    const count = payload[0].value;
    const dateStr = label!;
    const dateObj = new Date(dateStr);

    const formattedDate = new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(dateObj);

    const dayName = new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
    }).format(dateObj);

    return (
        <div className="bg-white p-3 rounded-md shadow border text-sm">
            <p className="font-semibold">{formattedDate}, {dayName}</p>
            <p>Total Responden: <span className="font-semibold">{count}</span></p>
        </div>
    );
};

export default function TrendChart({ data }: TrendChartProps) {
    return (
        <div className="p-4 w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />

                    <XAxis dataKey="date" tick={{ fontSize: 12 }} tickMargin={8} />
                    <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />

                    <Tooltip content={<CustomTooltip />} />

                    <Line
                        type="monotone"
                        dataKey="count"
                        stroke="#6366F1"
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
