import type { ProductListFilters } from "@/entities/product"

import type { ProductCategoryFilter, ProductSort } from "./types"

type SearchParamReader = {
  get: (name: string) => string | null
}

const PRODUCT_CATEGORY_FILTERS: ProductCategoryFilter[] = [
  "whole-bean",
  "drip-bag",
  "capsule",
  "cold-brew",
  "gear",
]

const PRODUCT_SORTS: ProductSort[] = [
  "price-asc",
  "price-desc",
  "name",
]

export const getProductListFilters = (
  searchParams: SearchParamReader,
): ProductListFilters => {
  const pageParam = Number(searchParams.get("page"))
  const categoryParam = searchParams.get("category")
  const sortParam = searchParams.get("sort")

  return {
    page: Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1,
    pageSize: 24,
    keyword: searchParams.get("keyword")?.trim() ?? "",
    category: PRODUCT_CATEGORY_FILTERS.includes(
      categoryParam as ProductCategoryFilter,
    )
      ? (categoryParam as ProductCategoryFilter)
      : "all",
    sort: PRODUCT_SORTS.includes(sortParam as ProductSort)
      ? (sortParam as ProductSort)
      : "featured",
  }
}

export const isSameProductListFilters = (
  first: ProductListFilters,
  second: ProductListFilters,
) =>
  first.page === second.page &&
  first.pageSize === second.pageSize &&
  first.keyword === second.keyword &&
  first.category === second.category &&
  first.sort === second.sort
