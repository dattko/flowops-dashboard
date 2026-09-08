"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

import {
  getProducts,
  type ProductListFilters,
  type ProductListResponse,
} from "@/entities/product"

import {
  getProductListFilters,
  isSameProductListFilters,
} from "../model/product-filter-params"
import type { ProductFilterFormValues, ProductSort } from "../model/types"

type UseProductListFilterParams = {
  initialData?: ProductListResponse
  initialFilters: ProductListFilters
}

export const useProductListFilter = ({
  initialData,
  initialFilters,
}: UseProductListFilterParams) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const filters = getProductListFilters(searchParams)

  const updateSearchParams = useCallback(
    (
      updates: Record<string, string | null>,
      history: "push" | "replace" = "push",
    ) => {
      const nextSearchParams = new URLSearchParams(searchParams.toString())

      Object.entries(updates).forEach(([key, value]) => {
        if (value) nextSearchParams.set(key, value)
        else nextSearchParams.delete(key)
      })

      const query = nextSearchParams.toString()
      router[history](query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      })
    },
    [pathname, router, searchParams],
  )

  const productQuery = useQuery({
    queryKey: ["products", "list", filters] as const,
    queryFn: () => getProducts(filters),
    placeholderData: keepPreviousData,
    initialData: isSameProductListFilters(filters, initialFilters)
      ? initialData
      : undefined,
  })

  const applyFilters = (nextFilters: ProductFilterFormValues) => {
    updateSearchParams({
      keyword: nextFilters.keyword || null,
      category:
        nextFilters.category === "all" ? null : nextFilters.category,
      page: null,
    })
  }

  const changeSort = (nextSort: ProductSort) => {
    updateSearchParams({
      sort: nextSort === "featured" ? null : nextSort,
      page: null,
    })
  }

  const changePage = (nextPage: number) => {
    updateSearchParams({ page: nextPage <= 1 ? null : String(nextPage) })
  }

  const resetFilters = () => {
    router.push(pathname, { scroll: false })
  }

  return {
    filters: {
      category: filters.category,
      keyword: filters.keyword,
    },
    sort: filters.sort,
    page: filters.page,
    productQuery,
    hasActiveFilters:
      filters.category !== "all" ||
      filters.keyword.length > 0 ||
      filters.sort !== "featured",
    applyFilters,
    setSort: changeSort,
    setPage: changePage,
    resetFilters,
  }
}
