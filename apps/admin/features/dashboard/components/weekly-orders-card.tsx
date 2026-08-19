import { Card, CardContent } from "@/components/ui/card"
import { SectionHeading } from "@/components/ui/section-heading"
import { Typography } from "@/components/ui/typography"
import { channelShare, weeklyOrders } from "@/features/dashboard/data/mock-data"
import { getTotalOrders } from "@/features/dashboard/model/mapper"

import { WeeklyOrdersChart } from "./weekly-orders-chart"

export const WeeklyOrdersCard = () => {
  const totalOrders = getTotalOrders(weeklyOrders)

  return (
    <Card className="gap-0 rounded-none border border-[#e3e0d8] bg-white py-0 shadow-[0_1px_2px_rgba(42,39,31,0.03)] ring-0">
      <CardContent className="p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <SectionHeading title="주간 주문 흐름" description="채널 통합 주문 및 매출 추이" />
        <div className="text-right">
          <Typography variant="metric">{totalOrders}건</Typography>
          <Typography variant="label" tone="success" className="mt-0.5">
            지난주 대비 9.8% 증가
          </Typography>
        </div>
      </div>

      <WeeklyOrdersChart orders={weeklyOrders} />

      <div className="mt-6 border-t border-[#eeece6] pt-5">
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="label" tone="muted">판매 채널 비중</Typography>
          <Typography variant="label" tone="muted">총 {totalOrders}건</Typography>
        </div>
        <div className="flex h-2 overflow-hidden rounded-full bg-[#f0eee8]">
          {channelShare.map((channel) => (
            <span
              key={channel.label}
              className={channel.color}
              style={{ width: `${channel.value}%` }}
            />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
          {channelShare.map((channel) => (
            <div key={channel.label} className="type-label flex items-center gap-2 text-muted-foreground">
              <span className={`size-2 rounded-full ${channel.color}`} />
              {channel.label}
              <strong className="font-semibold text-foreground">{channel.value}%</strong>
            </div>
          ))}
        </div>
      </div>
      </CardContent>
    </Card>
  )
}
