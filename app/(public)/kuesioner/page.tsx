// src/app/public/page.tsx
import { PublicListView } from "@/features/public/list/components/PublicListView";
import { ClipboardList, Sparkles } from "lucide-react";

export default function PublicListPage() {
  return (
    <main className="relative min-h-screen bg-white">
      {/* Background Decor - Halus & Profesional */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-linear-to-b from-emerald-50/50 to-transparent -z-10" />

      <div className="container mx-auto py-12 px-4 md:py-20">

        {/* HEADER SECTION */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          {/* Badge Aktif */}
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full mb-6 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest">Kuesioner Live</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
            Berikan Suara Anda untuk <br />
            <span className="text-emerald-600">Kebijakan yang Lebih Baik.</span>
          </h1>

          <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
            Daftar kuesioner publik di bawah ini terbuka untuk seluruh masyarakat Indonesia.
            Kontribusi Anda sangat berharga dalam membentuk kebijakan luar negeri yang inklusif.
          </p>

          {/* Statistik Singkat / Info (Opsional) */}
          <div className="flex items-center justify-center gap-6 mt-8 text-sm font-medium text-slate-400">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-emerald-500" />
              <span>Update Terkini</span>
            </div>
            <div className="w-1 h-1 bg-slate-200 rounded-full" />
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-500" />
              <span>Proses Cepat & Aman</span>
            </div>
          </div>
        </div>

        {/* LIST VIEW AREA */}
        <div className="relative">
          {/* Dekorasi Garis Halus */}
          <div className="absolute -top-6 left-0 w-full h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />

          <div className="bg-white/50 backdrop-blur-sm rounded-4xl">
            <PublicListView />
          </div>
        </div>
      </div>
    </main>
  );
}