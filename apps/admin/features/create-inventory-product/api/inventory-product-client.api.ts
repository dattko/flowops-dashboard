"use client"

import type { InventoryDetail } from "@/entities/inventory"
import { baseApiFetcherClient } from "@/shared/api/base/base-fetcher-client"

import type { InventoryProductCreateFormValues } from "../model/types"

const createInventoryProduct = async (
  values: InventoryProductCreateFormValues
): Promise<InventoryDetail> => {
  return baseApiFetcherClient.post<InventoryDetail>(
    "/rest/v1/rpc/create_inventory_product",
    {
      p_payload: values,
    }
  )
}

export { createInventoryProduct }
