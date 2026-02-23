import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Toaster } from "@/components/ui/sonner"

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

        <>
            <DashboardLayout>
                {children}
            </DashboardLayout>
            <Toaster />
        </>
    );
}
