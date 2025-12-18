import { PublicDetailView } from "@/features/public/list/components/PublicDetailView";
import { Metadata } from "next";

// Definisikan tipe untuk Next.js 15 (params adalah Promise)
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PublicDetailPage({ params }: PageProps) {
  // 1. Unwrapping params menggunakan await
  const { id } = await params;

  return (
    <main className="min-h-screen bg-slate-50/50">
      <div className="container mx-auto px-4 py-8">
        {/* 2. Kirim id yang sudah di-await ke komponen detail */}
        <PublicDetailView id={id} />
      </div>
    </main>
  );
}