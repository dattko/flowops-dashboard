import { queryOptions } from "@tanstack/react-query"

import { dashboardKeys } from "../constants/query-keys"
import type { DashboardPeriod } from "../model/types"
import { getDashboardSummary } from "./queries"

export function dashboardSummaryOptions(period: DashboardPeriod = "7d") {
  return queryOptions({
    queryKey: dashboardKeys.summary(period),
    queryFn: () => getDashboardSummary(period),
  })
}
