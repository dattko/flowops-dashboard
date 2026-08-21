"use client"

import { useQuery } from "@tanstack/react-query"

import { getOrdersClient } from "../api/get-orders-client"
import { orderListQueryKey } from "../model/query-keys"

export const useOrdersQuery = () => {
  return useQuery({
    queryKey: orderListQueryKey,
    queryFn: getOrdersClient,
  })
}
