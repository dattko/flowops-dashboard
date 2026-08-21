"use client"

import { baseApiFetcherClient } from "@/shared/api/base/base-api-fetcher-client"

import type { OrderListItem } from "../model/types"

export const getOrdersClient = async (): Promise<OrderListItem[]> => {
  return baseApiFetcherClient.post<OrderListItem[]>("/rest/v1/rpc/get_orders")
}
