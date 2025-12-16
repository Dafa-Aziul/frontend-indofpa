"use client";

import { SummaryData } from "@/features/dashboard/types/dashboard";
import {
  ClipboardList,
  CheckCircle,
  Users,
  FileWarning,
  FileText,
} from "lucide-react";

import React from "react";

interface SummaryItemProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: number;
  className?: string;
}

function SummaryItem({ icon: Icon, label, value, className }: SummaryItemProps) {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      {/* Icon responsive */}
      <Icon className={`${className} w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10`} />

      <div>
        {/* Label size upgrade */}
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
          {label}
        </p>

        {/* Value number upgrade */}
        <p className="text-lg sm:text-xl md:text-3xl font-semibold">
          {value}
        </p>
      </div>
    </div>
  );
}

interface SummaryCardsProps {
  summary: SummaryData;
}

export default function SummaryCards({ summary }: SummaryCardsProps) {
  const { totalKuesioner, draft, publish, arsip, totalResponden } = summary;

  return (
    <div className="space-y-6 space-x-6">
      {/* ROW 1 — 2 kolom mobile, 3 kolom md+ */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <SummaryItem
          icon={ClipboardList}
          label="Kuisioner"
          value={totalKuesioner}
          className="text-blue-600"
        />

        <SummaryItem
          icon={CheckCircle}
          label="Aktif"
          value={publish}
          className="text-green-600"
        />

        <SummaryItem
          icon={Users}
          label="Responden"
          value={totalResponden}
          className="text-purple-600"
        />
      </div>

      {/* ROW 2 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <SummaryItem
          icon={FileWarning}
          label="Draft"
          value={draft}
          className="text-orange-500"
        />

        <SummaryItem
          icon={FileText}
          label="Selesai"
          value={arsip}
          className="text-gray-600"
        />

        {/* Placeholder untuk simetri grid */}
        <div className="hidden md:block" />
      </div>
    </div>
  );
}
