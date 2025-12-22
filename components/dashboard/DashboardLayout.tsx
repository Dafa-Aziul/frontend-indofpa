"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import HeaderShell from "./HeaderShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    // h-screen memastikan layout selalu setinggi layar
    <div className="flex h-screen w-full overflow-hidden bg-gray-50"> 
      <Sidebar open={openSidebar} onClose={() => setOpenSidebar(false)} />

      {/* Bagian utama kanan */}
      <div className="flex flex-1 flex-col min-w-0 h-full md:ml-64">
        <HeaderShell onOpenSidebar={() => setOpenSidebar(true)} />

        {/* PERBAIKAN SCROLL:
          1. flex-1 h-full: Memastikan area main mengambil sisa tinggi layar.
          2. overflow-y-auto: Mengaktifkan scroll ke bawah di sini.
          3. overflow-x-hidden: Mencegah halaman goyang kiri-kanan.
        */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden pt-16">
          {/* Container children: 
            Gunakan min-h-full agar background tetap penuh dan scroll lancar 
          */}
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}