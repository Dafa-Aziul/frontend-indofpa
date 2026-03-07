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
  // Gunakan object title dengan 'default' dan 'template'
  title: {
    default: 'IndoFPA - Analisis Kuesioner Digital',
    template: '%s | IndoFPA' // %s bakal diganti sama metadata title di tiap page
  },
  description: 'Platform analisis kuesioner otomatis untuk riset dan data analisis.',
  keywords: ['kuesioner', 'analisis data', 'IndoFPA', 'penelitian','survey', 'data analysis', 'automated analysis', 'indofpa', 'kuesioner digital', 'analisis kuesioner', 'platform analisis data'
  ],
  metadataBase: new URL('https://indofpa.sotvi.org/'),
  openGraph: {
    title: 'IndoFPA',
    description: 'Analisis kuesioner jadi lebih mudah.',
    url: 'https://indofpa.sotvi.org/',
    siteName: 'IndoFPA',
    images: [
      {
        url: '../public/images/og-image.webp',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IndoFPA',
    description: 'Analisis kuesioner jadi lebih mudah.',
    images: ['/og-image.webp'],
  },
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