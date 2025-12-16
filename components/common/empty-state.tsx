"use client";

import { Button } from "@/components/ui/button";

type Props = {
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
};

export default function EmptyState({
    title,
    description,
    actionLabel,
    onAction,
}: Props) {
    return (
        <div className="flex flex-col items-center justify-center rounded-md border bg-white py-16 text-center">
            <div className="max-w-md space-y-3">
                <h3 className="text-lg font-semibold">{title}</h3>

                {description && (
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                )}

                {actionLabel && onAction && (
                    <Button onClick={onAction}>
                        {actionLabel}
                    </Button>
                )}
            </div>
        </div>
    );
}
