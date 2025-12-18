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
    <div className="flex min-h-screen">
      <Sidebar open={openSidebar} onClose={() => setOpenSidebar(false)} />

      <div className="flex flex-1 flex-col md:ml-64">
        <HeaderShell onOpenSidebar={() => setOpenSidebar(true)} />

        <main className="flex-1 overflow-y-auto bg-gray-50 pt-16 min-w-0">
          <div className="mx-auto w-full max-w-7xl px-6 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
