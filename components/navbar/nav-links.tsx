"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks({
  onClick,
  vertical = false,
}: {
  onClick?: () => void;
  vertical?: boolean;
}) {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `transition-colors ${
      pathname === path || pathname.startsWith(path) && path !== "/"
        ? "text-green-600 font-bold"
        : "text-black/70"
    } hover:text-green-600 text-base`;

  return (
    <div className={`${vertical ? "flex flex-col gap-4" : "flex gap-8"}`}>
      <Link href="/" onClick={onClick} className={linkClass("/")}>
        Home
      </Link>
      <Link href="/about" onClick={onClick} className={linkClass("/about")}>
        About
      </Link>
      <Link href="/contact" onClick={onClick} className={linkClass("/contact")}>
        Contact
      </Link>
      <Link
        href="/kuesioner"
        onClick={onClick}
        className={linkClass("/kuesioner")}
      >
        Kuesioner
      </Link>
    </div>
  );
}
