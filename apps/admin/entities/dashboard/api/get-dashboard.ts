import "server-only"

import { baseApiFetcherServer } from "@/shared/api/base/base-api-fetcher-server"

import type { DashboardData } from "../model/types"

export const getDashboard = async (): Promise<DashboardData> => {
  return baseApiFetcherServer.post<DashboardData, Record<string, never>>(
    "/rest/v1/rpc/get_dashboard_summary",
    {}
  )
}
