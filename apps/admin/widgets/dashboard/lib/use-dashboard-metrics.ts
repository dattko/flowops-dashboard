import { formatWon } from "@/shared/lib/currency"

import type { DashboardData } from "../model/types"

export type DashboardMetric = {
  label: string
  value: string
  change: string
  detail: string
  trend: "up" | "down" | "warning" | "neutral"
  icon: "orders" | "pending" | "revenue" | "stock"
}

const formatChangeRate = (rate: number | null) => {
  return rate === null ? "비교 데이터 없음" : `${rate > 0 ? "+" : ""}${rate}%`
}

const getChangeTrend = (rate: number | null): DashboardMetric["trend"] => {
  if (rate === null || rate === 0) return "neutral"
  return rate > 0 ? "up" : "down"
}

export const useDashboardMetrics = (
  todayOrderSummary: DashboardData["todaySummary"],
  inventoryRiskSummary: DashboardData["inventorySummary"]
): DashboardMetric[] => [
  {
    label: "오늘 주문",
    value: `${todayOrderSummary.totalOrders.toLocaleString()}건`,
    change: formatChangeRate(todayOrderSummary.orderChangeRate),
    detail: "어제 대비",
    trend: getChangeTrend(todayOrderSummary.orderChangeRate),
    icon: "orders",
  },
  {
    label: "처리 대기",
    value: `${todayOrderSummary.pendingCount.toLocaleString()}건`,
    change: `${todayOrderSummary.pendingChangeCount > 0 ? "+" : ""}${todayOrderSummary.pendingChangeCount}건`,
    detail: "어제 대비",
    trend:
      todayOrderSummary.pendingChangeCount > 0
        ? "warning"
        : todayOrderSummary.pendingChangeCount < 0
          ? "down"
          : "neutral",
    icon: "pending",
  },
  {
    label: "오늘 매출",
    value: formatWon(todayOrderSummary.todayRevenue),
    change: formatChangeRate(todayOrderSummary.revenueChangeRate),
    detail: "어제 대비",
    trend: getChangeTrend(todayOrderSummary.revenueChangeRate),
    icon: "revenue",
  },
  {
    label: "재고 위험",
    value: `${inventoryRiskSummary.riskCount} SKU`,
    change: "확인 필요",
    detail: `품절 ${inventoryRiskSummary.soldOutCount} · 부족 ${inventoryRiskSummary.riskCount - inventoryRiskSummary.soldOutCount}`,
    trend: inventoryRiskSummary.riskCount > 0 ? "warning" : "neutral",
    icon: "stock",
  },
]
