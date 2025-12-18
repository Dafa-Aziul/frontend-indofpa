import { PublicListView } from "@/features/public/list/components/PublicListView";

export default function PublicListPage() {
  return (
    <main className="container mx-auto py-10 px-4">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Kuesioner Publik Aktif</h1>
        <p className="text-gray-500 mt-2">Pilih kuesioner di bawah ini untuk berkontribusi.</p>
      </div>
      <PublicListView />
    </main>
  );
}