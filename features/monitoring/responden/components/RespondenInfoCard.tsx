// fileName: src/features/monitoring/responden/components/RespondenInfoCard.tsx
import React from 'react';
// Import CardHeader dan CardContent
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, Mail, Calendar, Clock, Hash, Edit, BookOpen, Clock3, User2, MapPin } from 'lucide-react';
import { RespondenDetail } from '../types';

interface RespondenInfoCardProps {
    responden: RespondenDetail;
    formatDurasi: (d: number | null) => string;
    formatDateTime: (s: string) => string;
}

// Komponen Pembantu Baris Info
interface InfoRowProps {
    icon: React.ElementType;
    label: string;
    value: string | number | null;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon: Icon, label, value }) => (
    <div className="flex items-start text-base gap-3">
        {/* Icon: h-5 w-5 (Mobile/Base) | lg:h-7 lg:w-7 (Desktop) */}
        <Icon className="h-5 w-5 lg:h-7 lg:w-7 shrink-0 text-green-600 mt-1" />
        <div className="flex flex-col min-w-0">
            <span className="text-sm text-muted-foreground font-semibold">{label}</span>
            <span className="font-medium text-base flle-break-words">
                {value !== null ? value : '-'}
            </span>
        </div>
    </div>
);

const RespondenInfoCard: React.FC<RespondenInfoCardProps> = ({ responden, formatDurasi, formatDateTime }) => (
    <Card className="overflow-hidden shadow-xl">

        {/* HEADER BERWARNA HIJAU */}
        <CardHeader className="border-b p-6 pb-4">
            <div className="flex items-center gap-4">
                <User className="h-8 w-8" />
                <div className="space-y-1">
                    <CardTitle className="text-2xl font-bold ">Data Diri Responden</CardTitle>
                    <CardDescription className="text-sm font-light">{responden.email}</CardDescription>
                </div>
            </div>
        </CardHeader>

        {/* CARD CONTENT - PADDING RESPONSIVE */}
        <CardContent className="py-6 px-4 md:px-8 lg:px-12">
            {/* GRID DETAIL - Layout 1 Kolom di Mobile, 2 Kolom di Tablet+ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6">

                {/* Kolom 1: Demografi & Budaya */}
                {/* Di Mobile, ini adalah kolom atas. Di Tablet+, ini di sebelah kiri. */}
                <div className="space-y-6 pr-3 md:pr-6 md:pb-0 pb-6">
                    <InfoRow icon={User} label="Nama Lengkap" value={responden.nama} />
                    <InfoRow icon={Mail} label="Email" value={responden.email} />
                    <InfoRow icon={User2} label="Jenis Kelamin" value={responden.jenisKelamin} />
                    <InfoRow icon={Calendar} label="Usia Kategori" value={responden.usiaKategori} />
                    <InfoRow icon={Edit} label="Pekerjaan" value={responden.pekerjaan} />
                    <InfoRow icon={MapPin} label="Agama" value={responden.agama} />
                </div>

                {/* Kolom 2: Pendidikan & Waktu */}
                {/* Di Mobile, ini adalah kolom bawah. Di Tablet+, ini di sebelah kanan. */}
                <div className="space-y-6 md:pl-6">
                    <InfoRow icon={BookOpen} label="Tingkat Pendidikan" value={responden.tingkatPendidikan} />
                    <InfoRow icon={Clock} label="Waktu Mulai" value={formatDateTime(responden.waktuMulai)} />
                    <InfoRow icon={Clock3} label="Waktu Selesai" value={formatDateTime(responden.waktuSelesai)} />
                    <InfoRow icon={Clock} label="Durasi Pengerjaan" value={formatDurasi(responden.durasiDetik)} />
                </div>
            </div>
        </CardContent>
    </Card>
);

export default RespondenInfoCard;