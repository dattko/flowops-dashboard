"use client"

import Link from "next/link"
import { Plus } from "lucide-react"

import { InventoryListFilter } from "@/features/filter-inventory"
import { ROUTES } from "@/shared/config/routes"
import { buttonVariants } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"
import { PageHeader } from "@/shared/ui/page-header"
import { Pagination } from "@/shared/ui/pagination"

import { useInventoryList } from "../lib/use-inventory-list"
import { InventoryListTable } from "./inventory-list-table"

const InventoryList = () => {
  const {
    filters,
    applyFilters,
    resetFilters,
    setPage,
    inventoryQuery: { data, isError, isFetching, isPending },
  } = useInventoryList()
  const inventoryItems = data?.items ?? []

  return (
    <section aria-labelledby="inventory-list-title">
      <PageHeader
        titleId="inventory-list-title"
        title="재고 관리"
        description="원두와 홈카페 상품의 보유·예약·판매 가능 재고를 관리합니다."
        actions={
          <Link href={ROUTES.inventory.create} className={buttonVariants()}>
            <Plus aria-hidden="true" />
            상품 등록
          </Link>
        }
      />

      <InventoryListFilter
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
            <InventoryListTable
              inventoryItems={inventoryItems}
              emptyMessage={
                isError
                  ? "재고 정보를 불러오지 못했습니다."
                  : isPending
                    ? "재고 정보를 불러오는 중입니다."
                    : "검색 조건에 맞는 상품이 없습니다."
              }
            />
          </div>

          <Pagination
            page={data?.page ?? filters.page}
            totalPages={data?.totalPages ?? 0}
            totalCount={data?.totalCount ?? 0}
            totalUnit="개 상품"
            onPageChange={setPage}
            ariaLabel="재고 목록 페이지"
          />
        </CardContent>
      </Card>
    </section>
  )
}

export { InventoryList }
