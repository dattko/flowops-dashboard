import { ChevronRight, SlidersHorizontal } from "lucide-react"

import { OrderStatusBadge } from "@/entities/order"

import { formatWon } from "@/shared/lib/currency"
import { dayjs } from "@/shared/lib/dayjs"
import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"
import { SectionHeading } from "@/shared/ui/section-heading"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"

import { useRecentOrders } from "../lib/use-recent-orders"
import type { RecentOrder } from "../model/types"

type RecentOrdersTableProps = {
  recentOrders: readonly RecentOrder[]
}

export const RecentOrdersTable = ({ recentOrders }: RecentOrdersTableProps) => {
  const orders = useRecentOrders(recentOrders)

  return (
    <Card appearance="panel" className="mt-4">
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
      <Table className="min-w-[780px]">
        <TableHeader>
          <TableRow className="type-caption border-b border-[#eeece6] bg-[#faf9f6] font-medium text-muted-foreground">
            <TableHead className="px-6">주문번호</TableHead>
            <TableHead>고객</TableHead>
            <TableHead>상품</TableHead>
            <TableHead>결제금액</TableHead>
            <TableHead>상태</TableHead>
            <TableHead className="px-6 text-right">주문시간</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-[#f0eee8]">
          {orders.map((order) => (
            <TableRow
              key={order.order_number}
              className="type-label hover:bg-[#faf9f6]"
            >
              <TableCell className="px-6 font-medium text-muted-foreground">
                {order.order_number}
              </TableCell>
              <TableCell className="font-semibold text-foreground">
                {order.customer_name}
              </TableCell>
              <TableCell className="max-w-[260px] truncate text-muted-foreground">
                {order.productSummary}
              </TableCell>
              <TableCell className="font-semibold text-foreground">
                {formatWon(order.total_amount)}
              </TableCell>
              <TableCell>
                  <OrderStatusBadge status={order.status} />
              </TableCell>
              <TableCell className="px-6 text-right text-muted-foreground">
                {dayjs(order.ordered_at).format("HH:mm")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </CardContent>
    </Card>
  )
}
