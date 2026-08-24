import "server-only"

import type { OrderDetail } from "@/entities/order"
import { baseApiFetcherServer } from "@/shared/api/base/base-fetcher-server"

export const getOrderDetail = async (
  orderId: string
): Promise<OrderDetail | null> => {
  return baseApiFetcherServer.post<OrderDetail | null>(
    "/rest/v1/rpc/get_order_detail",
    {
      p_order_id: orderId,
    }
  )
}
