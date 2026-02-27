// src/app/contact/page.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, MessageSquare, Send, Clock, ChevronRight } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="w-full bg-white min-h-screen overflow-x-hidden">

      {/* SECTION 1: HERO HEADER */}
      <div className="relative w-full overflow-hidden bg-slate-50/50">
        {/* Dekorasi Background - Blob halus agar terkesan premium */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-emerald-200 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-[-5%] w-80 h-80 bg-blue-100 rounded-full blur-[120px]" />
        </div>

        {/* PERBAIKAN SAFE ZONE: pt-32 agar aman dari header mobile manapun */}
        <div className="container mx-auto pt-32 pb-16 px-6 md:pt-30 md:pb-28 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100/80 backdrop-blur-sm text-emerald-700 px-4 py-1.5 rounded-full mb-6 border border-emerald-200/50 shadow-sm animate-in fade-in slide-in-from-bottom-3 duration-1000">
            <MessageSquare className="h-3.5 w-3.5" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-nowrap">Support Center</span>
          </div>

          <h1 className="text-3xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-[1.15] md:leading-tight text-balance">
            Ada Pertanyaan? <br />
            <span className="text-emerald-600">Kami Siap Membantu.</span>
          </h1>

          <p className="text-slate-600 text-base md:text-xl max-w-2xl mx-auto leading-relaxed px-2 font-medium">
            Tim IndoFPA selalu terbuka untuk diskusi, saran, atau bantuan teknis.
            Hubungi kami melalui saluran resmi di bawah ini.
          </p>
        </div>
      </div>

      {/* SECTION 2: CONTACT CARDS */}
      <div className="container mx-auto px-6 -mt-10 md:-mt-20 relative z-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 max-w-6xl mx-auto">

          {/* EMAIL */}
          <Card className="group border-none shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] overflow-hidden bg-white ring-1 ring-slate-100">
            <CardContent className="p-8 md:p-10 flex flex-col items-center text-center">
              <div className="bg-emerald-50 text-emerald-600 p-5 rounded-[1.5rem] mb-6 group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                <Mail className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">Email Resmi</h3>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">
                Tuliskan pertanyaan Anda, tim kami akan merespon dalam 24 jam.
              </p>
              <a href="mailto:support@indofpa.org" className="w-full py-4 px-4 bg-slate-50 rounded-2xl text-emerald-700 font-black text-sm hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2 group/link border border-slate-100">
                support@indofpa.org
                <ChevronRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </CardContent>
          </Card>

          {/* LOKASI */}
          <Card className="group border-none shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] overflow-hidden bg-white ring-1 ring-slate-100">
            <CardContent className="p-8 md:p-10 flex flex-col items-center text-center">
              <div className="bg-blue-50 text-blue-600 p-5 rounded-[1.5rem] mb-6 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                <MapPin className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">Headquarter</h3>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">
                Jl. Limau Manis, Kec. Pauh,<br />
                Padang, Sumatera Barat
              </p>
              <Button variant="outline" className="w-full border-blue-100 text-blue-700 font-black rounded-2xl h-14 hover:bg-blue-50 transition-all uppercase text-xs tracking-widest">
                Buka Google Maps
              </Button>
            </CardContent>
          </Card>

          {/* TELEPON */}
          <Card className="group border-none shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] overflow-hidden bg-white ring-1 ring-slate-100">
            <CardContent className="p-8 md:p-10 flex flex-col items-center text-center">
              <div className="bg-amber-50 text-amber-600 p-5 rounded-[1.5rem] mb-6 group-hover:bg-amber-500 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                <Phone className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">Telepon & WA</h3>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">
                Aktif Senin - Jumat <br /> 09:00 - 17:00 WIB
              </p>
              <a href="https://wa.me/6281294765310" className="w-full py-4 px-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2">
                Hubungi WhatsApp
              </a>
            </CardContent>
          </Card>

        </div>

        {/* SECTION 3: BOTTOM CTA */}
        <div className="mt-16 md:mt-24 max-w-5xl mx-auto bg-emerald-600 rounded-[2.5rem] md:rounded-[3.5rem] p-10 md:p-16 text-center text-white shadow-2xl shadow-emerald-200 relative overflow-hidden">
          {/* Dekorasi Ikon melayang */}
          <Send className="absolute -top-10 -right-10 h-48 w-48 text-emerald-500/20 -rotate-12 hidden md:block" />

          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-black mb-4 tracking-tight">Tertarik Berkolaborasi?</h2>
            <p className="text-emerald-100 text-sm md:text-lg mb-10 max-w-xl mx-auto leading-relaxed font-medium opacity-90">
              Kami membuka peluang kemitraan strategis dengan institusi pendidikan, LSM, dan lembaga pemerintah untuk riset berkelanjutan.
            </p>
            <Button className="w-full md:w-auto bg-white text-emerald-700 hover:bg-emerald-50 rounded-full px-12 py-7 text-base md:text-lg font-black shadow-xl transition-all active:scale-95 uppercase tracking-widest">
              Hubungi Kemitraan
            </Button>
          </div>
        </div>

        {/* Jam Operasional */}
        <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-3 text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-emerald-500" />
            <span>Avg. Response: <strong>&lt; 2 Jam</strong></span>
          </div>
          <span className="hidden md:block opacity-30">|</span>
          <span className="opacity-70">Operasional Hari Kerja</span>
        </div>
      </div>

    </div>
  );
}