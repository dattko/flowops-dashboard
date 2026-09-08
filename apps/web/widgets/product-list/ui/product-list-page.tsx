import { Suspense } from "react"

import { getProductsServer } from "@/entities/product/server"
import { getProductListFilters } from "@/features/filter-products"
import {
  toURLSearchParams,
  type PageSearchParams,
} from "@/shared/lib/search-params"

import { ProductList } from "./list/product-list"
import { ProductListHero } from "./product-list-hero"

export type ProductListPageProps = {
  searchParams: Promise<PageSearchParams>
}

const ProductListLoader = async ({
  searchParams,
}: ProductListPageProps) => {
  const initialFilters = getProductListFilters(
    toURLSearchParams(await searchParams),
  )
  const initialData = await getProductsServer(initialFilters)

  return <ProductList initialData={initialData} initialFilters={initialFilters} />
}

export const ProductListPage = ({ searchParams }: ProductListPageProps) => (
  <>
    <ProductListHero />
    <Suspense
      fallback={
        <div
          className="min-h-[70svh] animate-pulse bg-cream/55"
          aria-label="상품 목록을 준비하는 중입니다."
        />
      }
    >
      <ProductListLoader searchParams={searchParams} />
    </Suspense>
  </>
)
