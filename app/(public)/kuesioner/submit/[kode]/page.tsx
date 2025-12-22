import { Suspense } from "react";
import type { Metadata } from "next";
import { IsiKuesionerView } from "@/features/public/submit/components/IsiKuesioner";
import { ShieldCheck, Info, ClipboardSignature } from "lucide-react";

export const metadata: Metadata = {
    title: "Isi Kuesioner | IndoFPA",
    description: "Silakan lengkapi data diri dan berikan jawaban Anda.",
};

interface PageProps {
    params: Promise<{ kode: string }>;
}

const TRUST_CARDS = [
    {
        icon: ShieldCheck,
        title: "Privasi Terjamin",
        description: "Identitas Anda disamarkan dalam laporan hasil analisis kebijakan kami.",
        bgColor: "bg-emerald-50/50",
        borderColor: "border-emerald-100/50",
        iconColor: "text-emerald-600"
    },
    {
        icon: Info,
        title: "Informasi Bantuan",
        description: "Jika mengalami kendala teknis saat mengisi, silakan hubungi tim sekretariat kami.",
        bgColor: "bg-slate-50",
        borderColor: "border-slate-100",
        iconColor: "text-slate-600"
    }
];

export default async function SubmitKuesionerPage({ params }: PageProps) {
    const { kode } = await params;

    return (
        <main className="relative min-h-screen bg-white">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[450px] bg-linear-to-b from-emerald-50/50 to-transparent -z-10" />

            <div className="container mx-auto py-12 px-4 md:py-20">

                <div className="max-w-4xl mx-auto relative">
                    <div className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full">
                            <ClipboardSignature className="h-4 w-4" />
                            <span className="text-xs font-bold uppercase tracking-widest">
                                Formulir Partisipasi
                            </span>
                        </div>
                    </div>

                    <Suspense fallback={<LoadingState />}>
                        <IsiKuesionerView kodeAkses={kode} />
                    </Suspense>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {TRUST_CARDS.map((card, idx) => (
                            <div key={idx} className={`flex items-start gap-4 p-6 rounded-3xl border ${card.bgColor} ${card.borderColor}`}>
                                <div className="p-2.5 bg-white rounded-2xl shadow-sm">
                                    <card.icon className={`h-5 w-5 ${card.iconColor}`} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 mb-1">{card.title}</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed">{card.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

function LoadingState() {
    return (
        <div className="flex flex-col items-center justify-center py-32 px-10 text-center space-y-4">
            <div className="relative flex h-10 w-10">
                <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20" />
                <div className="relative inline-flex rounded-full h-10 w-10 border-t-2 border-emerald-600 animate-spin" />
            </div>
            <div className="space-y-1">
                <p className="text-slate-900 font-bold text-lg">Memuat Formulir</p>
                <p className="text-slate-400 text-sm animate-pulse">Mohon tunggu sebentar...</p>
            </div>
        </div>
    );
}