import type { DashboardData } from "@/entities/dashboard"
import { Card, CardContent } from "@/shared/ui/card"
import { SectionHeading } from "@/shared/ui/section-heading"
import { Typography } from "@/shared/ui/typography"

import { WeeklyOrdersChart } from "./weekly-orders-chart"

type WeeklyOrdersCardProps = {
  weeklySales: DashboardData["weeklyRows"]
  weeklyOrderSummary: DashboardData["weeklySummary"]
  salesChannelShares: DashboardData["channelRows"]
}

const CHANNEL_COLORS: Record<string, string> = {
  smartstore: "bg-[#c96d3a]",
  own_mall: "bg-[#3c8674]",
  coupang: "bg-[#d6b76d]",
}

export const WeeklyOrdersCard = ({
  weeklySales,
  weeklyOrderSummary,
  salesChannelShares,
}: WeeklyOrdersCardProps) => {
  const { totalOrders, changeRate } = weeklyOrderSummary

  return (
    <Card className="gap-0 rounded-none border border-[#e3e0d8] bg-white py-0 shadow-[0_1px_2px_rgba(42,39,31,0.03)] ring-0">
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

      <div className="mt-6 border-t border-[#eeece6] pt-5">
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="label" tone="muted">판매 채널 비중</Typography>
          <Typography variant="label" tone="muted">총 {totalOrders}건</Typography>
        </div>
        <div className="flex h-2 overflow-hidden rounded-full bg-[#f0eee8]">
          {salesChannelShares.map((channel) => (
            <span
              key={channel.code}
              className={CHANNEL_COLORS[channel.code] ?? "bg-muted-foreground"}
              style={{ width: `${channel.share_percent}%` }}
            />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
          {salesChannelShares.map((channel) => (
            <div key={channel.code} className="type-label flex items-center gap-2 text-muted-foreground">
              <span className={`size-2 rounded-full ${CHANNEL_COLORS[channel.code] ?? "bg-muted-foreground"}`} />
              {channel.name}
              <strong className="font-semibold text-foreground">{channel.share_percent}%</strong>
            </div>
          ))}
        </div>
      </div>
      </CardContent>
    </Card>
  )
}
