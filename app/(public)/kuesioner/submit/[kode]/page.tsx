import { IsiKuesionerView } from "@/features/public/submit/components/IsiKuesioner";
import { Metadata } from "next";

// Metadata untuk SEO (Optional)
export const metadata: Metadata = {
    title: "Isi Kuesioner | IndoFPA",
    description: "Silakan lengkapi data diri dan berikan jawaban Anda.",
};

interface PageProps {
    params: Promise<{ kode: string }>;
}

export default async function SubmitKuesionerPage({ params }: PageProps) {
    // 1. Ambil kodeAkses dari URL secara async (Standar Next.js 15)
    const { kode } = await params;

    return (
        <main className="min-h-screen bg-slate-50/50">
            {/* 2. Berikan kodeAkses ke View Component */}
            <div className="container mx-auto px-4">
                <IsiKuesionerView kodeAkses={kode} />
            </div>
        </main>
    );
}