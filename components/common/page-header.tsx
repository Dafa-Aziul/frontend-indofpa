// fileName: src/components/common/page-header.tsx
"use client";

import { cn } from "@/lib/utils";
import * as React from "react"; // Tambahkan import React

type PageHeaderProps = {
    title: string;
    description?: string;
    className?: string;
    // ✅ Tambahkan action prop untuk menampung tombol atau elemen aksi
    action?: React.ReactNode;
};

export default function PageHeader({
    title,
    description,
    className,
    action, // ✅ Terima prop action
}: PageHeaderProps) {
    return (
        // Menggunakan flex-container untuk menata judul/deskripsi dan tombol aksi
        <div className={cn("flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4", className)}>

            {/* Bagian Kiri: Judul dan Deskripsi */}
            <div className="space-y-2">
                <h1
                    className="
                        font-bold
                        text-3xl
                        sm:text-4xl
                        md:text-5xl
                        leading-tight
                    "
                >
                    {title}
                </h1>

                {description && (
                    <p
                        className="
                            text-muted-foreground
                            text-base
                            sm:text-lg
                            max-w-2xl
                        "
                    >
                        {description}
                    </p>
                )}
            </div>

            {/* Bagian Kanan: Aksi (Button Kembali) */}
            {action && (
                <div className="shrink-0 pt-2 md:pt-0">
                    {action}
                </div>
            )}
        </div>
    );
}