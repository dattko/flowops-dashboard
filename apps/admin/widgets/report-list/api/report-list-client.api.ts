"use client"

import type { ReportFilters } from "@/features/filter-reports"
import { baseApiFetcherClient } from "@/shared/api/base/base-fetcher-client"

import type { SalesReportResponse } from "../model/types"

const getSalesReport = async (
  filters: ReportFilters
): Promise<SalesReportResponse> => {
  return baseApiFetcherClient.post<SalesReportResponse>(
    "/rest/v1/rpc/get_sales_report",
    {
      p_date_from: filters.dateFrom,
      p_date_to: filters.dateTo,
    }
  )
}

export { getSalesReport }
