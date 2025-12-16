// components/kuesioner-header.tsx
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function KuesionerHeader({ title, subtitle }: {
    title: string;
    subtitle?: string;
}) {
    return (
        <div className="flex justify-between align-center">
            <div>
                <h1 className="text-xl font-semibold">{title}</h1>
                {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            </div>

            <Button variant="outline" size="icon">
                <ArrowLeft />
            </Button>
        </div>
    );
}
