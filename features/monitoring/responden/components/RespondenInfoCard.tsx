// fileName: src/features/monitoring/responden/components/RespondenInfoCard.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
    User, Mail, Calendar, Clock, Edit, BookOpen, 
    Clock3, User2, MapPin, Fingerprint, Activity, ClipboardCheck
} from 'lucide-react';
import { RespondenDetail } from '../types';
import { cn } from "@/lib/utils";

interface RespondenInfoCardProps {
    responden: RespondenDetail;
    formatDurasi: (d: number | null) => string;
    formatDateTime: (s: string) => string;
}

// Komponen Pembantu Baris Info - Desain Bersih dengan Aksen Hijau
interface InfoRowProps {
    icon: React.ElementType;
    label: string;
    value: string | number | null;
    className?: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon: Icon, label, value, className }) => (
    <div className={cn("flex items-center p-3 rounded-xl transition-all hover:bg-green-50/50 group", className)}>
        {/* Container Icon dengan warna Hijau Muda */}
        <div className="h-9 w-9 lg:h-11 lg:w-11 rounded-lg bg-green-50 flex items-center justify-center shrink-0 border border-green-100 group-hover:border-green-200 transition-colors">
            <Icon className="h-4 w-4 lg:h-5 lg:w-5 text-green-600" />
        </div>
        <div className="ml-4 flex flex-col min-w-0">
            <span className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-slate-400">
                {label}
            </span>
            <span className="font-semibold text-sm lg:text-base text-slate-700 truncate">
                {value !== null ? value : '-'}
            </span>
        </div>
    </div>
);

const RespondenInfoCard: React.FC<RespondenInfoCardProps> = ({ responden, formatDurasi, formatDateTime }) => (
    <Card className="overflow-hidden shadow-sm border border-slate-200 bg-white">
        
        {/* HEADER: Putih Bersih dengan Accent Border Hijau di Sisi Kiri */}
        <CardHeader className="p-6 border-b border-slate-100 relative bg-white">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-600" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pl-2">
                <div className="flex items-center gap-4">
                    {/* Lingkaran Icon User yang Minimalis */}
                    <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center border border-green-100 shadow-sm">
                        <User className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                        <CardTitle className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">
                            Profil Responden
                        </CardTitle>
                        <CardDescription className="text-slate-500 font-medium flex items-center gap-2 mt-0.5">
                            <Fingerprint className="h-3.5 w-3.5 text-green-500" />
                            ID Responden: {responden.respondenId}
                        </CardDescription>
                    </div>
                </div>
                
                {/* Badge Status yang Menandakan Data Sudah Masuk */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-100 text-green-700 self-start sm:self-center">
                    <ClipboardCheck className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Data Terkirim</span>
                </div>
            </div>
        </CardHeader>

        <CardContent className="p-0">
            {/* GRID DETAIL: Membagi Demografi dan Aktivitas Sesi */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">

                {/* Bagian 1: Informasi Demografi */}
                <div className="p-6 lg:p-8 space-y-4">
                    <div className="flex items-center gap-2 px-3 mb-2">
                        <Activity className="h-3.5 w-3.5 text-green-600" />
                        <h4 className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400">
                            Data Demografi
                        </h4>
                    </div>
                    <div className="grid gap-1">
                        <InfoRow icon={User} label="Nama Lengkap" value={responden.nama} />
                        <InfoRow icon={Mail} label="Alamat Email" value={responden.email} />
                        <InfoRow icon={User2} label="Jenis Kelamin" value={responden.jenisKelamin} />
                        <InfoRow icon={Calendar} label="Kategori Usia" value={responden.usiaKategori} />
                        <InfoRow icon={Edit} label="Pekerjaan" value={responden.pekerjaan} />
                        <InfoRow icon={MapPin} label="Agama" value={responden.agama} />
                    </div>
                </div>

                {/* Bagian 2: Informasi Pengerjaan */}
                <div className="p-6 lg:p-8 bg-slate-50/20 space-y-4">
                    <div className="flex items-center gap-2 px-3 mb-2">
                        <Clock className="h-3.5 w-3.5 text-green-600" />
                        <h4 className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400">
                            Aktivitas Sesi
                        </h4>
                    </div>
                    <div className="grid gap-1">
                        <InfoRow icon={BookOpen} label="Pendidikan Terakhir" value={responden.tingkatPendidikan} />
                        <div className="py-2" /> {/* Spacer transparan */}
                        <InfoRow icon={Clock} label="Waktu Mulai" value={formatDateTime(responden.waktuMulai)} />
                        <InfoRow icon={Clock3} label="Waktu Selesai" value={formatDateTime(responden.waktuSelesai)} />
                        {/* Highlight Khusus untuk Durasi dengan warna hijau lebih terang */}
                        <InfoRow 
                            icon={Clock} 
                            label="Durasi Pengerjaan" 
                            value={formatDurasi(responden.durasiDetik)} 
                            className="bg-green-50 border border-green-100/50 shadow-sm"
                        />
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
);

export default RespondenInfoCard;