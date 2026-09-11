import "server-only"

import { cache } from "react"

import { baseApiFetcherServer } from "@/shared/api/base/base-fetcher-server"

import { createProductListPayload } from "./product-api.utils"
import type {
  Product,
  ProductListFilters,
  ProductListResponse,
} from "../model/types"

export const getProductsServer = async (
  filters: ProductListFilters,
): Promise<ProductListResponse> => {
  return baseApiFetcherServer.public.post<ProductListResponse>(
    "/rest/v1/rpc/get_storefront_products",
    createProductListPayload(filters),
  )
}

export const getProductServer = cache(
  async (slug: string): Promise<Product | null> => {
    return baseApiFetcherServer.public.post<Product | null>(
      "/rest/v1/rpc/get_storefront_product_detail",
      { p_slug: slug },
    )
  },
)
