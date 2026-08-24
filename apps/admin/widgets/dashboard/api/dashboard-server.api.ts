import "server-only"

import { baseApiFetcherServer } from "@/shared/api/base/base-fetcher-server"

import type { DashboardData } from "../model/types"

export const getDashboard = async (): Promise<DashboardData> => {
  return baseApiFetcherServer.post<DashboardData>(
    "/rest/v1/rpc/get_dashboard_summary"
  )
}
