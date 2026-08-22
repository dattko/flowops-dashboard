"use client"

import { baseApiFetcherClient } from "@/shared/api/base/base-api-fetcher-client"

import type { OrderFilters } from "@/features/filter-orders"

import type { OrderListResponse } from "../model/types"

export const getOrdersClient = async (
  filters: OrderFilters
): Promise<OrderListResponse> => {
  return baseApiFetcherClient.post<OrderListResponse>(
    "/rest/v1/rpc/get_orders",
    {
      p_page: filters.page,
      p_page_size: filters.pageSize,
      p_keyword: filters.keyword || null,
      p_status: filters.status === "all" ? null : filters.status,
    }
  )
}
