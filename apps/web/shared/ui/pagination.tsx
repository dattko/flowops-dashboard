"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { usePagination } from "@/shared/hooks/use-pagination"
import { Button } from "@/shared/ui/button"

type PaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination = ({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pages = usePagination(page, totalPages)

  if (totalPages <= 1) return null

  return (
    <nav
      className="mt-16 flex items-center justify-center gap-1"
      aria-label="상품 목록 페이지"
    >
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="이전 페이지"
      >
        <ChevronLeft aria-hidden="true" />
      </Button>
      {pages.map((pageNumber) => (
        <Button
          key={pageNumber}
          type="button"
          variant={pageNumber === page ? "default" : "outline"}
          size="icon-sm"
          onClick={() => onPageChange(pageNumber)}
          aria-current={pageNumber === page ? "page" : undefined}
          aria-label={`${pageNumber}페이지`}
        >
          {pageNumber}
        </Button>
      ))}
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="다음 페이지"
      >
        <ChevronRight aria-hidden="true" />
      </Button>
    </nav>
  )
}
