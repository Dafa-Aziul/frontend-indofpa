// src/app/contact/page.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, MessageSquare, Send, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="w-full bg-white min-h-screen">

      {/* SECTION 1: HERO HEADER */}
      <div className="relative w-full py-20 md:py-28 overflow-hidden ">
        {/* Dekorasi Background */}
        {/* <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-50 rounded-full blur-3xl opacity-60 -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-50 rounded-full blur-3xl opacity-60 -ml-10 -mb-10" /> */}

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100/50 text-emerald-700 px-4 py-1.5 rounded-full mb-6">
            <MessageSquare className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Customer Support</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Ada Pertanyaan? <br />
            <span className="text-emerald-600">Kami Siap Membantu.</span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Tim IndoFPA selalu terbuka untuk diskusi, saran, atau bantuan teknis.
            Jangan ragu untuk menghubungi kami kapan saja.
          </p>
        </div>
      </div>

      {/* SECTION 2: CONTACT CARDS */}
      <div className="container mx-auto px-4 -mt-16 relative z-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* EMAIL */}
          <Card className="group border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-3xl overflow-hidden ring-2 ring-emerald-500/10">
            <CardContent className="p-10 flex flex-col items-center text-center">
              <div className="bg-emerald-50 text-emerald-600 p-5 rounded-2xl mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                <Mail size={36} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Email Respon Cepat</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                Kirim pesan Anda dan tim kami akan membalas dalam waktu maksimal 24 jam kerja.
              </p>
              <a href="mailto:support@indofpa.org" className="text-emerald-600 font-bold hover:underline">
                www.indofpa.com
              </a>
            </CardContent>
          </Card>

          {/* LOKASI */}
          <Card className="group border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-3xl overflow-hidden ring-2 ring-emerald-500/10">
            <CardContent className="p-10 flex flex-col items-center text-center">
              <div className="bg-emerald-50 text-emerald-600 p-5 rounded-2xl mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                <MapPin size={36} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Kantor Pusat</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                Jl. Limau Manis, Kec. Pauh,<br />
                Kota Padang, Sumatera Barat 25163
              </p>
              <Button variant="ghost" className="text-emerald-600 font-bold hover:bg-emerald-50 rounded-full">
                Lihat di Google Maps
              </Button>
            </CardContent>
          </Card>

          {/* TELEPON */}
          <Card className="group border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-3xl overflow-hidden ring-2 ring-emerald-500/10">
            <CardContent className="p-10 flex flex-col items-center text-center">
              <div className="bg-emerald-50 text-emerald-600 p-5 rounded-2xl mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                <Phone size={36} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Layanan Telepon</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                Senin - Jumat | 09:00 - 17:00 WIB <br />
                (Tersedia juga via WhatsApp)
              </p>
              <a href="tel:+6281294765310" className="text-emerald-600 font-bold hover:underline">
                +62 812-9476-5310
              </a>
            </CardContent>
          </Card>

        </div>

        {/* SECTION 3: BOTTOM CTA */}
        <div className="mt-20 max-w-4xl mx-auto bg-emerald-600 rounded-[2.5rem] p-8 md:p-12 text-center text-white shadow-2xl shadow-emerald-200 relative overflow-hidden">
          {/* Dekorasi Ikon Melayang */}
          <Send className="absolute top-10 right-10 h-32 w-32 text-emerald-500/30 -rotate-12" />

          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ingin berkolaborasi dalam penelitian?</h2>
            <p className="text-emerald-100 mb-8 max-w-lg mx-auto">
              Kami membuka peluang kemitraan dengan institusi pendidikan, LSM, dan lembaga pemerintah.
            </p>
            <Button className="bg-white text-emerald-600 hover:bg-emerald-50 rounded-full px-10 py-6 text-lg font-bold shadow-lg transition-transform active:scale-95">
              Hubungi Kemitraan
            </Button>
          </div>
        </div>

        {/* Jam Operasional */}
        <div className="mt-12 flex justify-center items-center gap-2 text-slate-400 text-sm">
          <Clock className="h-4 w-4" />
          <span>Waktu respon rata-rata: <strong>&lt; 2 Jam</strong> pada hari kerja.</span>
        </div>
      </div>

    </div>
  );
}