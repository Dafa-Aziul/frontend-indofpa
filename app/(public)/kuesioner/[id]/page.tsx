// src/app/public/[id]/page.tsx
import { Suspense } from "react";
import { Metadata } from "next";
import { PublicDetailView } from "@/features/public/list/components/PublicDetailView";
import { ShieldCheck, ClipboardList } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Detail Kuesioner : ${id} | IndoFPA`,
    description: "Lihat detail kuesioner publik secara transparan dan aman.",
  };
}

export default async function PublicDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <main className="relative min-h-screen bg-white overflow-x-hidden">
      {/* --- BACKGROUND DECOR --- */}
      {/* Diperkecil tingginya di mobile agar tidak terlalu dominan */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[350px] md:h-[500px] bg-linear-to-b from-emerald-50/60 to-transparent -z-10" />

      {/* PERUBAHAN UTAMA: 
          Menambah pt-28 (padding top) di mobile agar tidak tertutup header 
      */}
      <div className="container mx-auto pt-28 pb-12 px-6 md:pt-30 md:pb-24">

        {/* --- 2. BADGE INFORMASI --- */}
        <div className="max-w-4xl mx-auto flex justify-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm md:bg-emerald-100/80 text-emerald-700 px-4 py-1.5 md:px-5 md:py-2 rounded-full border border-emerald-200/50 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] whitespace-nowrap">
              Informasi Publik Terverifikasi
            </span>
          </div>
        </div>

        {/* --- 3. HERO SECTION --- */}
        <div className="max-w-4xl mx-auto mb-12 md:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 md:gap-10">

            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-3xl md:text-6xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight leading-[1.2] md:leading-[1.1]">
                Detail <span className="text-emerald-600">Kuesioner.</span>
              </h1>

              <p className="text-slate-600 text-base md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Pelajari tujuan penelitian dan informasi kuesioner sebelum memberikan kontribusi.
                Partisipasi Anda sangat berarti untuk pengembangan kualitas layanan kami.
              </p>
            </div>

            {/* Quick Info Card (Hanya muncul di Desktop) */}
            <div className="hidden lg:flex flex-col gap-4 p-7 bg-white/40 backdrop-blur-md border border-emerald-100 shadow-2xl shadow-emerald-900/5 rounded-4xl min-w-[280px]">
              <p className="text-[10px] font-black text-emerald-800/40 uppercase tracking-widest mb-1 border-b border-emerald-100 pb-2">
                Ringkasan Akses
              </p>
              <div className="flex items-center gap-4 text-sm font-bold text-slate-700">
                <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <span>Anonimitas Terjamin</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- 4. AREA KONTEN UTAMA --- */}
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute -top-6 left-0 w-full h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />

          <div className="bg-white rounded-[2rem] md:rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/60 overflow-hidden min-h-[400px]">
            <Suspense fallback={<LoadingState />}>
              <PublicDetailView id={id} />
            </Suspense>
          </div>

          {/* --- 5. FOOTER STATS --- */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-12 md:mt-16 text-[9px] md:text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] text-center">
            <div className="flex items-center gap-2.5 group">
              <ClipboardList className="h-4 w-4 text-emerald-500/40" />
              <span>Audit Data Berkala</span>
            </div>
            <div className="hidden md:block w-1.5 h-1.5 bg-slate-200 rounded-full" />
            <div className="flex items-center gap-2.5 group">
              <ShieldCheck className="h-4 w-4 text-emerald-500/40" />
              <span>Protokol Keamanan IndoFPA</span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 md:py-48 px-10 text-center space-y-6">
      <div className="relative flex h-12 w-12 md:h-16 md:w-16">
        <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20"></div>
        <div className="relative inline-flex rounded-full h-12 w-12 md:h-16 md:w-16 border-4 border-slate-100 border-t-emerald-600 animate-spin"></div>
      </div>
      <div className="space-y-2">
        <p className="text-slate-900 font-black text-lg md:text-xl tracking-tight uppercase">Sinkronisasi Data</p>
        <p className="text-slate-400 text-xs md:text-sm font-medium animate-pulse">
          Mengambil rincian kuesioner...
        </p>
      </div>
    </div>
  );
}