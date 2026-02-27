
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle, BarChart3, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IndoFPA | Platform Kuesioner Online Modern",
  description: "Platform Kuisioner Online yang Mudah, Cepat, dan Akurat untuk Riset Anda.",
};

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background Decor - Efek Cahaya Hijau Lembut */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-3xl opacity-50 -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-emerald-50 rounded-full blur-3xl opacity-50 -z-10" />

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 md:py-24 items-center">

          {/* BAGIAN TEKS */}
          <div className="md:col-span-7 flex flex-col gap-6 order-2 md:order-1">

            {/* Badge Baru */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 px-3 py-1 rounded-full w-fit animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider">Update v2.0 Terintegrasi</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                Analisis Data Jadi <br />
                <span className="text-emerald-600">Lebih Cerdas & Cepat.</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed">
                IndoFPA membantu peneliti dan institusi mengumpulkan respon kuesioner secara online dengan sistem keamanan data tingkat tinggi dan laporan analisis otomatis.
              </p>
            </div>

            {/* Tombol Aksi (CTA) */}
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8 py-7 text-lg font-bold shadow-xl shadow-emerald-100 transition-all hover:scale-105 active:scale-95">
                Mulai Gratis Sekarang
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button variant="ghost" className="rounded-full px-6 py-7 text-lg font-semibold text-slate-600 hover:text-emerald-600 gap-2">
                <PlayCircle className="h-6 w-6" />
                Lihat Demo
              </Button>
            </div>
          </div>

          {/* BAGIAN GAMBAR DENGAN FLOATING ELEMENTS */}
          <div className="md:col-span-5 order-1 md:order-2 flex justify-center relative">
            <div className="relative w-full max-w-[450px] aspect-square md:aspect-4/5">
              {/* Floating Card 1: Statistik */}
              <div className="absolute -left-4 top-10 bg-white p-4 rounded-2xl shadow-2xl z-20 animate-bounce-slow hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Responden</p>
                    <p className="text-sm font-bold text-slate-800">1,284 Orang</p>
                  </div>
                </div>
              </div>

              {/* Floating Card 2: Security */}
              <div className="absolute -right-4 bottom-20 bg-white p-4 rounded-2xl shadow-2xl z-20 animate-bounce-delayed hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <ShieldCheck className="h-5 w-5 text-blue-600" />
                  </div>
                  <p className="text-sm font-bold text-slate-800">Sertifikat SSL Aktif</p>
                </div>
              </div>

              <Image
                src="/images/image_home.png"
                alt="IndoFPA Dashboard"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>

        {/* LOGO PARTNER / TRUST SECTION (Opsional) */}
        {/* <div className="py-10 border-t border-slate-50">
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
            Dipercaya oleh peneliti dari berbagai institusi
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all">
            
            <div className="text-xl font-bold text-slate-400 italic">UNIVERSITAS</div>
            <div className="text-xl font-bold text-slate-400 italic">INSTITUSI RISET</div>
            <div className="text-xl font-bold text-slate-400 italic">KOMUNITAS</div>
            <div className="text-xl font-bold text-slate-400 italic">NGO GLOBAL</div>
          </div>
        </div> */}
      </div>
    </div>
  );
}