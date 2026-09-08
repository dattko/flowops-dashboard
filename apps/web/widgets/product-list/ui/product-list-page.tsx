import { Suspense } from "react"

import { getProductsServer } from "@/entities/product/server"
import { getProductListFilters } from "@/features/filter-products"
import {
  toURLSearchParams,
  type PageSearchParams,
} from "@/shared/lib/search-params"

import { ProductList } from "./list/product-list"

export type ProductListPageProps = {
  searchParams: Promise<PageSearchParams>
}

export const ProductListPage = async ({
  searchParams,
}: ProductListPageProps) => {
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
      <ProductList
        initialData={initialData}
        initialFilters={initialFilters}
      />
    </Suspense>
  )
}
