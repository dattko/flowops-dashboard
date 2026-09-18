import "server-only"

import { cache } from "react"

import { baseApiFetcherServer } from "@/shared/api/base/base-fetcher-server"

import type {
  CustomerOrderDetail,
  CustomerOrderListFilters,
  CustomerOrderListResponse,
  StorefrontOrder,
} from "../model/types"

const getStorefrontOrderServer = cache(
  async (orderNumber: string): Promise<StorefrontOrder | null> =>
    baseApiFetcherServer.post<StorefrontOrder | null>(
      "/rest/v1/rpc/get_my_storefront_order",
      { p_order_number: orderNumber },
    ),
)

const getCustomerOrdersServer = async (
  filters: CustomerOrderListFilters,
): Promise<CustomerOrderListResponse> =>
  baseApiFetcherServer.post<CustomerOrderListResponse>(
    "/rest/v1/rpc/get_my_storefront_orders",
    {
      p_page: filters.page,
      p_page_size: filters.pageSize,
    },
  )

const getCustomerOrderServer = cache(
  async (orderNumber: string): Promise<CustomerOrderDetail | null> =>
    baseApiFetcherServer.post<CustomerOrderDetail | null>(
      "/rest/v1/rpc/get_my_storefront_order_detail",
      { p_order_number: orderNumber },
    ),
)

export {
  getCustomerOrderServer,
  getCustomerOrdersServer,
  getStorefrontOrderServer,
}
