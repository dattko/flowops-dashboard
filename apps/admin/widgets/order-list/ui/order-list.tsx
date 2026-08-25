"use client"

import { Card, CardContent } from "@/shared/ui/card"
import { PageHeader } from "@/shared/ui/page-header"
import { Pagination } from "@/shared/ui/pagination"
import { OrderListFilter } from "@/features/filter-orders"

import { useOrderList } from "../lib/use-order-list"
import { OrderListTable } from "./order-list-table"

export const OrderList = () => {
  const {
    filters,
    applyFilters,
    setPage,
    resetFilters,
    ordersQuery: { data, isError, isFetching, isPending },
  } = useOrderList()
  const orders = data?.items ?? []

  return (
    <section aria-labelledby="order-list-title">
      <PageHeader
        titleId="order-list-title"
        title="주문 관리"
        description="자사몰에서 접수된 주문 내역입니다."
      />

      <OrderListFilter
        filters={filters}
        onSubmitFilters={applyFilters}
        onResetFilters={resetFilters}
      />

      <Card appearance="panel" className="mt-4">
        <CardContent className="p-0">
          <div className="relative">
            {isFetching && !isPending && (
              <div className="absolute inset-x-0 top-0 z-10 h-0.5 overflow-hidden bg-primary/15">
                <div className="h-full w-1/3 animate-pulse bg-primary" />
              </div>
            )}
            <OrderListTable
              orders={orders}
              emptyMessage={
                isError
                  ? "주문 내역을 불러오지 못했습니다."
                  : isPending
                    ? "주문 내역을 불러오는 중입니다."
                    : "검색 조건에 맞는 주문이 없습니다."
              }
            />
          </div>

          <Pagination
            page={data?.page ?? filters.page}
            totalPages={data?.totalPages ?? 0}
            totalCount={data?.totalCount ?? 0}
            onPageChange={setPage}
            ariaLabel="주문 목록 페이지"
          />
        </CardContent>
      </Card>
    </section>
  )
}
