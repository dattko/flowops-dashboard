import "server-only"

import { baseApiFetcherServer } from "@/shared/api/base/base-fetcher-server"

import type { CustomerDetailData } from "../model/types"

const getCustomerDetail = async (
  customerId: string
): Promise<CustomerDetailData | null> => {
  return baseApiFetcherServer.post<CustomerDetailData | null>(
    "/rest/v1/rpc/get_customer_detail",
    {
      p_customer_id: customerId,
    }
  )
}

export { getCustomerDetail }
