"use client"

import { useQuery } from "@tanstack/react-query"

import { dashboardSummaryOptions } from "../api/query-options"
import type { DashboardPeriod } from "../model/types"

export function useDashboardQuery(period: DashboardPeriod = "7d") {
  return useQuery(dashboardSummaryOptions(period))
}
