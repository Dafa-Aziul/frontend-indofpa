// fileName: src/features/monitoring/detail/components/header-cards.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Clock, Calendar, Target, CheckCheck, Percent } from "lucide-react";
import { KuesionerMonitoringDetail } from "../types";

interface HeaderCardsProps {
    kuesioner: KuesionerMonitoringDetail;
    startDate?: string; // Asumsi tanggal mulai/akhir mungkin berasal dari distribusi
    endDate?: string;
}

// Utility untuk format tanggal
const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    try {
        return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
        return '-';
    }
};

const MetricCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <Card>
        <CardContent className="p-4 flex items-center space-x-3">
            <div className="text-green-600">{icon}</div>
            <div>
                <p className="text-sm text-muted-foreground">{title}</p>
                <h4 className="text-xl font-bold">{value}</h4>
            </div>
        </CardContent>
    </Card>
);

export default function HeaderCards({ kuesioner, startDate, endDate }: HeaderCardsProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <MetricCard
                title="Target Responden"
                value={kuesioner.targetResponden.toLocaleString()}
                icon={<Target className="h-5 w-5" />}
            />
            <MetricCard
                title="Respon Masuk"
                value={kuesioner.totalResponden.toLocaleString()}
                icon={<CheckCheck className="h-5 w-5" />}
            />
            <MetricCard
                title="Pencapaian"
                value={`${kuesioner.progress.toFixed(1)} %`}
                icon={<Percent className="h-5 w-5" />}
            />
            <MetricCard
                title="Tanggal Mulai"
                value={formatDate(startDate)}
                icon={<Calendar className="h-5 w-5" />}
            />
            <MetricCard
                title="Tanggal Berakhir"
                value={formatDate(endDate)}
                icon={<Calendar className="h-5 w-5" />}
            />
        </div>
    );
}