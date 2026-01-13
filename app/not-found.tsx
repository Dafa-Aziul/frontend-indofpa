"use client"; // Diperlukan untuk menggunakan useRouter

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, Home, Undo2 } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    /**
     * Overlay kontainer menggunakan 'fixed inset-0' untuk memastikan 
     * halaman tampil secara penuh dan konsisten di seluruh rute.
     */
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center px-6 overflow-hidden font-sans antialiased">
      
      {/* Latar Belakang Dekoratif - Gradasi Emerald IndoFPA */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-emerald-50/60 to-transparent -z-10" />

      <div className="max-w-2xl w-full text-center space-y-10 relative z-10">
        
        {/* Bagian Visual: Ikon Peringatan */}
        <div className="relative inline-flex">
          <div className="absolute inset-0 animate-ping rounded-full bg-emerald-100 opacity-50"></div>
          <div className="relative bg-emerald-50 border border-emerald-100 p-8 rounded-full shadow-sm">
            <AlertCircle className="h-16 w-16 text-emerald-600" strokeWidth={1.5} />
          </div>
        </div>

        {/* Bagian Teks: Pesan Kesalahan Formal */}
        <div className="space-y-4">
          <h1 className="text-8xl md:text-9xl font-black text-slate-900 tracking-tighter leading-none m-0">
            404<span className="text-emerald-600">.</span>
          </h1>
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 uppercase tracking-widest">
              Halaman Tidak Ditemukan
            </h2>
            <p className="text-slate-500 max-w-md mx-auto text-base md:text-lg font-medium leading-relaxed">
              Mohon maaf, halaman yang Anda tuju tidak tersedia atau telah dipindahkan. 
              Silakan kembali ke halaman sebelumnya atau menuju ke beranda utama.
            </p>
          </div>
        </div>

        {/* Tombol Navigasi: Aksi Utama */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
          {/* Tombol Kembali ke Halaman Sebelumnya */}
          <button
            onClick={() => router.back()}
            className="group flex items-center justify-center gap-3 bg-white border-2 border-slate-200 hover:border-emerald-600 text-slate-700 hover:text-emerald-700 px-10 py-4 rounded-2xl font-black text-sm transition-all active:scale-95 cursor-pointer"
          >
            <Undo2 className="h-4 w-4" />
            HALAMAN SEBELUMNYA
          </button>

          {/* Tombol Kembali ke Beranda */}
          <Link
            href="/"
            className="group flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-2xl font-black text-sm transition-all shadow-2xl shadow-emerald-900/20 active:scale-95 no-underline"
          >
            <Home className="h-4 w-4" />
            KE BERANDA UTAMA
          </Link>
        </div>

        {/* Footer Informasi Sistem */}
        <div className="mt-20 flex flex-col items-center gap-3">
          <div className="h-px w-16 bg-slate-200" />
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.4em] m-0">
            IndoFPA Protocol System
          </p>
        </div>
      </div>
    </div>
  );
}