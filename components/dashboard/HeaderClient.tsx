"use client";

import { useState, useEffect } from "react";
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

function getInitials(name: string | undefined): string {
  if (!name) return "??";
  const parts = name.split(" ");
  return parts.map(part => part[0]).join("").toUpperCase().slice(0, 2);
}

export default function HeaderClient({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  // Load user synchronously (client only)
  // PERUBAHAN DI SINI: tambahkan '| null' pada tipe useState
  const [user, setUser] = useState<UserType | null>(null);
  // TAMBAHKAN STATE BARU
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // 1. Set isClient = true segera setelah mount
    setIsClient(true);

    // 2. Muat data
    const saved = localStorage.getItem("user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }
  }, []);

  const [showMobileSearch, setShowMobileSearch] = useState(false);

  // 3. LOGIKA KUNCI: Hitung inisial hanya jika Klien sudah terpasang, jika tidak,
  // gunakan inisial default yang aman ('??').
  const initials = isClient ? getInitials(user?.name) : "??";

  return (
    <>
      {/* Mobile menu button */}
      <button className="md:hidden text-white" onClick={onOpenSidebar}>
        <Menu size={28} />
      </button>

      {/* Desktop search */}
      <div className="hidden md:block w-full max-w-lg px-4">
        <SearchBar />
      </div>


      {/* Mobile search toggle */}
      <div className="flex items-center gap-4">

        <button
          className="md:hidden text-white"
          onClick={() => setShowMobileSearch(!showMobileSearch)}
        >
          {showMobileSearch ? <X size={26} /> : <Search size={26} />}
        </button>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer" suppressHydrationWarning={true}>
            <Avatar className="bg-gray-300">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>

            <div className="text-white hidden md:block text-right">
              <p className="font-semibold">{user?.name}</p>
              <p className="text-sm">{user?.email}</p>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <User size={18} /> Profile
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Settings size={18} /> Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={async () => {
                await logoutService();
                setUser(null); // <-- FIX PALING PENTING!!!
              }}
              className="text-destructive font-semibold"
            >
              <LogOut size={18} /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="md:hidden fixed top-16 left-0 right-0 px-4 pb-3 bg-primary shadow z-50">
          <SearchBar />
        </div>
      )}
    </>
  );
}
