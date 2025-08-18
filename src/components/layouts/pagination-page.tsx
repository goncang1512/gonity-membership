"use client";
import { useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

interface PaginationPageProps {
  page: number;
  totalHalaman: number;
}

export default function PaginationPage({
  totalHalaman,
  page,
}: PaginationPageProps) {
  const searchParams = useSearchParams();

  // helper buat bikin query string baru tanpa hilangin yang lama
  const createPageLink = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    return `?${params.toString()}`;
  };

  return (
    <Pagination className="w-max">
      <PaginationContent>
        {/* Tombol Previous */}
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious href={createPageLink(page - 1)} />
          </PaginationItem>
        )}

        {/* Halaman dinamis */}
        {(() => {
          const totalPages = totalHalaman;
          const visiblePages: (number | string)[] = [];

          // Selalu tampilkan halaman 1
          if (page > 0) visiblePages.push(1);

          // Ellipsis setelah halaman pertama
          if (page > 3) visiblePages.push("start-ellipsis");

          // Tampilkan 2 sebelum dan sesudah current page
          for (let i = page - 1; i <= page + 1; i++) {
            if (i > 1 && i < totalPages) {
              visiblePages.push(i);
            }
          }

          // Ellipsis sebelum halaman terakhir
          if (page < totalPages - 2) visiblePages.push("end-ellipsis");

          // Selalu tampilkan halaman terakhir
          if ((page === totalPages || page < totalPages) && page !== 1)
            visiblePages.push(totalPages);

          return visiblePages.map((p, idx) => {
            if (p === "start-ellipsis" || p === "end-ellipsis") {
              return (
                <PaginationItem key={p + idx}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={p}>
                <PaginationLink
                  href={createPageLink(p as number)}
                  isActive={p === page}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            );
          });
        })()}

        {/* Tombol Next */}
        {page < totalHalaman && (
          <PaginationItem>
            <PaginationNext href={createPageLink(page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
