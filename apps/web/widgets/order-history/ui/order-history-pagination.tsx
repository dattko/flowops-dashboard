"use client"

import { Pagination } from "@/shared/ui/pagination"

import { useOrderHistoryPagination } from "../lib/use-order-history-pagination"

const OrderHistoryPagination = ({
  page,
  totalPages,
}: {
  page: number
  totalPages: number
}) => {
  const { setPage } = useOrderHistoryPagination()

  return (
    <Pagination
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
      ariaLabel="주문 내역 페이지"
    />
  )
}

export { OrderHistoryPagination }
