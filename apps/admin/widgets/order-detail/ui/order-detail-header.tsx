import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import {
  OrderStatusBadge,
  type OrderDetail,
} from "@/entities/order"
import { ROUTES } from "@/shared/config/routes"
import { formatDateTime } from "@/shared/lib/dayjs"
import { buttonVariants } from "@/shared/ui/button"
import { PageHeader } from "@/shared/ui/page-header"
import { Typography } from "@/shared/ui/typography"

export const OrderDetailHeader = ({ order }: { order: OrderDetail }) => {
  return (
    <>
      <Link
        href={ROUTES.orders.list}
        className={buttonVariants({
          variant: "ghost",
          size: "sm",
          className: "-ml-3 mb-4 text-muted-foreground",
        })}
      >
        <ArrowLeft aria-hidden="true" />
        주문 목록
      </Link>

      <PageHeader
        titleId="order-detail-title"
        title={order.orderNumber}
        titleAccessory={<OrderStatusBadge status={order.status} />}
        description={`${formatDateTime(order.orderedAt)} 주문 · ${order.salesChannel}`}
        actions={
          <Typography variant="label" tone="muted">
            최근 수정 {formatDateTime(order.updatedAt)}
          </Typography>
        }
      />
    </>
  )
}
