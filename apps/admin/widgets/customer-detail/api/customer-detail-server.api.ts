import "server-only"

import { cache } from "react"

import { baseApiFetcherServer } from "@/shared/api/base/base-fetcher-server"

import type { CustomerDetailData } from "../model/types"

const getCustomerDetail = cache(async (
  customerId: string
): Promise<CustomerDetailData | null> => {
  return baseApiFetcherServer.post<CustomerDetailData | null>(
    "/rest/v1/rpc/get_customer_detail",
    {
      p_customer_id: customerId,
    }
  )
})

export { getCustomerDetail }
