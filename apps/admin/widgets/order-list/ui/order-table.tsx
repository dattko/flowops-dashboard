import {
  ORDER_STATUS_CLASS_NAMES,
  ORDER_STATUS_LABELS,
} from "@/entities/order"
import { formatWon } from "@/shared/lib/currency"
import { dayjs } from "@/shared/lib/dayjs"
import { StatusBadge } from "@/shared/ui/status-badge"

import type { OrderListItem } from "../model/types"

type OrderTableProps = {
  orders: readonly OrderListItem[]
}

export const OrderTable = ({ orders }: OrderTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[860px] text-left">
        <thead>
          <tr className="type-caption border-b border-[#eeece6] bg-[#faf9f6] font-medium text-muted-foreground">
            <th className="px-6 py-3 font-medium">주문번호</th>
            <th className="px-4 py-3 font-medium">주문일시</th>
            <th className="px-4 py-3 font-medium">고객</th>
            <th className="px-4 py-3 font-medium">상품</th>
            <th className="px-4 py-3 font-medium">결제금액</th>
            <th className="px-6 py-3 font-medium">상태</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f0eee8]">
          {orders.map((order) => (
            <tr
              key={order.id}
              className="type-label transition-colors hover:bg-[#faf9f6]"
            >
              <td className="px-6 py-3.5 font-medium text-foreground">
                {order.orderNumber}
              </td>
              <td className="px-4 py-3.5 text-muted-foreground">
                {dayjs(order.orderedAt).tz().format("YYYY.MM.DD HH:mm")}
              </td>
              <td className="px-4 py-3.5">
                <div className="font-semibold text-foreground">
                  {order.customerName}
                </div>
                <div className="mt-0.5 text-muted-foreground">
                  {order.customerEmail ?? "이메일 없음"}
                </div>
              </td>
              <td className="px-4 py-3.5 text-muted-foreground">
                {order.itemCount}종 · 총 {order.totalQuantity}개
              </td>
              <td className="px-4 py-3.5 font-semibold text-foreground">
                {formatWon(order.totalAmount)}
              </td>
              <td className="px-6 py-3.5">
                <StatusBadge
                  className={ORDER_STATUS_CLASS_NAMES[order.status]}
                >
                  {ORDER_STATUS_LABELS[order.status]}
                </StatusBadge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
