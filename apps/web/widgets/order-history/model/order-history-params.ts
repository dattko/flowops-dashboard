import type { CustomerOrderListFilters } from "@/entities/order"

const DEFAULT_ORDER_HISTORY_FILTERS : CustomerOrderListFilters = {
  page: 1,
  pageSize: 10,
} 

const getOrderHistoryFilters = (pageValue?: string | string[]) => {
  const normalizedValue = Array.isArray(pageValue) ? pageValue[0] : pageValue
  const page = Number(normalizedValue)

  return {
    ...DEFAULT_ORDER_HISTORY_FILTERS,
    page:
      Number.isInteger(page) && page > 0
        ? page
        : DEFAULT_ORDER_HISTORY_FILTERS.page,
  }
}

export { DEFAULT_ORDER_HISTORY_FILTERS, getOrderHistoryFilters }
