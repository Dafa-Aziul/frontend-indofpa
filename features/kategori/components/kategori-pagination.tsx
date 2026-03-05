"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
    page: number;
    pages: number;
    limit: number;
    total: number;
    count: number;
    onPageChange: (page: number) => void;
};

export default function KategoriPagination({
    page,
    pages,
    limit,
    total,
    count,
    onPageChange,
}: Props) {
    if (total === 0) return null;

    const start = (page - 1) * limit + 1;
    const end = start + count - 1;

    // ================= PAGE RANGE (MAX 5 BUTTON) =================
    const getPages = () => {
        const delta = 2;
        const range = [];

        for (
            let i = Math.max(1, page - delta);
            i <= Math.min(pages, page + delta);
            i++
        ) {
            range.push(i);
        }

        return range;
    };

    const pageNumbers = getPages();

    return (
        <div className="flex flex-col gap-3 mt-4 sm:flex-row sm:items-center sm:justify-between">

            {/* ================= SUMMARY ================= */}
            <p className="text-sm text-muted-foreground text-center sm:text-left">
                Menampilkan <strong>{start}</strong>–<strong>{end}</strong> dari{" "}
                <strong>{total}</strong> data
            </p>

            {/* ================= PAGINATION ================= */}
            {pages > 1 && (
                <Pagination className="justify-center sm:justify-end">
                    <PaginationContent>

                        {/* PREV */}
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => page > 1 && onPageChange(page - 1)}
                                className={
                                    page === 1 ? "pointer-events-none opacity-50" : ""
                                }
                            />
                        </PaginationItem>

                        {/* FIRST PAGE */}
                        {pageNumbers[0] > 1 && (
                            <>
                                <PaginationItem>
                                    <PaginationLink onClick={() => onPageChange(1)}>
                                        1
                                    </PaginationLink>
                                </PaginationItem>

                                {pageNumbers[0] > 2 && (
                                    <PaginationItem>
                                        <span className="px-2 text-muted-foreground">...</span>
                                    </PaginationItem>
                                )}
                            </>
                        )}

                        {/* MIDDLE PAGES */}
                        {pageNumbers.map((p) => (
                            <PaginationItem key={p}>
                                <PaginationLink
                                    isActive={page === p}
                                    onClick={() => onPageChange(p)}
                                >
                                    {p}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        {/* LAST PAGE */}
                        {pageNumbers[pageNumbers.length - 1] < pages && (
                            <>
                                {pageNumbers[pageNumbers.length - 1] < pages - 1 && (
                                    <PaginationItem>
                                        <span className="px-2 text-muted-foreground">...</span>
                                    </PaginationItem>
                                )}

                                <PaginationItem>
                                    <PaginationLink onClick={() => onPageChange(pages)}>
                                        {pages}
                                    </PaginationLink>
                                </PaginationItem>
                            </>
                        )}

                        {/* NEXT */}
                        <PaginationItem>
                            <PaginationNext
                                onClick={() => page < pages && onPageChange(page + 1)}
                                className={
                                    page === pages ? "pointer-events-none opacity-50" : ""
                                }
                            />
                        </PaginationItem>

                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
}