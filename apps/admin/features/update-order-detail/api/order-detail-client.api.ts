"use client"

import type { OrderDetail } from "@/entities/order"
import { baseApiFetcherClient } from "@/shared/api/base/base-fetcher-client"

import type { UpdateOrderDetailValues } from "../model/types"

export const updateOrderDetail = async (
  orderId: string,
  values: UpdateOrderDetailValues
): Promise<OrderDetail> => {
  return baseApiFetcherClient.post<OrderDetail>(
    "/rest/v1/rpc/update_order_detail",
    {
      p_order_id: orderId,
      p_payload: values,
    }
  )
}
