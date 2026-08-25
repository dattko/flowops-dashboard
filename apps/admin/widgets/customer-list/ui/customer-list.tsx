"use client"

import { CustomerListFilter } from "@/features/filter-customers"
import { Card, CardContent } from "@/shared/ui/card"
import { PageHeader } from "@/shared/ui/page-header"
import { Pagination } from "@/shared/ui/pagination"

import { useCustomerList } from "../lib/use-customer-list"
import { CustomerListTable } from "./customer-list-table"

const CustomerList = () => {
  const {
    filters,
    applyFilters,
    resetFilters,
    setPage,
    customerQuery: { data, isError, isFetching, isPending },
  } = useCustomerList()
  const customers = data?.items ?? []

  return (
    <section aria-labelledby="customer-list-title">
      <PageHeader
        titleId="customer-list-title"
        title="고객 관리"
        description="고객 상태와 누적 주문·구매 금액을 확인합니다."
      />

      <CustomerListFilter
        filters={filters}
        onSubmitFilters={applyFilters}
        onResetFilters={resetFilters}
      />

      <Card appearance="panel" className="mt-4">
        <CardContent className="p-0">
          <div className="relative">
            {isFetching && !isPending ? (
              <div className="absolute inset-x-0 top-0 z-10 h-0.5 overflow-hidden bg-primary/15">
                <div className="h-full w-1/3 animate-pulse bg-primary" />
              </div>
            ) : null}
            <CustomerListTable
              customers={customers}
              emptyMessage={
                isError
                  ? "고객 정보를 불러오지 못했습니다."
                  : isPending
                    ? "고객 정보를 불러오는 중입니다."
                    : "검색 조건에 맞는 고객이 없습니다."
              }
            />
          </div>

          <Pagination
            page={data?.page ?? filters.page}
            totalPages={data?.totalPages ?? 0}
            totalCount={data?.totalCount ?? 0}
            totalUnit="명"
            onPageChange={setPage}
            ariaLabel="고객 목록 페이지"
          />
        </CardContent>
      </Card>
    </section>
  )
}

export { CustomerList }
