"use client"

import { baseApiFetcherClient } from "@/shared/api/base/base-fetcher-client"

import { createProductListPayload } from "./product-api.utils"
import type { ProductListFilters, ProductListResponse } from "../model/types"

export const getProducts = async (
  filters: ProductListFilters,
): Promise<ProductListResponse> => {
  return baseApiFetcherClient.post<ProductListResponse>(
    "/rest/v1/rpc/get_storefront_products",
    createProductListPayload(filters),
  )
}
