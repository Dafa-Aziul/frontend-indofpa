"use client";

import React from 'react';
import { usePublicDetail } from '../hooks';
import {
    Clock,
    ChevronLeft,
    Play,
    ShieldCheck,
    Info,
    Loader2,
    Target,
    BookOpen,
    Hash
} from 'lucide-react';
import Link from 'next/link';

export const PublicDetailView = ({ id }: { id: string }) => {
    const { data, isLoading, isError } = usePublicDetail(id);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-emerald-600 mb-4" size={40} />
                <p className="text-gray-500 font-medium animate-pulse">Memuat rincian kuesioner...</p>
            </div>
        );
    }

    // Penyesuaian akses data sesuai struktur JSON terbaru
    const kuesioner = data?.kuesioner;

    const kodeAkses = kuesioner?.distribusi?.[0]?.kodeAkses;

    if (isError || !kuesioner) {
        return (
            <div className="max-w-md mx-auto mt-20 text-center px-4">
                <div className="bg-red-50 text-red-600 p-8 rounded-4xl border border-red-100 shadow-sm">
                    <Info className="mx-auto mb-4 opacity-50" size={48} />
                    <p className="font-bold text-lg mb-2">Oops!</p>
                    <p className="text-sm opacity-80">Data kuesioner tidak ditemukan atau sudah tidak aktif.</p>
                </div>
                <Link href="/kuesioner" className="mt-8 inline-flex items-center gap-2 text-emerald-600 font-bold hover:underline transition-all">
                    <ChevronLeft size={20} /> Kembali ke Daftar
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-4 py-8">
            {/* Navigasi Kembali */}
            <Link href="/kuesioner" className="inline-flex items-center text-sm text-emerald-600 hover:text-emerald-700 mb-8 font-bold transition-all group">
                <div className="p-1.5 bg-emerald-50 rounded-lg mr-2 group-hover:bg-emerald-100">
                    <ChevronLeft size={16} />
                </div>
                Kembali ke Daftar
            </Link>

            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-900/5 border border-emerald-50 overflow-hidden">
                {/* Header Banner - Hijau Emerald */}
                <div className="bg-emerald-600 p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex flex-wrap gap-2 mb-6">
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest border border-white/30">
                                {kuesioner.kategori?.nama}
                            </div>
                            {kodeAkses && (
                                <div className="inline-flex items-center gap-1.5 bg-emerald-700/40 backdrop-blur-md text-[10px] font-bold px-4 py-2 rounded-full border border-emerald-400/30">
                                    <Hash size={12} />
                                    {kodeAkses}
                                </div>
                            )}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black leading-tight uppercase">
                            {kuesioner.judul}
                        </h1>
                    </div>
                    {/* Variasi dekorasi background */}
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50" />
                </div>

                <div className="p-8 md:p-12 bg-linear-to-b from-white to-emerald-50/20">
                    {/* Statistik Info: Estimasi & Target */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <div className="group flex items-center gap-5 p-6 bg-white rounded-3xl border border-emerald-100 shadow-sm hover:border-emerald-300 transition-all">
                            <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-600 group-hover:scale-110 transition-transform shadow-sm">
                                <Clock size={28} />
                            </div>
                            <div>
                                <p className="text-[10px] text-emerald-600 uppercase font-black tracking-widest opacity-60 mb-1">Estimasi Waktu</p>
                                <p className="font-extrabold text-emerald-900 text-lg leading-none">{kuesioner.estimasiMenit} Menit</p>
                            </div>
                        </div>
                        <div className="group flex items-center gap-5 p-6 bg-white rounded-3xl border border-blue-100 shadow-sm hover:border-blue-300 transition-all">
                            <div className="p-4 bg-blue-50 rounded-2xl text-blue-600 group-hover:scale-110 transition-transform shadow-sm">
                                <Target size={28} />
                            </div>
                            <div>
                                <p className="text-[10px] text-blue-600 uppercase font-black tracking-widest opacity-60 mb-1">Target Responden</p>
                                <p className="font-extrabold text-blue-900 text-lg leading-none">{kuesioner.targetResponden} Orang</p>
                            </div>
                        </div>
                    </div>

                    {/* Konten Utama */}
                    <div className="space-y-12 mb-12">
                        {/* Tujuan Penelitian */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-emerald-600 rounded-xl text-white shadow-lg shadow-emerald-200">
                                    <Info size={20} />
                                </div>
                                <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight">Tujuan Penelitian</h4>
                            </div>
                            <div className="bg-white p-8 rounded-4xl border-2 border-emerald-50 shadow-inner relative">
                                <span className="absolute -top-4 left-8 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">Description</span>
                                <p className="text-gray-700 leading-relaxed font-semibold italic text-xl">
                                    {kuesioner.tujuan}
                                </p>
                            </div>
                        </section>

                        {/* Manfaat Penelitian */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-200">
                                    <BookOpen size={20} />
                                </div>
                                <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight">Manfaat</h4>
                            </div>
                            <div className="px-4">
                                <div className="grid grid-cols-1 gap-3">
                                    {kuesioner.manfaat ? (
                                        kuesioner.manfaat.split(',').map((item: string, index: number) => (

                                            <div
                                                key={index}
                                                className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 hover:bg-blue-50 transition-colors"
                                            >
                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                                                <p className="text-gray-700 leading-relaxed font-medium">
                                                    {item.trim()}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-400 italic">Tidak ada manfaat yang spesifik.</p>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* Jaminan Privasi */}
                        <div className="flex gap-6 p-8 bg-amber-50/50 rounded-4xl border border-amber-100 items-start shadow-sm">
                            <div className="p-3 bg-white rounded-2xl text-amber-600 shadow-sm">
                                <ShieldCheck size={32} />
                            </div>
                            <div className="space-y-2">
                                <p className="text-md font-black text-amber-900 uppercase tracking-wider">Jaminan Privasi</p>
                                <p className="text-sm text-amber-800/80 leading-relaxed font-medium">
                                    Kami sangat menghargai privasi Anda. Semua jawaban Anda akan dianonimkan dan hanya digunakan untuk kepentingan analisis kualitas secara kolektif sesuai etika penelitian.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tombol Aksi - Mengarah ke route pengisian kuesioner berdasarkan kode akses */}
                    <Link
                        href={`/kuesioner/submit/${kodeAkses}`}
                        className="group w-full flex items-center justify-center gap-4 bg-emerald-600 hover:bg-emerald-700 text-white py-6 rounded-3xl font-black text-2xl shadow-2xl shadow-emerald-200 transition-all hover:-translate-y-1 active:scale-[0.97]"
                    >
                        MULAI ISI SEKARANG
                        <div className="p-2 bg-white/20 rounded-full group-hover:translate-x-2 transition-transform">
                            <Play size={24} className="fill-white" />
                        </div>
                    </Link>
                    <p className="text-center mt-6 text-xs text-gray-400 font-medium tracking-wide">
                        Selesaikan kuesioner ini dalam waktu kurang lebih {kuesioner.estimasiMenit} menit.
                    </p>
                </div>
            </div>
        </div>
    );
};