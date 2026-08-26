import { CalendarClock, ShoppingBag, WalletCards } from "lucide-react"

import { formatWon } from "@/shared/lib/currency"
import { formatDateTime } from "@/shared/lib/dayjs"
import { Card, CardContent } from "@/shared/ui/card"
import { Typography } from "@/shared/ui/typography"

import type { CustomerOrderSummary } from "../model/types"

const CustomerSummary = ({ summary }: { summary: CustomerOrderSummary }) => {
  const items = [
    {
      label: "누적 주문",
      value: `${summary.totalOrders.toLocaleString()}건`,
      icon: ShoppingBag,
    },
    {
      label: "누적 구매 금액",
      value: formatWon(summary.totalSpent),
      icon: WalletCards,
    },
    {
      label: "최근 주문",
      value: formatDateTime(summary.lastOrderedAt),
      icon: CalendarClock,
    },
  ]

  return (
    <div className="mt-6 grid gap-3 md:grid-cols-3">
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

export { CustomerSummary }
