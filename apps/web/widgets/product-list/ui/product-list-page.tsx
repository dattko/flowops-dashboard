"use client"

import { ProductCard } from "@/entities/product"
import type { ProductListFilters, ProductListResponse } from "@/entities/product"
import {
  ProductListFilter,
  ProductListSort,
  useProductListFilter,
} from "@/features/filter-products"
import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import { Pagination } from "@/shared/ui/pagination"
import { Typography } from "@/shared/ui/typography"

type ProductListPageProps = {
  initialData?: ProductListResponse
  initialFilters: ProductListFilters
}

export const ProductListPage = ({
  initialData,
  initialFilters,
}: ProductListPageProps) => {
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
      <section className="relative overflow-hidden bg-cream px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="absolute -right-32 -top-56 size-[36rem] rounded-full border-[7rem] border-paper/50" />
        <div className="absolute -bottom-44 left-[8%] size-64 rounded-full border-[4rem] border-[#e6d5bd]/70" />
        <div className="relative mx-auto max-w-[90rem]">
          <Typography variant="overline" tone="brand">
            MORROW COLLECTION
          </Typography>
          <Typography as="h1" variant="display" className="mt-4 max-w-3xl">
            오늘의 취향을 발견하는
            <br />
            가장 맛있는 방법<span className="text-coral">.</span>
          </Typography>
          <Typography variant="bodyLarge" tone="muted" className="mt-6 max-w-xl">
            매주 신선하게 로스팅한 원두부터 간편하게 즐기는 드립백까지,
            내 리듬에 맞는 커피를 골라보세요.
          </Typography>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-[90rem]">
          <ProductListFilter
            filters={filters}
            hasActiveFilters={hasActiveFilters}
            onSubmitFilters={applyFilters}
            onResetFilters={resetFilters}
          />

          <div className="relative flex items-center justify-between py-7">
            {isFetching && !isPending ? (
              <div className="absolute inset-x-0 top-0 h-0.5 overflow-hidden bg-coffee/10">
                <div className="h-full w-1/3 animate-pulse bg-coffee" />
              </div>
            ) : null}
            <p className="text-sm text-ink/55" aria-live="polite">
              총 <strong className="font-semibold text-ink">{data?.totalCount ?? 0}</strong>개 상품
            </p>
            <ProductListSort value={sort} onValueChange={setSort} />
          </div>

          {isPending ? (
            <div className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }, (_, index) => (
                <div key={index} aria-hidden="true">
                  <div className="aspect-[0.94] animate-pulse rounded-[1.5rem] bg-cream/65" />
                  <div className="mt-5 h-4 w-2/3 animate-pulse rounded-full bg-cream" />
                  <div className="mt-3 h-3 w-full animate-pulse rounded-full bg-cream/70" />
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="grid min-h-80 place-items-center rounded-[1.5rem] bg-cream/55 px-6 text-center">
              <div>
                <p className="text-lg font-semibold">상품을 불러오지 못했어요.</p>
                <p className="mt-2 text-sm text-ink/55">
                  잠시 후 다시 시도해 주세요.
                </p>
                <Button type="button" variant="outline" className="mt-6" onClick={() => refetch()}>
                  다시 불러오기
                </Button>
              </div>
            </div>
          ) : products.length > 0 ? (
            <div
              className={cn(
                "grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
              )}
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="grid min-h-80 place-items-center rounded-[1.5rem] bg-cream/55 px-6 text-center">
              <div>
                <p className="text-lg font-semibold">찾는 상품이 없어요.</p>
                <p className="mt-2 text-sm text-ink/55">
                  다른 검색어나 카테고리를 선택해 보세요.
                </p>
                <Button type="button" variant="outline" className="mt-6" onClick={resetFilters}>
                  전체 상품 보기
                </Button>
              </div>
            </div>
          )}

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
