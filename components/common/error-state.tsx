"use client";

import { Button } from "@/components/ui/button";

type Props = {
    title?: string;
    description?: string;
    onRetry?: () => void;
};

export default function ErrorState({
    title = "Terjadi kesalahan",
    description = "Kami tidak dapat memuat data saat ini. Silakan coba lagi.",
    onRetry,
}: Props) {
    return (
        <div className="flex flex-col items-center justify-center rounded-md border bg-white py-16 text-center">
            <div className="max-w-md space-y-3">
                <h3 className="text-lg font-semibold">{title}</h3>

                <p className="text-sm text-muted-foreground">
                    {description}
                </p>

                {onRetry && (
                    <Button variant="outline" onClick={onRetry}>
                        Coba Lagi
                    </Button>
                )}
            </div>
        </div>
    );
}
