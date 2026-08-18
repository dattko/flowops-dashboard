import type { DashboardPeriod } from "../model/types"

export const dashboardKeys = {
  all: ["dashboard"] as const,
  summary: (period: DashboardPeriod) => [...dashboardKeys.all, "summary", period] as const,
}
