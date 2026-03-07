"use client";

import { useState, useTransition } from "react";
import { Search, User, LogOut, Menu, X, Settings } from "lucide-react";
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
import Link from "next/link";
import Cookies from "js-cookie";


type UserType = {
  userId: number;
  name: string;
  email: string;
};

function getInitials(name: string | undefined): string {
  if (!name) return "";
  return name
    .split(" ")
    .filter(Boolean) // Memastikan tidak ada spasi ganda
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function HeaderClient({
  onOpenSidebar,
  initialUser
}: {
  onOpenSidebar: () => void;
  initialUser: UserType | null;
}) {
  const [user, setUser] = useState<UserType | null>(initialUser);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Hitung inisial secara langsung (React Compiler akan mengoptimalkan ini)
  const initials = getInitials(user?.name);

  const handleLogout = async () => {
    try {
      // Jalankan service logout (hapus refresh token di DB/Cookie server)
      await logoutService();

      // Hapus cookie user di client side
      Cookies.remove("user");
      // Update state lokal
      setUser(null);

      // Redirect menggunakan window.location agar seluruh state aplikasi bersih (hard reset)
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition"
        onClick={onOpenSidebar}
        aria-label="Open Sidebar"
      >
        <Menu size={28} />
      </button>

      {/* Desktop search */}
      <div className="hidden md:block w-full max-w-lg px-4">
        <SearchBar />
      </div>

      <div className="flex items-center gap-4 ml-auto">
        {/* Mobile search toggle */}
        <button
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition"
          onClick={() => setShowMobileSearch(!showMobileSearch)}
        >
          {showMobileSearch ? <X size={26} /> : <Search size={26} />}
        </button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 outline-none group cursor-pointer">
            <div className="relative">
              <Avatar className="bg-slate-200 ring-2 ring-transparent group-hover:ring-white/30 transition-all duration-300">
                <AvatarFallback className="text-slate-800 font-bold bg-slate-200">
                  {initials || <User size={20} />}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="text-white hidden md:block text-right select-none">
              <p className="font-semibold text-sm leading-tight truncate max-w-[150px]">
                {user?.name }
              </p>
              <p className="text-xs opacity-60 leading-tight truncate max-w-[150px]">
                {user?.email}
              </p>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 mt-2 shadow-xl border-slate-200">
            {/* User Info for Mobile Dropdown */}
            <div className="px-3 py-3 md:hidden border-b bg-slate-50/50 mb-1 rounded-t-md">
              <p className="font-bold text-sm text-slate-900 truncate">{user?.name}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>

            <DropdownMenuItem asChild>
              <Link href="/admin/profile" className="flex items-center gap-2 w-full cursor-pointer py-2.5">
                <Settings size={18} className="text-slate-500" />
                <span>Account Settings</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              disabled={isPending}
              onClick={() => startTransition(handleLogout)}
              className="text-destructive focus:bg-destructive/10 focus:text-destructive font-semibold cursor-pointer py-2.5"
            >
              <LogOut size={18} className="mr-2" />
              <span>{isPending ? "Logging out..." : "Logout"}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Search Bar Overlay */}
      {showMobileSearch && (
        <div className="md:hidden absolute top-[64px] left-0 right-0 px-4 py-3 bg-slate-900 border-b border-white/10 z-50 animate-in slide-in-from-top duration-300">
          <SearchBar />
        </div>
      )}
    </>
  );
}