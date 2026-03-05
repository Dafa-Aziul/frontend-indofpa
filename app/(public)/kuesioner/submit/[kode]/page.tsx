// src/app/public/submit/[kode]/page.tsx
import { Suspense } from "react";
import type { Metadata } from "next";
import { IsiKuesionerView } from "@/features/public/submit/components/IsiKuesioner";
import { ShieldCheck, Info, ClipboardSignature } from "lucide-react";

export const metadata: Metadata = {
    title: "Isi Kuesioner | IndoFPA",
    description: "Silakan lengkapi data diri dan berikan jawaban Anda pada formulir resmi kami.",
};

interface PageProps {
    params: Promise<{ kode: string }>;
}

const TRUST_CARDS = [
    {
        icon: ShieldCheck,
        title: "Privasi Terjamin",
        description: "Identitas Anda dianonimkan dalam setiap laporan hasil analisis data kami.",
        bgColor: "bg-emerald-50/50",
        borderColor: "border-emerald-100/50",
        iconColor: "text-emerald-600"
    },
    {
        icon: Info,
        title: "Pusat Bantuan",
        description: "Ada kendala teknis? Tim sekretariat kami siap membantu proses pengisian Anda.",
        bgColor: "bg-slate-50",
        borderColor: "border-slate-100",
        iconColor: "text-slate-600"
    }
];

export default async function SubmitKuesionerPage({ params }: PageProps) {
    const { kode } = await params;

    return (
        <main className="relative min-h-screen bg-white overflow-x-hidden">

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] md:h-[500px] bg-linear-to-b from-emerald-50/60 to-transparent -z-10" />

            <div className="container mx-auto pt-28 pb-16 px-6 md:pt-30 md:pb-24">

                <div className="max-w-4xl mx-auto relative">

                    {/* Badge Section */}
                    <div className="flex justify-center mb-4 md:mb-8">
                        <div className="inline-flex items-center gap-2 bg-emerald-100/80 backdrop-blur-sm text-emerald-700 px-4 py-1.5 rounded-full border border-emerald-100 shadow-sm">
                            <ClipboardSignature className="h-3.5 w-3.5" />
                            <span className="text-[10px] font-black uppercase tracking-[0.15em]">
                                Formulir Partisipasi Resmi
                            </span>
                        </div>
                    </div>

                    {/* Form Utama */}
                    <div className="relative z-10">
                        <Suspense fallback={<LoadingState />}>
                            <IsiKuesionerView kodeAkses={kode} />
                        </Suspense>
                    </div>

                    {/* Trust Cards Section */}
                    <div className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        {TRUST_CARDS.map((card, idx) => (
                            <div
                                key={idx}
                                className={`flex items-start gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 rounded-3xl border
      transition-all hover:shadow-md ${card.bgColor} ${card.borderColor}`}
                            >
                                <div className="p-2 sm:p-2.5 bg-white rounded-xl sm:rounded-2xl shadow-sm shrink-0">
                                    <card.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${card.iconColor}`} />
                                </div>

                                <div className="space-y-1">
                                    <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-tight">
                                        {card.title}
                                    </h4>

                                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium text-justify sm:text-left">
                                        {card.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Small Note */}
                    <p className="mt-8 text-center text-[10px] text-slat    e-400 font-bold uppercase tracking-[0.2em]">
                        IndoFPA Digital Protocol • Secure Submission
                    </p>
                </div>
            </div>
        </main>
    );
}

function LoadingState() {
    return (
        <div className="flex flex-col items-center justify-center py-24 md:py-32 px-10 text-center space-y-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="relative flex h-12 w-12 md:h-16 md:w-16">
                <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20" />
                <div className="relative inline-flex rounded-full h-12 w-12 md:h-16 md:w-16 border-4 border-slate-50 border-t-emerald-600 animate-spin" />
            </div>
            <div className="space-y-2">
                <p className="text-slate-900 font-black text-lg md:text-xl tracking-tight uppercase">Menyiapkan Formulir</p>
                <p className="text-slate-400 text-xs md:text-sm font-medium animate-pulse tracking-wide">
                    Mohon tunggu, kami sedang mengamankan koneksi Anda...
                </p>
            </div>
        </div>
    );
}