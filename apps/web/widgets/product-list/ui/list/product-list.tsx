"use client"

import type { ProductListFilters, ProductListResponse } from "@/entities/product"
import {
  ProductListFilter,
  useProductListFilter,
} from "@/features/filter-products"
import { Pagination } from "@/shared/ui/pagination"

import { ProductListContent } from "./product-list-content"
import { ProductListHero } from "./product-list-hero"
import { ProductListToolbar } from "./product-list-toolbar"

type ProductListProps = {
  initialData?: ProductListResponse
  initialFilters: ProductListFilters
}

export const ProductList = ({
  initialData,
  initialFilters,
}: ProductListProps) => {
  const {
    filters,
    sort,
    page,
    productQuery: { data, isError, isFetching, isPending, refetch },
    hasActiveFilters,
    applyFilters,
    setSort,
    setPage,
    resetFilters,
  } = useProductListFilter({ initialData, initialFilters })
  const products = data?.items ?? []

  return (
    <>
      <ProductListHero />

      <section className="px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-[90rem]">
          <ProductListFilter
            filters={filters}
            hasActiveFilters={hasActiveFilters}
            onSubmitFilters={applyFilters}
            onResetFilters={resetFilters}
          />

          <ProductListToolbar
            totalCount={data?.totalCount ?? 0}
            isRefreshing={isFetching && !isPending}
            sort={sort}
            onSortChange={setSort}
          />

          <ProductListContent
            products={products}
            isPending={isPending}
            isError={isError}
            onRetry={() => refetch()}
            onReset={resetFilters}
          />

          <Pagination
            page={data?.page ?? page}
            totalPages={data?.totalPages ?? 0}
            onPageChange={setPage}
          />
        </div>
      </section>
    </>
  )
}
