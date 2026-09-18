import { ArrowRight, Package } from "lucide-react"
import Link from "next/link"

import {
  OrderStatusBadge,
  STOREFRONT_PAYMENT_METHOD_LABELS,
  type CustomerOrderListResponse,
} from "@/entities/order"
import { ROUTES } from "@/shared/config/routes"
import { formatWon } from "@/shared/lib/currency"
import { formatKoreanDate } from "@/shared/lib/date"
import { Typography } from "@/shared/ui/typography"

import { OrderHistoryEmpty } from "./order-history-empty"
import { OrderHistoryPagination } from "./order-history-pagination"

const OrderHistory = ({ data }: { data: CustomerOrderListResponse }) => (
  <section className="bg-cream/35 px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
    <div className="mx-auto max-w-6xl">
      <Typography variant="overline" tone="brand">
        MY ORDERS
      </Typography>
      <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <Typography as="h1" variant="sectionTitle">
            주문 내역
          </Typography>
          <Typography tone="muted" className="mt-3">
            주문부터 배송 완료까지 진행 상황을 확인할 수 있어요.
          </Typography>
        </div>
        {data.totalCount > 0 ? (
          <p className="text-sm text-ink/50">총 {data.totalCount}건</p>
        ) : null}
      </div>

      <div className="mt-9">
        {data.items.length === 0 ? (
          <OrderHistoryEmpty />
        ) : (
          <ul className="space-y-4" aria-label="주문 내역">
            {data.items.map((order) => (
              <li key={order.id}>
                <Link
                  href={ROUTES.orders.detail(order.orderNumber)}
                  className="group block rounded-[1.5rem] border border-ink/10 bg-paper p-5 transition-colors hover:border-coffee/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coffee sm:p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-ink/10 pb-4">
                    <div>
                      <p className="text-xs text-ink/50">
                        {formatKoreanDate(order.orderedAt)} 주문
                      </p>
                      <p className="mt-1 font-mono text-xs font-semibold tracking-[0.05em] text-ink/70">
                        {order.orderNumber}
                      </p>
                    </div>
                    <OrderStatusBadge status={order.status} />
                  </div>

                  <div className="mt-5 flex items-center gap-4">
                    <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-cream text-coffee">
                      <Package className="size-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">
                        {order.representativeItem?.name ?? "주문 상품"}
                        {order.itemCount > 1
                          ? ` 외 ${order.itemCount - 1}종`
                          : ""}
                      </p>
                      <p className="mt-1 text-xs text-ink/50">
                        총 {order.totalQuantity}개 · {STOREFRONT_PAYMENT_METHOD_LABELS[order.paymentMethod]}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatWon(order.paidAmount)}</p>
                      <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-coffee">
                        상세 보기
                        <ArrowRight
                          className="size-3.5 transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <OrderHistoryPagination page={data.page} totalPages={data.totalPages} />
    </div>
  </section>
)

export { OrderHistory }
