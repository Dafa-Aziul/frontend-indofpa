import Image from "next/image";
import Link from "next/link";
import NavLinks from "@/components/navbar/nav-links";
import MobileMenu from "@/components/navbar/mobile-menu";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
      <div className="container mx-auto h-16 px-6 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="IndoFPA Logo" width={44} height={44} />
          <span className="text-xl font-bold">IndoFPA</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          <NavLinks />

          <Button
            asChild
            className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 shadow-md"
          >
            <Link href="/login">Login</Link>
          </Button>
        </div>

        {/* Mobile menu */}
        <MobileMenu />
      </div>
    </header>
  );
}
