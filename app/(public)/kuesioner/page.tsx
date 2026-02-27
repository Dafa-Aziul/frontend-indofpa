// src/app/public/page.tsx
import { PublicListView } from "@/features/public/list/components/PublicListView";
import { ClipboardList, Sparkles } from "lucide-react";

export default function PublicListPage() {
  return (
    <main className="relative min-h-screen bg-white overflow-x-hidden">
      {/* Background Decor - Disesuaikan agar tetap terlihat di belakang konten yang turun */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[350px] md:h-[450px] bg-linear-to-b from-emerald-50/70 to-transparent -z-10" />

      <div className="container mx-auto pt-28 pb-12 px-6 md:pt-30 md:pb-24">

        {/* HEADER SECTION */}
        <div className="max-w-3xl mx-auto mb-12 md:mb-20 text-center">
          <div className="inline-flex items-center gap-2  backdrop-blur-sm bg-emerald-100/80 text-emerald-700 px-4 py-1.5 rounded-full mb-6 border border-emerald-100 shadow-sm animate-in fade-in slide-in-from-top-3 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.15em]">Kuesioner Terbuka</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight leading-[1.2] md:leading-tight text-balance">
            Berikan Suara Anda untuk <br className="hidden md:block" />
            <span className="text-emerald-600">Kebijakan yang Lebih Baik.</span>
          </h1>

          <p className="text-slate-600 text-base md:text-xl leading-relaxed max-w-2xl mx-auto px-2">
            Kontribusi Anda sangat berharga dalam membentuk kebijakan luar negeri Indonesia yang lebih inklusif dan transparan.
          </p>

          {/* Statistik/Info - Disesuaikan agar lebih rapi di layar kecil */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 mt-8 md:mt-10 text-[11px] md:text-sm font-bold text-slate-400 uppercase tracking-wider">
            <div className="flex items-center gap-2 group">
              <div className="p-1.5 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                <ClipboardList className="h-3.5 w-3.5 md:h-4 md:w-4 text-emerald-600" />
              </div>
              <span>Update Real-time</span>
            </div>
            
            <div className="hidden md:block w-1.5 h-1.5 bg-slate-200 rounded-full" />
            
            <div className="flex items-center gap-2 group">
              <div className="p-1.5 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4 text-emerald-600" />
              </div>
              <span>Anonim & Aman</span>
            </div>
          </div>
        </div>

        {/* LIST VIEW AREA */}
        <div className="relative max-w-5xl mx-auto">
          {/* Garis Dekoratif Atas */}
          <div className="absolute -top-6 left-0 w-full h-px bg-linear-to-r from-transparent via-slate-200 to-transparent md:-top-10" />

          <div className="bg-white/40 backdrop-blur-sm rounded-3xl md:rounded-[2.5rem] transition-all">
            <PublicListView />
          </div>
        </div>

      </div>
    </main>
  );
}