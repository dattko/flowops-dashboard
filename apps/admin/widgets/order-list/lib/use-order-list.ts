"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"

import {
  DEFAULT_ORDER_FILTERS,
  ORDER_STATUS_FILTER_VALUES,
} from "@/features/filter-orders"
import type {
  OrderFilterFormValues,
  OrderStatusFilter,
} from "@/features/filter-orders"
import { useListSearchParams } from "@/shared/lib/use-list-search-params"

import { getOrders } from "../api/order-list-client.api"

const getStatus = (value: string | null): OrderStatusFilter => {
  return ORDER_STATUS_FILTER_VALUES.some((status) => status === value)
    ? (value as OrderStatusFilter)
    : DEFAULT_ORDER_FILTERS.status
}

export const useOrderList = () => {
  const { searchParams, page, pageSize, setFilterParams, setPage } =
    useListSearchParams()
  const filters = {
    page,
    pageSize,
    keyword: searchParams.get("keyword") ?? DEFAULT_ORDER_FILTERS.keyword,
    status: getStatus(searchParams.get("status")),
  }

  const ordersQuery = useQuery({
    queryKey: ["orders", "list", filters] as const,
    queryFn: () => getOrders(filters),
    placeholderData: keepPreviousData,
  })

  const applyFilters = (nextFilters: OrderFilterFormValues) => {
    setFilterParams({
      keyword: nextFilters.keyword,
      status: nextFilters.status === "all" ? null : nextFilters.status,
    })
  }

  const resetFilters = () => {
    setFilterParams({
      keyword: null,
      status: null,
    })
  }

  return {
    filters,
    applyFilters,
    setPage,
    resetFilters,
    ordersQuery,
  }
}
