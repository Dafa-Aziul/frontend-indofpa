"use client";

import HeaderClient from "./HeaderClient";

// 1. Definisikan tipe User agar konsisten
type UserType = {
  userId: number;
  name: string;
  email: string;
};

export default function HeaderShell({
  onOpenSidebar,
  initialUser // 2. Terima operan dari DashboardLayout
}: {
  onOpenSidebar: () => void;
  initialUser: UserType | null; // Tambahkan tipe data di sini
}) {
  return (
    <header
      className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-primary
                 flex items-center justify-between px-4 md:px-6 shadow z-40"
    >
      {/* 3. Masukkan initialUser ke HeaderClient */}
      <HeaderClient initialUser={initialUser} onOpenSidebar={onOpenSidebar} />
    </header>
  );
}