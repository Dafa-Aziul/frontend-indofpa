"use client";

import {
    Tag,
    Users,
    Clock,
    Calendar,
    Link as LinkIcon,
    CheckCircle,
    Goal,
    SquareChevronRight,
} from "lucide-react";

import { Kuesioner } from "../types";
import { formatDateID } from "@/lib/date";

type Props = {
    kuesioner: Kuesioner;
};

function SectionTitle({
    icon,
    title,
}: {
    icon: React.ReactNode | null;
    title: string;
}) {
    return (
        <div className="flex items-center gap-3">
            <span className="w-1 h-5 bg-green-600 rounded-full" />
            <div className="flex items-center gap-2 text-green-700 font-semibold">
                {icon}
                <span>{title}</span>
            </div>
        </div>
    );
}

function InfoItem({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
}) {
    return (
        <div className="flex items-start gap-3 px-6">
            <div className="text-green-600 mt-0.5">{icon}</div>
            <div className="text-sm">
                <p className="font-medium text-green-700">{label}</p>
                <div className="text-gray-700">{value}</div>
            </div>
        </div>
    );
}

export function KuesionerDetailContent({ kuesioner }: Props) {
    const distribusi = kuesioner.distribusi?.[0];

    const manfaatList =
        kuesioner.manfaat
            ?.split(",")
            .map((item) => item.trim())
            .filter(Boolean) ?? [];

    return (
        <section className="space-y-10">
            {/* ================= INFORMASI ================= */}
            <div className="space-y-4">
                <SectionTitle
                    icon=""
                    title="Informasi Kuesioner"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                    <InfoItem
                        icon={<Tag className="h-5 w-5" />}
                        label="Kategori"
                        value={kuesioner.kategori.nama}
                    />

                    <InfoItem
                        icon={<Users className="h-5 w-5" />}
                        label="Responden"
                        value={`${kuesioner._count.responden} orang`}
                    />

                    <InfoItem
                        icon={<Clock className="h-5 w-5" />}
                        label="Estimasi Waktu"
                        value={`${kuesioner.estimasiMenit} menit`}
                    />

                    {distribusi && (
                        <InfoItem
                            icon={<Calendar className="h-5 w-5" />}
                            label="Periode"
                            value={`${formatDateID(
                                distribusi.tanggalMulai
                            )} – ${formatDateID(distribusi.tanggalSelesai)}`}
                        />
                    )}

                    {distribusi && (
                        <InfoItem
                            icon={<LinkIcon className="h-5 w-5" />}
                            label="Distribusi"
                            value={
                                <a
                                    href={distribusi.urlLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-700 hover:underline break-all"
                                >
                                    {distribusi.urlLink}
                                </a>
                            }
                        />
                    )}
                </div>
            </div>

            {/* ================= DIVIDER ================= */}
            <div className="border-t" />

            {/* ================= TUJUAN ================= */}
            <div className="space-y-3">
                <SectionTitle
                    icon={<Goal className="h-5 w-5" />}
                    title="Tujuan"
                />

                <p className="text-sm text-gray-700 leading-relaxed px-6">
                    {kuesioner.tujuan}
                </p>
            </div>

            {/* ================= DIVIDER ================= */}
            {manfaatList.length > 0 && <div className="border-t" />}

            {/* ================= MANFAAT ================= */}
            {manfaatList.length > 0 && (
                <div className="space-y-3">
                    <SectionTitle
                        icon={<CheckCircle className="h-5 w-5" />}
                        title="Manfaat Partisipasi Anda"
                    />
                    <ul className="space-y-2 px-6">
                        {manfaatList.map((manfaat, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-2 text-sm text-gray-700"
                            >
                                <SquareChevronRight className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                                <span>{manfaat}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {manfaatList.length > 0 && <div className="border-t" />}
        </section>
    );
}
