"use client";

import { useProfile } from "../hooks";
import { User, Mail } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function ProfileCard() {
    const { data, isLoading } = useProfile();

    if (isLoading) {
        return (
            <div className="bg-card border rounded-xl p-6 animate-fadeIn">
                <p className="text-sm text-muted-foreground">Memuat profil...</p>
            </div>
        );
    }

    const initials =
        data?.name
            ?.split(" ")
            .map((x) => x[0])
            .join("")
            .toUpperCase() ?? "??";

    return (
        <div className="bg-card border border-border rounded-xl shadow-sm p-6 space-y-6 animate-fadeIn">

            {/* Header */}
            <div className="flex items-center gap-4">

                <Avatar className="h-14 w-14 bg-primary text-primary-foreground">
                    <AvatarFallback className="text-lg font-semibold">
                        {initials}
                    </AvatarFallback>
                </Avatar>

                <div>
                    <h2 className="text-lg font-semibold">{data?.name}</h2>
                    <p className="text-sm text-muted-foreground">
                        Informasi akun pengguna
                    </p>
                </div>
            </div>

            <div className="border-t border-border pt-4 grid gap-4">

                {/* Nama */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <User size={16} />
                        Nama
                    </div>

                    <p className="font-medium">{data?.name}</p>
                </div>

                {/* Email */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Mail size={16} />
                        Email
                    </div>

                    <p className="font-medium">{data?.email}</p>
                </div>

            </div>
        </div>
    );
}