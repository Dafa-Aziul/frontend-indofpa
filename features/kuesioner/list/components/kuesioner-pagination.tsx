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
    count: number; // data.length
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

    return (
        <div className="flex justify-between items-center mt-4">
            {/* ================= SUMMARY ================= */}
            <p className="text-sm text-muted-foreground">
                Menampilkan <strong>{start}</strong>–<strong>{end}</strong> dari{" "}
                <strong>{total}</strong> data
            </p>

            {/* ================= PAGINATION ================= */}
            {pages > 1 && (
                <div className="flex justify-end">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => onPageChange(page - 1)}
                                    className={
                                        page === 1 ? "pointer-events-none opacity-50" : ""
                                    }
                                />
                            </PaginationItem>

                            {Array.from({ length: pages }).map((_, index) => {
                                const pageNumber = index + 1;

                                return (
                                    <PaginationItem key={pageNumber}>
                                        <PaginationLink
                                            isActive={page === pageNumber}
                                            onClick={() => onPageChange(pageNumber)}
                                        >
                                            {pageNumber}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            })}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => onPageChange(page + 1)}
                                    className={
                                        page === pages ? "pointer-events-none opacity-50" : ""
                                    }
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>

    );
}
