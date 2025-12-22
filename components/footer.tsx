// src/components/layout/Footer.tsx
import { BarChart4, Mail, MapPin, Globe, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

          {/* Column 1: Brand & Bio */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-emerald-600 rounded-lg">
                <BarChart4 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-800">
                IndoFPA
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Platform analisis data kuesioner cerdas untuk mendukung riset dan pengambilan keputusan yang lebih akurat dan terukur.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Beranda</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">About Saya</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Riwayat Laporan</a></li>
            </ul>
          </div>

          {/* Column 3: Support & Legal */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Bantuan</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#privacy" className="hover:text-emerald-600 transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#terms" className="hover:text-emerald-600 transition-colors">Syarat & Ketentuan</a></li>
              <li><a href="/contact" className="hover:text-emerald-600 transition-colors">Pusat Bantuan</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Kontak Kami</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Jl. Teknologi Raya No. 12, Jakarta Selatan</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>support@indofpa.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>www.indofpa.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright & Socials */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-medium text-slate-400">
            © {currentYear} <span className="text-emerald-600">IndoFPA Analytics.</span> All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-slate-400">
            <a href="#" className="hover:text-emerald-600 transition-colors"><Twitter className="h-4 w-4" /></a>
            <a href="#" className="hover:text-emerald-600 transition-colors"><Linkedin className="h-4 w-4" /></a>
            <a href="#" className="hover:text-emerald-600 transition-colors"><Github className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}