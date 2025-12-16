"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  LayoutGrid,
  ClipboardList,
  Monitor,
  BarChart2,
  HelpCircle,
  Tags,
  X,
} from "lucide-react";

const menu = [
  { label: "Dashboard", href: "/admin/dashboard", match: "/admin/dashboard", icon: LayoutGrid },
  { label: "Kategori", href: "/admin/kategori", match: "/admin/kategori", icon: Tags },
  { label: "Kuesioner", href: "/admin/kuesioner", match: "/admin/kuesioner", icon: ClipboardList },
  { label: "Monitoring", href: "/admin/monitoring", match: "/admin/monitoring", icon: Monitor },
  { label: "Analisis", href: "/admin/analisis", match: "/admin/analisis", icon: BarChart2 },
  { label: "Bantuan", href: "/admin/bantuan", match: "/admin/bantuan", icon: HelpCircle },
];

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={clsx(
          "fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r p-6 flex flex-col transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        {/* Close button */}
        <button className="md:hidden mb-6" onClick={onClose}>
          <X size={28} className="text-gray-700" />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 mb-10">
          <Image src="/logo.png" width={34} height={34} alt="Logo" />
          <span className="text-xl font-bold">IndoFPA</span>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-2">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.match);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={clsx(
                  "flex items-center gap-3 px-4 py-2 rounded-lg text-base transition-colors",
                  active
                    ? "bg-accent text-white"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <Icon size={22} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
