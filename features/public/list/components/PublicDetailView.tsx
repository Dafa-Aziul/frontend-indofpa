"use client";

import React from 'react';
import { usePublicDetail } from '../hooks';
import {
    Clock,
    Play,
    ShieldCheck,
    Info,
    Loader2,
    Target,
    BookOpen,
    Hash,
} from 'lucide-react';
import Link from 'next/link';

export const PublicDetailView = ({ id }: { id: string }) => {
    const { data, isLoading, isError } = usePublicDetail(id);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-24 md:py-32">
                <Loader2 className="animate-spin text-emerald-600 mb-4" size={40} />
                <p className="text-slate-500 font-medium animate-pulse">Sinkronisasi data kuesioner...</p>
            </div>
        );
    }

    const kuesioner = data?.kuesioner;
    const kodeAkses = kuesioner?.distribusi?.[0]?.kodeAkses;

    if (isError || !kuesioner) {
        return (
            <div className="max-w-md mx-auto py-20 text-center px-6">
                <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <Info className="text-slate-300" size={32} />
                    </div>
                    <p className="font-black text-slate-900 text-xl mb-2">Data Tidak Ditemukan</p>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8">
                        Kuesioner mungkin sudah dinonaktifkan atau tautan yang Anda gunakan salah.
                    </p>
                    <Link href="/public" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-sm transition-transform active:scale-95">
                        Kembali ke Daftar
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Header Banner - Dibuat lebih modern & tidak kaku */}
            <div className="bg-emerald-600 p-6 md:p-12 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-[9px] md:text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-white/20">
                            {kuesioner.kategori?.nama || 'Umum'}
                        </div>
                        {kodeAkses && (
                            <div className="inline-flex items-center gap-1.5 bg-emerald-900/30 backdrop-blur-md text-[9px] md:text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/10">
                                <Hash size={10} />
                                {kodeAkses}
                            </div>
                        )}
                    </div>

                    <h2 className="text-2xl md:text-4xl font-black leading-tight tracking-tight mb-2">
                        {kuesioner.judul}
                    </h2>
                    <p className="text-emerald-100/80 text-xs md:text-sm font-medium">
                        Diterbitkan oleh Tim Riset IndoFPA
                    </p>
                </div>

                {/* Dekorasi Abstract */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            </div>

            <div className="p-5 md:p-10 space-y-8 md:space-y-12">

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 gap-3 md:gap-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-4 p-4 md:p-6 bg-slate-50 rounded-2xl md:rounded-3xl border border-slate-100">
                        <div className="p-2 md:p-3 bg-white rounded-xl text-emerald-600 shadow-sm">
                            <Clock className="h-5 w-5 md:h-6 md:w-6" />
                        </div>
                        <div className="text-center md:text-left">
                            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-0.5">Waktu</p>
                            <p className="font-bold text-slate-900 text-sm md:text-lg">{kuesioner.estimasiMenit} Menit</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-4 p-4 md:p-6 bg-slate-50 rounded-2xl md:rounded-3xl border border-slate-100">
                        <div className="p-2 md:p-3 bg-white rounded-xl text-blue-600 shadow-sm">
                            <Target className="h-5 w-5 md:h-6 md:w-6" />
                        </div>
                        <div className="text-center md:text-left">
                            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-0.5">Target</p>
                            <p className="font-bold text-slate-900 text-sm md:text-lg">{kuesioner.targetResponden} Orang</p>
                        </div>
                    </div>
                </div>

                {/* Tujuan Section */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 text-slate-900">
                        <Info size={18} className="text-emerald-600" />
                        <h4 className="font-black uppercase text-xs md:text-sm tracking-widest">Tujuan Penelitian</h4>
                    </div>
                    <div className="bg-white p-6 md:p-8 rounded-4xl border-2 border-slate-50 shadow-sm">
                        <p className="text-slate-700 leading-relaxed text-base md:text-lg font-medium italic">
                            {kuesioner.tujuan}
                        </p>
                    </div>
                </section>

                {/* Manfaat Section */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 text-slate-900">
                        <BookOpen size={18} className="text-blue-600" />
                        <h4 className="font-black uppercase text-xs md:text-sm tracking-widest">Manfaat Kontribusi</h4>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        {kuesioner.manfaat ? (
                            kuesioner.manfaat.split(',').map((item: string, index: number) => (
                                <div key={index} className="flex items-start gap-3 p-4 bg-blue-50/30 rounded-2xl border border-blue-100/20 group hover:bg-blue-50 transition-colors">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                    <p className="text-slate-600 text-sm md:text-base font-medium">
                                        {item.trim()}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-slate-400 italic text-sm">Informasi manfaat tidak tersedia.</p>
                        )}
                    </div>
                </section>

                {/* Privacy Card */}
                <div className="flex flex-col md:flex-row gap-4 p-6 bg-amber-50/50 rounded-3xl border border-amber-100/50 items-center md:items-start text-center md:text-left">
                    <div className="p-3 bg-white rounded-2xl text-amber-600 shadow-sm shrink-0">
                        <ShieldCheck size={24} />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-black text-amber-900 uppercase tracking-wider">Keamanan Data & Privasi</p>
                        <p className="text-xs text-amber-800/70 leading-relaxed font-medium">
                            Partisipasi Anda bersifat anonim. Semua jawaban akan dienkripsi dan hanya digunakan untuk keperluan analisis data serta pengembangan riset secara kolektif.
                        </p>
                    </div>
                </div>

                {/* Action Button */}
                <div className="pt-4">
                    <Link
                        href={`/kuesioner/submit/${kodeAkses}`}
                        className="group w-full flex flex-col items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white p-6 rounded-[2rem] shadow-xl shadow-emerald-200 transition-all hover:-translate-y-1 active:scale-[0.98]"
                    >
                        <div className="flex items-center gap-3">
                            <span className="font-black text-xl md:text-2xl tracking-tight">MULAI KUESIONER</span>
                            <Play size={20} className="fill-white group-hover:translate-x-1 transition-transform" />
                        </div>
                        <span className="text-[10px] md:text-xs text-emerald-100 font-medium opacity-80">
                            Estimasi penyelesaian {kuesioner.estimasiMenit} menit
                        </span>
                    </Link>
                </div>

            </div>
        </div>
    );
};