import Link from "next/link"
import { ArrowRight, ShoppingBag } from "lucide-react"

import { OrderStatusBadge } from "@/entities/order"
import { formatWon } from "@/shared/lib/currency"
import { formatDateTime } from "@/shared/lib/dayjs"
import { buttonVariants } from "@/shared/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"

import type { CustomerRecentOrder } from "../model/types"

const CustomerRecentOrders = ({
  orders,
}: {
  orders: CustomerRecentOrder[]
}) => {
  return (
    <Card className="gap-0 py-0">
      <CardHeader className="border-b py-5">
        <div className="flex items-center gap-2">
          <ShoppingBag className="size-4 text-primary" aria-hidden="true" />
          <CardTitle>최근 주문</CardTitle>
        </div>
        <CardDescription>최근 주문 내역을 최대 10건 표시합니다.</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {orders.length > 0 ? (
          <Table className="min-w-[720px] text-sm">
            <TableHeader className="bg-muted/45 text-xs text-muted-foreground">
              <TableRow>
                <TableHead className="px-5">주문번호</TableHead>
                <TableHead>주문일</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="text-right">결제 금액</TableHead>
                <TableHead className="px-5 text-right">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="px-5 py-4 font-semibold">
                    {order.orderNumber}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDateTime(order.orderedAt)}
                  </TableCell>
                  <TableCell>
                    <OrderStatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatWon(order.totalAmount)}
                  </TableCell>
                  <TableCell className="px-5 text-right">
                    <Link
                      href={`/order/${order.id}`}
                      className={buttonVariants({
                        variant: "outline",
                        size: "sm",
                      })}
                    >
                      주문 상세
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="px-5 py-12 text-center text-sm text-muted-foreground">
            아직 주문 내역이 없습니다.
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export { CustomerRecentOrders }
