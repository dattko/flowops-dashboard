import type { DashboardData } from "../model/types"
import { Card, CardContent } from "@/shared/ui/card"
import { SectionHeading } from "@/shared/ui/section-heading"
import { Typography } from "@/shared/ui/typography"

import { WeeklyOrdersChart } from "./weekly-orders-chart"

type WeeklyOrdersCardProps = {
  weeklySales: DashboardData["weeklyRows"]
  weeklyOrderSummary: DashboardData["weeklySummary"]
}

export const WeeklyOrdersCard = ({
  weeklySales,
  weeklyOrderSummary,
}: WeeklyOrdersCardProps) => {
  const { totalOrders, changeRate } = weeklyOrderSummary

  return (
    <Card appearance="panel">
      <CardContent className="p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <SectionHeading title="주간 주문 흐름" description="채널 통합 주문 및 매출 추이" />
        <div className="text-right">
          <Typography variant="metric">{totalOrders}건</Typography>
          <Typography
            variant="label"
            tone={changeRate !== null && changeRate < 0 ? "muted" : "success"}
            className="mt-0.5"
          >
            {changeRate === null
              ? "지난주 비교 데이터 없음"
              : `지난주 대비 ${changeRate > 0 ? "+" : ""}${changeRate}%`}
          </Typography>
        </div>
      </div>

      <WeeklyOrdersChart weeklySales={weeklySales} />
      </CardContent>
    </Card>
  )
}
