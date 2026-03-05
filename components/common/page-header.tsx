"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type PageHeaderProps = {
    title: string;
    description?: string;
    className?: string;
    action?: React.ReactNode;
    showBack?: boolean;
};

export default function PageHeader({
    title,
    description,
    className,
    action,
    showBack = false,
}: PageHeaderProps) {
    const router = useRouter();

    return (
        <div className={cn("pb-4 space-y-3", className)}>

            {/* Row utama */}
            <div className="flex items-center justify-between">

                {/* Title */}
                <h1
                    className="
            font-bold
            text-2xl
            sm:text-3xl
            md:text-4xl
            leading-tight
            tracking-tight
          "
                >
                    {title}
                </h1>

                {/* Right Side */}
                <div className="flex items-center gap-4">

                    {/* Back Button */}
                    {showBack && (
                        <button
                            onClick={() => router.back()}
                            className="
                flex items-center gap-2
                text-sm font-medium
                text-muted-foreground
                hover:text-primary
                transition
              "
                        >
                            <ArrowLeft size={18} />
                            Kembali
                        </button>
                    )}

                    {/* Custom Action */}
                    {action}

                </div>

            </div>

            {/* Description */}
            {description && (
                <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
                    {description}
                </p>
            )}

        </div>
    );
}