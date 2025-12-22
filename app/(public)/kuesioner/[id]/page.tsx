// src/app/public/[id]/page.tsx
import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { PublicDetailView } from "@/features/public/list/components/PublicDetailView";
import { ChevronLeft, Timer, ShieldCheck, ClipboardList } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Detail Kuesioner : ${id} | IndoFPA`,
    description: "Lihat detail kuesioner publik",
  };
}

export default async function PublicDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <main className="relative min-h-screen bg-white">
      {/* Background Decor - Konsisten dengan List Page */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[450px] bg-linear-to-b from-emerald-50/50 to-transparent -z-10" />

      <div className="container mx-auto py-12 px-4 md:py-20">

        {/* BACK NAVIGATION */}
        <div className="max-w-4xl mx-auto mb-10">
          <Link
            href="/kuesioner"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors group"
          >
            <div className="p-2 rounded-full bg-emerald-100 group-hover:bg-emerald-200 transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </div>
            Kembali ke Daftar
          </Link>
        </div>

        {/* HEADER SECTION (HERO) */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 text-center md:text-left">
            <div className="flex-1">
              {/* Badge Aktif */}
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-widest">Informasi Publik</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                Detail <span className="text-emerald-600">Kuesioner.</span>
              </h1>

              <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
                Pelajari tujuan dan informasi kuesioner sebelum memberikan kontribusi Anda.
                Data Anda dikelola secara profesional dan anonim.
              </p>
            </div>

            {/* Quick Info Card */}
            <div className="hidden lg:flex flex-col gap-3 p-6 bg-white border border-slate-100 shadow-xl shadow-emerald-900/5 rounded-3xl min-w-[260px]">
              <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                <Timer className="h-4 w-4 text-emerald-500" />
                <span>Estimasi 5-10 Menit</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>Terlindungi & Aman</span>
              </div>
            </div>
          </div>
        </div>

        {/* DETAIL VIEW AREA */}
        <div className="max-w-4xl mx-auto relative">
          {/* Dekorasi Garis Halus */}
          <div className="absolute -top-6 left-0 w-full h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />

          <div className="bg-white/70 backdrop-blur-md rounded-4xl border border-white shadow-2xl shadow-slate-200/50 min-h-[400px]">
            <Suspense fallback={<LoadingState />}>
              <PublicDetailView id={id} />
            </Suspense>
          </div>

          {/* FOOTER STATS */}
          <div className="flex items-center justify-center gap-8 mt-12 text-sm font-medium text-slate-400">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-emerald-500" />
              <span>Ditinjau Secara Berkala</span>
            </div>
            <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Standar Keamanan IndoFPA</span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}

/* ================= LOADING COMPONENT ================= */

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-40 px-10 text-center space-y-4">
      {/* Spinner Emerald */}
      <div className="relative flex h-12 w-12">
        <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20"></div>
        <div className="relative inline-flex rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600 animate-spin"></div>
      </div>

      <div className="space-y-1">
        <p className="text-slate-900 font-bold text-lg tracking-tight">Memuat Data</p>
        <p className="text-slate-400 text-sm animate-pulse">Menyiapkan informasi detail...</p>
      </div>
    </div>
  );
}