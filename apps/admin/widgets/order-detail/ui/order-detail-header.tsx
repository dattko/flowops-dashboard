import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import {
  ORDER_STATUS_CLASS_NAMES,
  ORDER_STATUS_LABELS,
  type OrderDetail,
} from "@/entities/order"
import { formatDateTime } from "@/shared/lib/dayjs"
import { buttonVariants } from "@/shared/ui/button"
import { StatusBadge } from "@/shared/ui/status-badge"
import { Typography } from "@/shared/ui/typography"

export const OrderDetailHeader = ({ order }: { order: OrderDetail }) => {
  return (
    <>
      <Link
        href="/order"
        className={buttonVariants({
          variant: "ghost",
          size: "sm",
          className: "-ml-3 mb-4 text-muted-foreground",
        })}
      >
        <ArrowLeft aria-hidden="true" />
        주문 목록
      </Link>

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <Typography as="h1" id="order-detail-title" variant="pageTitle">
              {order.orderNumber}
            </Typography>
            <StatusBadge className={ORDER_STATUS_CLASS_NAMES[order.status]}>
              {ORDER_STATUS_LABELS[order.status]}
            </StatusBadge>
          </div>
          <Typography variant="body" tone="muted" className="mt-2">
            {formatDateTime(order.orderedAt)} 주문 · {order.salesChannel}
          </Typography>
        </div>
        <Typography variant="label" tone="muted">
          최근 수정 {formatDateTime(order.updatedAt)}
        </Typography>
      </div>
    </>
  )
}
