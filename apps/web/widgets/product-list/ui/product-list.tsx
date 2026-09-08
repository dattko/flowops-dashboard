import { Suspense } from "react"

import { getProductsServer } from "@/entities/product/server"
import { getProductListFilters } from "@/features/filter-products"
import {
  toURLSearchParams,
  type PageSearchParams,
} from "@/shared/lib/search-params"

import { ProductListPage } from "./product-list-page"

export type ProductListProps = {
  searchParams: Promise<PageSearchParams>
}

export const ProductList = async ({ searchParams }: ProductListProps) => {
  const initialFilters = getProductListFilters(
    toURLSearchParams(await searchParams),
  )
  const initialData = await getProductsServer(initialFilters)

  return (
    <Suspense
      fallback={
        <div
          className="min-h-[70svh] animate-pulse bg-cream/55"
          aria-label="상품 목록을 준비하는 중입니다."
        />
      }
    >
      <ProductListPage
        initialData={initialData}
        initialFilters={initialFilters}
      />
    </Suspense>
  )
}
