import {
  ArrowDownRight,
  ArrowUpRight,
  CircleAlert,
  PackageCheck,
  ShoppingBag,
  WalletCards,
} from "lucide-react"

import type { DashboardData } from "@/entities/dashboard"
import { Card, CardContent } from "@/shared/ui/card"
import { Typography } from "@/shared/ui/typography"

const metricIcons = {
  orders: ShoppingBag,
  pending: PackageCheck,
  revenue: WalletCards,
  stock: CircleAlert,
}

type MetricCardsProps = {
  todayOrderSummary: DashboardData["todaySummary"]
  inventoryRiskSummary: DashboardData["inventorySummary"]
}

const wonFormatter = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
  maximumFractionDigits: 0,
})

const formatChangeRate = (rate: number | null) => {
  return rate === null ? "비교 데이터 없음" : `${rate > 0 ? "+" : ""}${rate}%`
}

export const MetricCards = ({
  todayOrderSummary,
  inventoryRiskSummary,
}: MetricCardsProps) => {
  const metrics = [
    {
      label: "오늘 주문",
      value: `${todayOrderSummary.totalOrders.toLocaleString()}건`,
      change: formatChangeRate(todayOrderSummary.orderChangeRate),
      detail: "어제 대비",
      trend:
        todayOrderSummary.orderChangeRate === null || todayOrderSummary.orderChangeRate === 0
          ? "neutral"
          : todayOrderSummary.orderChangeRate > 0
            ? "up"
            : "down",
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
      value: wonFormatter.format(todayOrderSummary.todayRevenue),
      change: formatChangeRate(todayOrderSummary.revenueChangeRate),
      detail: "어제 대비",
      trend:
        todayOrderSummary.revenueChangeRate === null || todayOrderSummary.revenueChangeRate === 0
          ? "neutral"
          : todayOrderSummary.revenueChangeRate > 0
            ? "up"
            : "down",
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
  ] as const

  return (
    <section className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="오늘의 핵심 지표">
      {metrics.map((metric) => {
        const Icon = metricIcons[metric.icon]
        const isWarning = metric.trend === "warning"
        const isNeutral = metric.trend === "neutral"
        const TrendIcon = metric.trend === "down" ? ArrowDownRight : ArrowUpRight

        return (
          <Card
            key={metric.label}
            className="gap-0 rounded-none border border-[#e3e0d8] bg-white py-0 shadow-[0_1px_2px_rgba(42,39,31,0.03)] ring-0"
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <Typography variant="body" tone="muted" className="font-medium">
                    {metric.label}
                  </Typography>
                  <Typography variant="metric" className="mt-3">
                    {metric.value}
                  </Typography>
                </div>
                <div
                  className={`grid size-10 place-items-center rounded-xl ${
                    isWarning ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="size-[18px]" aria-hidden="true" />
                </div>
              </div>
              <div className="type-label mt-4 flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-0.5 font-semibold ${
                    isWarning
                      ? "text-warning"
                      : isNeutral
                        ? "text-muted-foreground"
                        : "text-success"
                  }`}
                >
                  {!isWarning && !isNeutral && (
                    <TrendIcon className="size-3.5" aria-hidden="true" />
                  )}
                  {metric.change}
                </span>
                <span className="text-muted-foreground">{metric.detail}</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </section>
  )
}
