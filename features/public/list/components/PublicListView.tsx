"use client";

import React from 'react';
import { usePublicKuesioner } from '../hooks';
import { Calendar, Tag, ArrowRight, Loader2, Info, Layout } from 'lucide-react';
import Link from 'next/link';

export const PublicListView = () => {
    const { data, isLoading, isError } = usePublicKuesioner();

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric' 
        });
    };

    /**
     * Fungsi untuk memotong teks:
     * Jika panjang > 100, potong dan tambah "...."
     */
    const truncateText = (text: string, maxLength: number) => {
        if (!text) return "";
        return text.length > maxLength 
            ? text.substring(0, maxLength) + "...." 
            : text;
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-emerald-600 mb-2" size={32} />
                <p className="text-gray-500 font-medium">Memuat kuesioner aktif...</p>
            </div>
        );
    }

    if (isError || data.length === 0) {
        return (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 mx-4">
                <Layout className="mx-auto text-gray-300 mb-4" size={48} />
                <p className="text-gray-500 italic font-medium">Tidak ada kuesioner publik yang tersedia saat ini.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {data.map((item) => (
                <div
                    key={item.distribusiId}
                    className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-300 flex flex-col h-full overflow-hidden"
                >
                    <div className="p-6 grow">
                        {/* Header: Kategori & Kode Akses */}
                        <div className="flex justify-between items-start mb-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 uppercase tracking-wider border border-emerald-100">
                                <Tag size={12} />
                                {item.kategori}
                            </span>
                        </div>

                        {/* Judul Kuesioner */}
                        <h3 className="text-xl font-black text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors leading-tight">
                            {item.judul}
                        </h3>

                        {/* Tujuan dengan Truncate 100 Karakter */}
                        <p className="text-sm text-gray-500 mb-6 italic min-h-[40px]">
                            {truncateText(item.tujuan, 100)}
                        </p>

                        {/* Info Periode */}
                        <div className="space-y-3 mt-auto pt-4 border-t border-gray-50">
                            <div className="flex items-center gap-3 text-xs text-gray-600">
                                <div className="p-1.5 bg-emerald-50 rounded-md text-emerald-600">
                                    <Calendar size={14} />
                                </div>
                                <div>
                                    <p className="text-[9px] text-gray-400 uppercase font-bold text-[8px]">Periode Mulai</p>
                                    <p className="font-semibold">{formatDate(item.tanggalMulai)}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-600">
                                <div className="p-1.5 bg-orange-50 rounded-md text-orange-600">
                                    <Calendar size={14} />
                                </div>
                                <div>
                                    <p className="text-[9px] text-gray-400 uppercase font-bold text-[8px]">Periode Selesai</p>
                                    <p className="font-semibold">{formatDate(item.tanggalSelesai)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Button Cek Detail */}
                    <div className="p-4 bg-emerald-50/30 border-t border-emerald-50">
                        <Link
                            href={`/kuesioner/${item.kuesionerId}`}
                            className="w-full flex items-center justify-center gap-2 bg-white border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white py-3 rounded-xl font-bold text-sm transition-all duration-200 shadow-sm active:scale-[0.98]"
                        >
                            <Info size={16} />
                            Cek Detail
                            <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};