"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type KuesionerStatus = "Draft" | "Publish" | "Arsip";

type Props = {
    status: KuesionerStatus | string;
};

export default function KuesionerStatusBadge({ status }: Props) {
    const config: Record<
        string,
        { label: string; className: string }
    > = {
        Draft: {
            label: "Draft",
            className: "bg-gray-200 text-gray-800",
        },
        Publish: {
            label: "Publish",
            className: "bg-green-600 text-white",
        },
        Arsip: {
            label: "Arsip",
            className: "bg-yellow-300 text-yellow-900",
        },
    };

    const item = config[status] ?? {
        label: status,
        className: "bg-muted text-muted-foreground",
    };

    return (
        <Badge
            className={cn(
                "rounded-full px-3 py-1 text-xs font-medium",
                item.className
            )}
        >
            {item.label}
        </Badge>
    );
}
