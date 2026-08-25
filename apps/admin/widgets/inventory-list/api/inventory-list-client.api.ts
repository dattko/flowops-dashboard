"use client"

import type { InventoryFilters } from "@/features/filter-inventory"
import { baseApiFetcherClient } from "@/shared/api/base/base-fetcher-client"

import type { InventoryListResponse } from "../model/types"

export const getInventory = async (
  filters: InventoryFilters
): Promise<InventoryListResponse> => {
  return baseApiFetcherClient.post<InventoryListResponse>(
    "/rest/v1/rpc/get_inventory",
    {
      p_page: filters.page,
      p_page_size: filters.pageSize,
      p_keyword: filters.keyword || null,
      p_stock_status:
        filters.stockStatus === "all" ? null : filters.stockStatus,
    }
  )
}
