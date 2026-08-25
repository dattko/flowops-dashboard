"use client"

import type { InventoryDetail } from "@/entities/inventory"
import { baseApiFetcherClient } from "@/shared/api/base/base-fetcher-client"

import type { InventoryProductUpdateFormValues } from "../model/types"

const updateInventoryProduct = async (
  productId: string,
  values: InventoryProductUpdateFormValues
): Promise<InventoryDetail> => {
  return baseApiFetcherClient.post<InventoryDetail>(
    "/rest/v1/rpc/update_inventory_product",
    {
      p_product_id: productId,
      p_payload: values,
    }
  )
}

export { updateInventoryProduct }
