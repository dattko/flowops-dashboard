"use client"

import type { CustomerFilters } from "@/features/filter-customers"
import { baseApiFetcherClient } from "@/shared/api/base/base-fetcher-client"

import type { CustomerListResponse } from "../model/types"

const getCustomers = async (
  filters: CustomerFilters
): Promise<CustomerListResponse> => {
  return baseApiFetcherClient.post<CustomerListResponse>(
    "/rest/v1/rpc/get_customers",
    {
      p_page: filters.page,
      p_page_size: filters.pageSize,
      p_keyword: filters.keyword || null,
      p_status: filters.status === "all" ? null : filters.status,
    }
  )
}

export { getCustomers }
