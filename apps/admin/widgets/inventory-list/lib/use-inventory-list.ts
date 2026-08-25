"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"

import {
  DEFAULT_INVENTORY_FILTERS,
  INVENTORY_STOCK_STATUS_FILTER_VALUES,
} from "@/features/filter-inventory"
import type {
  InventoryFilterFormValues,
  InventoryStockStatusFilter,
} from "@/features/filter-inventory"
import { useListSearchParams } from "@/shared/lib/use-list-search-params"

import { getInventory } from "../api/inventory-list-client.api"

const getStockStatus = (value: string | null): InventoryStockStatusFilter => {
  return INVENTORY_STOCK_STATUS_FILTER_VALUES.some(
    (status) => status === value
  )
    ? (value as InventoryStockStatusFilter)
    : DEFAULT_INVENTORY_FILTERS.stockStatus
}

export const useInventoryList = () => {
  const {
    searchParams,
    page,
    pageSize,
    setFilterParams,
    setPage: setListPage,
  } = useListSearchParams()
  const filters = {
    page,
    pageSize,
    keyword: searchParams.get("keyword") ?? DEFAULT_INVENTORY_FILTERS.keyword,
    stockStatus: getStockStatus(searchParams.get("stockStatus")),
  }

  const inventoryQuery = useQuery({
    queryKey: ["inventory", "list", filters] as const,
    queryFn: () => getInventory(filters),
    placeholderData: keepPreviousData,
  })

  const applyFilters = (nextFilters: InventoryFilterFormValues) => {
    setFilterParams({
      keyword: nextFilters.keyword,
      stockStatus:
        nextFilters.stockStatus === "all" ? null : nextFilters.stockStatus,
    })
  }

  const resetFilters = () => {
    setFilterParams({
      keyword: null,
      stockStatus: null,
    })
  }

  const setPage = (nextPage: number) => {
    setListPage(nextPage)
  }

  return {
    filters,
    applyFilters,
    resetFilters,
    setPage,
    inventoryQuery,
  }
}
