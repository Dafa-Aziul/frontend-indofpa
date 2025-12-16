"use client";

import { useState } from "react";
import { Search, User, Settings, LogOut, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { logoutService } from "@/features/auth/services/auth.service";
import SearchBar from "../searchBar";

type UserType = {
  userId: number;
  name: string;
  email: string;
};

export default function Header({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  // Load user synchronously (tanpa flicker)
  const [user] = useState<UserType | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("user");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch { }
      }
    }
    return null;
  });

  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const initials =
    user?.name
      ?.split(" ")
      .map((x) => x[0])
      .join("")
      .toUpperCase() ?? "??";

  return (
    <>
      <header
        className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-primary 
               flex items-center justify-between px-4 md:px-6 shadow z-40"
      >

        {/* 1. KIRI: Tombol Sidebar (Mobile Only) */}
        <button className="md:hidden text-white" onClick={onOpenSidebar}>
          <Menu size={28} />
        </button>

        {/* 2. TENGAH: Search Bar (Desktop Only) */}
        {/* Note: Karena ini hidden di mobile, ia tidak mengganggu tata letak mobile */}
        <div
          className="md:hidden fixed top-16 left-0 right-0 px-4 pb-3 bg-primary shadow z-50 
                       transition-opacity duration-300 ease-in-out opacity-0"
        // Tambahkan transisi, tapi set opacity awal ke 0.
        >
          <SearchBar />
        </div>

        {/* 3. KANAN: KELOMPOK KONTROL (Search Toggle & Profile) */}
        {/* Pada desktop, ini berada di ujung kanan header.
       Pada mobile, ini akan berada di paling kanan, sejajar dengan tombol sidebar di kiri. */}
        <div className="flex items-center gap-4">

          {/* Tombol Search Toggle (Mobile Only) */}
          <button
            className="md:hidden text-white"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          >
            {showMobileSearch ? <X size={26} /> : <Search size={26} />}
          </button>

          {/* Dropdown Menu (Avatar) */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer">
              <Avatar className="bg-muted">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>

              {/* Teks profil (Desktop Only) */}
              <div className="text-white hidden md:block text-right">
                <p className="font-semibold">{user?.name}</p>
                <p className="text-sm">{user?.email}</p>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem><User size={18} /> Profile</DropdownMenuItem>
              <DropdownMenuItem><Settings size={18} /> Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={logoutService}
                className="text-destructive font-semibold"
              >
                <LogOut size={18} /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {showMobileSearch && (
        <div className="md:hidden fixed top-16 left-0 right-0 px-4 pb-3 bg-primary shadow z-50">
          <SearchBar />
        </div>
      )}
    </>
  );
}
