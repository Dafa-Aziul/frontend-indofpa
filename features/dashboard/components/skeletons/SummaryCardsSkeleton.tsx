export function SummaryCardsSkeleton() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-muted animate-pulse" />
                        <div className="space-y-2">
                            <div className="w-20 h-3 bg-muted rounded animate-pulse" />
                            <div className="w-16 h-4 bg-muted rounded animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-muted animate-pulse" />
                        <div className="space-y-2">
                            <div className="w-20 h-3 bg-muted rounded animate-pulse" />
                            <div className="w-16 h-4 bg-muted rounded animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
