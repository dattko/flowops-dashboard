import { ChevronRight, SlidersHorizontal } from "lucide-react"

import type { RecentOrder } from "@/entities/dashboard"
import { ORDER_STATUS } from "@/widgets/dashboard/config/order-status"
import { formatWon } from "@/shared/lib/currency"
import { dayjs } from "@/shared/lib/dayjs"
import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"
import { SectionHeading } from "@/shared/ui/section-heading"
import { StatusBadge } from "@/shared/ui/status-badge"

type RecentOrdersTableProps = {
  recentOrders: readonly RecentOrder[]
}

const getProductSummary = (items: RecentOrder["order_items"]) => {
  const firstItem = items[0]

  if (!firstItem) return "상품 정보 없음"

  return items.length > 1
    ? `${firstItem.product_name} 외 ${items.length - 1}건`
    : firstItem.product_name
}



export const RecentOrdersTable = ({ recentOrders }: RecentOrdersTableProps) => {
  console.log(recentOrders)
  return (
    <Card className="mt-4 gap-0 rounded-none border border-[#e3e0d8] bg-white py-0 shadow-[0_1px_2px_rgba(42,39,31,0.03)] ring-0">
      <CardContent className="p-0">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ebe8e1] px-5 py-4 sm:px-6">
        <SectionHeading title="최근 주문" description="실시간으로 들어온 최신 주문입니다." />
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-[#dedbd2] bg-white text-foreground shadow-none"
          >
            <SlidersHorizontal aria-hidden="true" />
            필터
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            전체 보기
            <ChevronRight aria-hidden="true" />
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[780px] text-left">
          <thead>
            <tr className="type-caption border-b border-[#eeece6] bg-[#faf9f6] font-medium text-muted-foreground">
              <th className="px-6 py-3 font-medium">주문번호</th>
              <th className="px-4 py-3 font-medium">고객</th>
              <th className="px-4 py-3 font-medium">상품</th>
              <th className="px-4 py-3 font-medium">결제금액</th>
              <th className="px-4 py-3 font-medium">상태</th>
              <th className="px-6 py-3 text-right font-medium">주문시간</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0eee8]">
            {recentOrders.map((order) => (
              <tr key={order.order_number} className="type-label transition-colors hover:bg-[#faf9f6]">
                <td className="px-6 py-3.5 font-medium text-muted-foreground">{order.order_number}</td>
                <td className="px-4 py-3.5 font-semibold text-foreground">{order.customer_name}</td>
                <td className="max-w-[260px] truncate px-4 py-3.5 text-muted-foreground">{getProductSummary(order.order_items)}</td>
                <td className="px-4 py-3.5 font-semibold text-foreground">{formatWon(order.total_amount)}</td>
                <td className="px-4 py-3.5">
                  <StatusBadge className={ORDER_STATUS[order.status]?.className}>
                    {ORDER_STATUS[order.status]?.label ?? order.status}
                  </StatusBadge>
                </td>
                <td className="px-6 py-3.5 text-right text-muted-foreground">
                  {dayjs(order.ordered_at).format("HH:mm")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </CardContent>
    </Card>
  )
}
