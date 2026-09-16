import "server-only"

import { cache } from "react"

import { baseApiFetcherServer } from "@/shared/api/base/base-fetcher-server"

import type { StorefrontOrder } from "../model/types"

const getStorefrontOrderServer = cache(
  async (orderNumber: string): Promise<StorefrontOrder | null> =>
    baseApiFetcherServer.post<StorefrontOrder | null>(
      "/rest/v1/rpc/get_my_storefront_order",
      { p_order_number: orderNumber },
    ),
)

export { getStorefrontOrderServer }
