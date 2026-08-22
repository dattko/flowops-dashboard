"use client"

import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import { usePagination } from "@/shared/lib/use-pagination"
import { Button } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"

type PaginationProps = {
  page: number
  totalPages: number
  totalCount?: number
  totalUnit?: string
  onPageChange: (page: number) => void
  ariaLabel?: string
}

export const Pagination = ({
  page,
  totalPages,
  totalCount,
  totalUnit = "건",
  onPageChange,
  ariaLabel = "페이지 이동",
}: PaginationProps) => {
  const pages = usePagination(page, totalPages)
  const hasPreviousPage = page > 1
  const hasNextPage = page < totalPages

  return (
    <div className="flex flex-col gap-3 border-t border-[#eeece6] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      {totalCount !== undefined && (
        <Typography variant="label" tone="muted">
          총 {totalCount.toLocaleString()}{totalUnit}
        </Typography>
      )}

      <nav className="flex items-center gap-1" aria-label={ariaLabel}>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          disabled={!hasPreviousPage}
          onClick={() => onPageChange(1)}
          aria-label="첫 페이지"
        >
          <ChevronFirst aria-hidden="true" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          disabled={!hasPreviousPage}
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
          disabled={!hasNextPage}
          onClick={() => onPageChange(page + 1)}
          aria-label="다음 페이지"
        >
          <ChevronRight aria-hidden="true" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          disabled={!hasNextPage}
          onClick={() => onPageChange(totalPages)}
          aria-label="마지막 페이지"
        >
          <ChevronLast aria-hidden="true" />
        </Button>
      </nav>
    </div>
  )
}
