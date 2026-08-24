"use client"

import type { OrderConsultationNote } from "@/entities/order"
import { baseApiFetcherClient } from "@/shared/api/base/base-fetcher-client"

export const addOrderConsultationNote = async (
  orderId: string,
  content: string
): Promise<OrderConsultationNote> => {
  return baseApiFetcherClient.post<OrderConsultationNote>(
    "/rest/v1/rpc/add_order_consultation_note",
    {
      p_order_id: orderId,
      p_content: content,
    }
  )
}
