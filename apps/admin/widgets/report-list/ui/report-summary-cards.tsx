import { Ban, ChartNoAxesCombined, ReceiptText, WalletCards } from "lucide-react"

import { formatWon } from "@/shared/lib/currency"
import { Card, CardContent } from "@/shared/ui/card"
import { Typography } from "@/shared/ui/typography"

import type { SalesReportSummary } from "../model/types"

const ReportSummaryCards = ({ summary }: { summary: SalesReportSummary }) => {
  const items = [
    {
      label: "전체 주문",
      value: `${summary.totalOrders.toLocaleString()}건`,
      icon: ReceiptText,
    },
    {
      label: "전체 매출",
      value: formatWon(summary.totalRevenue),
      icon: ChartNoAxesCombined,
    },
    {
      label: "평균 주문 금액",
      value: formatWon(summary.averageOrderValue),
      icon: WalletCards,
    },
    {
      label: "취소 주문",
      value: `${summary.cancelledOrders.toLocaleString()}건`,
      icon: Ban,
    },
  ]

  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} size="sm">
          <CardContent className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <Typography variant="label" tone="muted">
                {item.label}
              </Typography>
              <Typography variant="sectionTitle" className="mt-1 truncate">
                {item.value}
              </Typography>
            </div>
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <item.icon className="size-4" aria-hidden="true" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export { ReportSummaryCards }
