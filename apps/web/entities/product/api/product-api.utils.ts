import type { ProductListFilters } from "../model/types"

export const createProductListPayload = (filters: ProductListFilters) => ({
  p_page: filters.page,
  p_page_size: filters.pageSize,
  p_keyword: filters.keyword || null,
  p_category: filters.category === "all" ? null : filters.category,
  p_sort: filters.sort,
})
