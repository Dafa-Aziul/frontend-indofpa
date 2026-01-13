import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; // Pastikan path ke file CSS global kamu benar

// Konfigurasi Font Geist sesuai keinginanmu
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | IndoFPA",
    default: "IndoFPA",
  },
  description: "Platform Kuisioner Online yang Mudah & Cepat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Layout polosan tanpa Navbar/Footer agar tidak bentrok dengan layout grup lain */}
        {children} 
      </body>
    </html>
  );
}