import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { cookies } from "next/headers"; // 1. IMPORT cookies
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

// 2. Jadikan fungsi ini ASYNC agar bisa pakai await cookies()
export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // 3. AMBIL DATA COOKIE DI SINI
    const cookieStore = await cookies();
    const userCookie = cookieStore.get("user")?.value;

    let userData = null;
    if (userCookie) {
        try {
            // Decode dan parse JSON
            userData = JSON.parse(decodeURIComponent(userCookie));
        } catch (e) {
            console.error("Gagal parse cookie user:", e);
        }
    }

    return (
        <>
            <DashboardLayout initialUser={userData}>
                {children}
            </DashboardLayout>
            <Toaster />
        </>


    );
}