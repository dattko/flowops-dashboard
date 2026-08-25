"use client"

import type { InventoryDetail } from "@/entities/inventory"
import { baseApiFetcherClient } from "@/shared/api/base/base-fetcher-client"

import type { InventoryStockAdjustmentFormValues } from "../model/types"

const adjustInventoryStock = async (
  productId: string,
  values: InventoryStockAdjustmentFormValues
): Promise<InventoryDetail> => {
  return baseApiFetcherClient.post<InventoryDetail>(
    "/rest/v1/rpc/adjust_inventory_stock",
    {
      p_product_id: productId,
      p_payload: values,
    }
  )
}

export { adjustInventoryStock }
