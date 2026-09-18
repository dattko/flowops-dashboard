import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { OrderStatusBadge, type CustomerOrderDetail } from "@/entities/order"
import { ROUTES } from "@/shared/config/routes"
import { formatKoreanDateTime } from "@/shared/lib/date"
import { Typography } from "@/shared/ui/typography"

import { OrderItemsCard } from "./order-items-card"
import { OrderPaymentCard } from "./order-payment-card"
import { OrderShippingCard } from "./order-shipping-card"
import { OrderStatusTimeline } from "./order-status-timeline"

type OrderDetailProps = {
  order: CustomerOrderDetail
}

const OrderDetail = ({ order }: OrderDetailProps) => (
  <main className="bg-cream/35 px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
    <div className="mx-auto max-w-6xl">
      <Link
        href={ROUTES.orders.list}
        className="inline-flex items-center gap-2 text-sm font-semibold text-ink/65 hover:text-coffee focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coffee"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        주문 내역으로
      </Link>

      <header className="mt-8 rounded-[1.75rem] bg-ink p-6 text-paper sm:p-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div>
            <Typography variant="overline" tone="inverse-muted">
              ORDER DETAIL
            </Typography>
            <Typography as="h1" variant="sectionTitle" tone="inverse" className="mt-3">
              주문 상세
            </Typography>
            <p className="mt-4 font-mono text-xs tracking-[0.05em] text-paper/65">
              {order.orderNumber}
            </p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>
        <time className="mt-6 block text-sm text-paper/60" dateTime={order.orderedAt}>
          {formatKoreanDateTime(order.orderedAt)} 주문
        </time>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:items-start">
        <div className="space-y-6">
          <OrderItemsCard items={order.items} />
          <OrderShippingCard shipping={order.shipping} />
        </div>
        <div className="space-y-6">
          <OrderPaymentCard order={order} />
          <OrderStatusTimeline history={order.statusHistory} />
        </div>
      </div>
    </div>
  </main>
)

export { OrderDetail }
