"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import NavLinks from "./nav-links";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Burger button */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 hover:bg-gray-100 rounded-md transition"
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Dropdown (absolute di bawah navbar) */}
      <div
        className={`absolute left-0 top-16 w-full bg-white shadow-md z-40 transition-all duration-300 
          ${open ? "opacity-100 max-h-screen py-4" : "opacity-0 max-h-0 overflow-hidden"}
        `}
      >
        <div className="px-6 flex flex-col gap-4 text-base">
          <NavLinks vertical onClick={() => setOpen(false)} />

          <Button
            asChild
            className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-2 shadow-md mt-2"
          >
            <Link href="/login" onClick={() => setOpen(false)}>
              Login
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
