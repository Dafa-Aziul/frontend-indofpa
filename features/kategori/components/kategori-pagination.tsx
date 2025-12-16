// fileName: src/components/common/KategoriPagination.tsx (Lokasi Asumsi)
"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis, // ✅ Tambahkan Ellipsis
} from "@/components/ui/pagination";

type Props = {
    page: number;
    pages: number;
    limit: number;
    total: number;
    count: number; // data.length
    onPageChange: (page: number) => void;
};

// Fungsi utilitas untuk menghasilkan array nomor halaman yang akan ditampilkan (dengan ellipsis)
const generatePaginationItems = (currentPage: number, totalPages: number, siblings: number = 1) => {
    if (totalPages <= 1) return [];

    const range = [];
    // Selalu masukkan halaman 1
    range.push(1);

    // Hitung jendela sekitar halaman saat ini
    const start = Math.max(2, currentPage - siblings);
    const end = Math.min(totalPages - 1, currentPage + siblings);

    // Tambahkan Ellipsis di kiri jika start > 2
    if (start > 2) {
        range.push('...');
    }

    // Tambahkan halaman di jendela sekitar
    for (let i = start; i <= end; i++) {
        if (!range.includes(i)) {
            range.push(i);
        }
    }

    // Tambahkan Ellipsis di kanan jika end < totalPages - 1
    if (end < totalPages - 1) {
        range.push('...');
    }

    // Selalu masukkan halaman terakhir, jika belum ada
    if (totalPages !== 1 && !range.includes(totalPages)) {
        range.push(totalPages);
    }
    
    // Pastikan halaman saat ini ada di range
    if (!range.includes(currentPage)) {
        if (currentPage > 1 && currentPage < totalPages) {
             // Masukkan halaman saat ini di posisi yang tepat
             if (range[0] !== currentPage) range.splice(range.findIndex(p => p > currentPage), 0, currentPage);
        }
    }
    
    // Cleanup duplikat/redundant ellipsis (jika ada)
    return range.filter((item, index) => !(item === '...' && range[index - 1] === '...'));
};


export default function KategoriPagination({
    page,
    pages,
    limit,
    total,
    count,
    onPageChange,
}: Props) {
    if (total === 0 || pages <= 1) return null; // Hanya tampilkan jika ada data DAN lebih dari 1 halaman

    const start = (page - 1) * limit + 1;
    const end = start + count - 1;
    
    const paginationItems = generatePaginationItems(page, pages, 1); // Tampilkan 1 halaman di kiri/kanan

    return (
        <div className="flex justify-between items-center mt-4 flex-col sm:flex-row gap-3">
            {/* ================= SUMMARY ================= */}
            <p className="text-sm text-muted-foreground order-2 sm:order-1">
                Menampilkan <strong>{start}</strong>–<strong>{end}</strong> dari{" "}
                <strong>{total}</strong> data
            </p>

            {/* ================= PAGINATION ================= */}
            <div className="flex justify-end order-1 sm:order-2">
                <Pagination>
                    <PaginationContent>
                        {/* 1. Tombol Previous */}
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => onPageChange(page - 1)}
                                className={
                                    page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
                                }
                            />
                        </PaginationItem>

                        {/* 2. Tombol Halaman (dinamis dengan ellipsis) */}
                        {paginationItems.map((item, index) => {
                            if (item === '...') {
                                return (
                                    <PaginationItem key={`ellipsis-${index}`}>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                );
                            }

                            const pageNumber = item as number;

                            return (
                                <PaginationItem key={pageNumber}>
                                    <PaginationLink
                                        isActive={page === pageNumber}
                                        onClick={() => onPageChange(pageNumber)}
                                        className="cursor-pointer"
                                    >
                                        {pageNumber}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}

                        {/* 3. Tombol Next */}
                        <PaginationItem>
                            <PaginationNext
                                onClick={() => onPageChange(page + 1)}
                                className={
                                    page === pages ? "pointer-events-none opacity-50" : "cursor-pointer"
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}