import "server-only"

import { baseApiFetcherServer } from "@/shared/api/base/base-fetcher-server"

import { createProductListPayload } from "./product-api.utils"
import type { ProductListFilters, ProductListResponse } from "../model/types"

export const getProductsServer = async (
  filters: ProductListFilters,
): Promise<ProductListResponse> => {
  return baseApiFetcherServer.public.post<ProductListResponse>(
    "/rest/v1/rpc/get_storefront_products",
    createProductListPayload(filters),
  )
}
