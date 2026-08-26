"use client"

import type { CustomerProfile } from "@/entities/customer"
import { baseApiFetcherClient } from "@/shared/api/base/base-fetcher-client"

import type { CustomerUpdateFormValues } from "../model/types"

const updateCustomer = async (
  customerId: string,
  values: CustomerUpdateFormValues
): Promise<CustomerProfile> => {
  return baseApiFetcherClient.post<CustomerProfile>(
    "/rest/v1/rpc/update_customer",
    {
      p_customer_id: customerId,
      p_payload: {
        ...values,
        phone: values.phone || null,
        memo: values.memo || null,
      },
    }
  )
}

export { updateCustomer }
