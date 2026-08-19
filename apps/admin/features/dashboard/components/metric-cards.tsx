import {
  ArrowDownRight,
  ArrowUpRight,
  CircleAlert,
  PackageCheck,
  ShoppingBag,
  WalletCards,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Typography } from "@/components/ui/typography"
import { metrics } from "@/features/dashboard/data/mock-data"

const metricIcons = {
  orders: ShoppingBag,
  pending: PackageCheck,
  revenue: WalletCards,
  stock: CircleAlert,
}

export const MetricCards = () => {
  return (
    <section className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="오늘의 핵심 지표">
      {metrics.map((metric) => {
        const Icon = metricIcons[metric.icon]
        const isWarning = metric.trend === "warning"
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
                    isWarning ? "text-warning" : "text-success"
                  }`}
                >
                  {!isWarning && <TrendIcon className="size-3.5" aria-hidden="true" />}
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
