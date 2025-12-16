"use client";

import HeaderClient from "./HeaderClient";

export default function HeaderShell({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  return (
    <header
      className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-primary
                 flex items-center justify-between px-4 md:px-6 shadow z-40"
    >
      <HeaderClient onOpenSidebar={onOpenSidebar} />
    </header>
  );
}
