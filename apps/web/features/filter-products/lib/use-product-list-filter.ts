"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"

import {
  getProducts,
  type ProductListFilters,
  type ProductListResponse,
} from "@/entities/product"
import { useListSearchParams } from "@/shared/hooks/use-list-search-params"

import {
  DEFAULT_PRODUCT_LIST_FILTERS,
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
  const {
    searchParams,
    updateSearchParams,
    setFilterParams,
    setPage,
  } = useListSearchParams({
    defaultPage: DEFAULT_PRODUCT_LIST_FILTERS.page,
  })
  const filters = getProductListFilters(searchParams)

  const productQuery = useQuery({
    queryKey: ["products", "list", filters] as const,
    queryFn: () => getProducts(filters),
    placeholderData: keepPreviousData,
    initialData: isSameProductListFilters(filters, initialFilters)
      ? initialData
      : undefined,
  })

  const applyFilters = (nextFilters: ProductFilterFormValues) => {
    setFilterParams({
      keyword: nextFilters.keyword || null,
      category:
        nextFilters.category === DEFAULT_PRODUCT_LIST_FILTERS.category
          ? null
          : nextFilters.category,
    })
  }

  const changeSort = (nextSort: ProductSort) => {
    setFilterParams({
      sort:
        nextSort === DEFAULT_PRODUCT_LIST_FILTERS.sort ? null : nextSort,
    })
  }

  const resetFilters = () => {
    updateSearchParams({
      keyword: null,
      category: null,
      sort: null,
      page: null,
    })
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
      filters.category !== DEFAULT_PRODUCT_LIST_FILTERS.category ||
      filters.keyword !== DEFAULT_PRODUCT_LIST_FILTERS.keyword ||
      filters.sort !== DEFAULT_PRODUCT_LIST_FILTERS.sort,
    applyFilters,
    setSort: changeSort,
    setPage,
    resetFilters,
  }
}
