import "server-only"

import type { InventoryDetail } from "@/entities/inventory"
import { baseApiFetcherServer } from "@/shared/api/base/base-fetcher-server"

const getInventoryDetail = async (
  productId: string
): Promise<InventoryDetail | null> => {
  return baseApiFetcherServer.post<InventoryDetail | null>(
    "/rest/v1/rpc/get_inventory_detail",
    {
      p_product_id: productId,
    }
  )
}

export { getInventoryDetail }
