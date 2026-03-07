"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import HeaderShell from "./HeaderShell";

// 1. Tambahkan tipe data user
type UserType = {
  userId: number;
  name: string;
  email: string;
};

export default function DashboardLayout({
  children,
  initialUser, // <--- 2. TERIMA operan dari RootLayout
}: {
  children: React.ReactNode;
  initialUser: UserType | null; // <--- 3. Tambahkan tipenya di sini
}) {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      <Sidebar open={openSidebar} onClose={() => setOpenSidebar(false)} />

      <div className="flex flex-1 flex-col min-w-0 h-full md:ml-64">
        {/* 4. KIRIM LAGI ke HeaderShell */}
        <HeaderShell
          initialUser={initialUser}
          onOpenSidebar={() => setOpenSidebar(true)}
        />

        <main className="flex-1 overflow-y-auto overflow-x-hidden pt-16">
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}