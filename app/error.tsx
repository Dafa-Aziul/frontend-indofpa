"use client"; // Wajib: Error boundary harus berupa Client Component

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ServerCrash, Home, RefreshCcw, Undo2 } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Anda bisa mencatat error ke layanan monitoring seperti Sentry di sini
    console.error("System Error 500:", error);
  }, [error]);

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center px-6 overflow-hidden font-sans antialiased">
      
      {/* Latar Belakang Dekoratif - Aksen Merah Halus (Indikasi Error) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-red-50/50 to-transparent -z-10" />

      <div className="max-w-2xl w-full text-center space-y-10 relative z-10">
        
        {/* Visual Section: Ikon Server Crash */}
        <div className="relative inline-flex">
          <div className="absolute inset-0 animate-pulse bg-red-100 rounded-full blur-2xl opacity-50"></div>
          <div className="relative bg-red-50 border border-red-100 p-8 rounded-full shadow-sm">
            <ServerCrash className="h-16 w-16 text-red-600" strokeWidth={1.5} />
          </div>
        </div>

        {/* Text Section: Pesan Error 500 Formal */}
        <div className="space-y-4">
          <h1 className="text-8xl md:text-9xl font-black text-slate-900 tracking-tighter leading-none m-0">
            500<span className="text-red-600">.</span>
          </h1>
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 uppercase tracking-widest">
              Kesalahan Internal Server
            </h2>
            <p className="text-slate-500 max-w-md mx-auto text-base md:text-lg font-medium leading-relaxed">
              Mohon maaf, terjadi kendala teknis yang tidak terduga pada sistem kami. 
              Tim teknis kami telah menerima laporan ini dan sedang berupaya melakukan perbaikan.
            </p>
          </div>
        </div>

        {/* Action Buttons: Navigasi & Recovery */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          {/* Tombol Coba Lagi (Reset Page) */}
          <button
            onClick={() => reset()}
            className="group flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-xl shadow-emerald-900/20 active:scale-95 cursor-pointer w-full sm:w-auto"
          >
            <RefreshCcw className="h-4 w-4 group-active:rotate-180 transition-transform duration-500" />
            COBA LAGI
          </button>

          {/* Tombol Halaman Sebelumnya */}
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-3 bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-300 px-8 py-4 rounded-2xl font-black text-sm transition-all active:scale-95 cursor-pointer w-full sm:w-auto"
          >
            <Undo2 className="h-4 w-4" />
            KEMBALI
          </button>

          {/* Tombol Beranda */}
          <Link
            href="/"
            className="flex items-center justify-center gap-3 text-slate-400 font-bold text-sm hover:text-emerald-700 transition-all no-underline"
          >
            <Home className="h-4 w-4" />
            BERANDA
          </Link>
        </div>

        {/* Footer Informasi Sistem */}
        <div className="mt-20 flex flex-col items-center gap-3">
          <div className="h-px w-16 bg-slate-200" />
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.4em] m-0">
            IndoFPA Technical Support
          </p>
        </div>
      </div>
    </div>
  );
}