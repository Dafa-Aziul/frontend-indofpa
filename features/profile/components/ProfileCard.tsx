"use client";

import { User, Mail } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type UserType = {
    userId: number;
    name: string;
    email: string;
};

export default function ProfileCard({ initialData }: { initialData: UserType | null }) {
    const data = initialData;

    // Jika data tidak ada, tetap gunakan layout yang sama tingginya agar tidak "jumpy"
    if (!data) {
        return (
            <div className="bg-card border rounded-xl p-6 shadow-sm flex items-center justify-center min-h-[200px]">
                <p className="text-sm text-muted-foreground italic text-center">
                    Sesi telah berakhir. Silakan login kembali.
                </p>
            </div>
        );
    }

    const initials = data.name
        ? data.name
            .split(" ")
            .filter(Boolean)
            .map((x) => x[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
        : "??";

    return (
        /* Hapus animate-fadeIn di sini untuk instan render */
        <div className="bg-card border border-border rounded-xl shadow-sm p-6 space-y-6">
            {/* Header Profil */}
            <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 bg-primary text-primary-foreground border-2 border-primary/10 shadow-sm">
                    <AvatarFallback className="text-xl font-bold bg-primary text-white">
                        {initials}
                    </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                    <h2 className="text-xl font-bold truncate text-slate-900">{data.name}</h2>
                    <p className="text-sm text-muted-foreground truncate">
                        ID Pengguna: #{data.userId}
                    </p>
                </div>
            </div>

            <div className="border-t border-border pt-5 space-y-4">
                {/* Baris Nama */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                        <User size={18} className="text-primary/60" />
                        <span>Nama Lengkap</span>
                    </div>
                    <p className="font-semibold text-slate-800">{data.name}</p>
                </div>

                {/* Baris Email */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                        <Mail size={18} className="text-primary/60" />
                        <span>Alamat Email</span>
                    </div>
                    <p className="font-semibold text-slate-800 truncate">{data.email}</p>
                </div>
            </div>

            <div className="bg-slate-50/50 rounded-lg p-3 text-[10px] text-slate-400 text-center uppercase tracking-widest border border-dashed border-slate-200">
                Data Sesi Terverifikasi
            </div>
        </div>
    );
}