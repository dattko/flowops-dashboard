import { CheckCircle2, Coffee, CreditCard, MapPin } from "lucide-react"
import Link from "next/link"

import {
  STOREFRONT_PAYMENT_METHOD_LABELS,
  type StorefrontOrder,
} from "@/entities/order"
import { ROUTES } from "@/shared/config/routes"
import { formatWon } from "@/shared/lib/currency"
import { buttonVariants } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"

const OrderComplete = ({ order }: { order: StorefrontOrder }) => (
  <section className="bg-cream/45 px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
    <div className="mx-auto max-w-4xl">
      <div className="rounded-[2rem] border border-ink/10 bg-paper px-6 py-10 shadow-[0_28px_80px_rgba(45,35,28,0.09)] sm:px-10 sm:py-12">
        <div className="text-center">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-leaf/10 text-leaf">
            <CheckCircle2 className="size-8" aria-hidden="true" />
          </span>
          <Typography variant="overline" tone="brand" className="mt-6">
            PAYMENT APPROVED
          </Typography>
          <Typography as="h1" variant="sectionTitle" className="mt-3">
            테스트 결제가 완료됐어요
          </Typography>
          <Typography tone="muted" className="mt-4">
            실제 금액은 청구되지 않았으며 주문과 재고 데이터만 반영되었습니다.
          </Typography>
          <p className="mt-5 font-mono text-sm font-semibold tracking-[0.08em] text-coffee">
            {order.orderNumber}
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <section className="rounded-2xl bg-cream/55 p-5">
            <h2 className="flex items-center gap-2 font-semibold">
              <CreditCard className="size-4 text-coffee" aria-hidden="true" />
              결제 정보
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-ink/55">결제 수단</dt>
                <dd className="font-medium">
                  {STOREFRONT_PAYMENT_METHOD_LABELS[order.paymentMethod]}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink/55">상품 금액</dt>
                <dd>{formatWon(order.productAmount)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink/55">배송비</dt>
                <dd>
                  {order.shippingFee === 0
                    ? "무료"
                    : formatWon(order.shippingFee)}
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-ink/10 pt-3">
                <dt className="font-semibold">결제 금액</dt>
                <dd className="font-semibold">{formatWon(order.paidAmount)}</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl bg-cream/55 p-5">
            <h2 className="flex items-center gap-2 font-semibold">
              <MapPin className="size-4 text-coffee" aria-hidden="true" />
              배송 정보
            </h2>
            <div className="mt-4 space-y-1 text-sm leading-6">
              <p className="font-medium">{order.shipping.recipientName}</p>
              <p className="text-ink/60">{order.shipping.recipientPhone}</p>
              <p className="text-ink/60">
                ({order.shipping.postalCode}) {order.shipping.addressLine1}
                {order.shipping.addressLine2
                  ? ` ${order.shipping.addressLine2}`
                  : ""}
              </p>
              {order.shipping.deliveryMemo ? (
                <p className="pt-2 text-xs text-ink/50">
                  {order.shipping.deliveryMemo}
                </p>
              ) : null}
            </div>
          </section>
        </div>

        <section className="mt-5 rounded-2xl border border-ink/10 p-5">
          <h2 className="flex items-center gap-2 font-semibold">
            <Coffee className="size-4 text-coffee" aria-hidden="true" />
            주문 상품
          </h2>
          <ul className="mt-4 divide-y divide-ink/10">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between gap-5 py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="mt-1 text-xs text-ink/50">
                    {formatWon(item.unitPrice)} · {item.quantity}개
                  </p>
                </div>
                <p className="text-sm font-semibold">
                  {formatWon(item.totalAmount)}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={ROUTES.products.list}
            className={buttonVariants({ variant: "brand", size: "lg" })}
          >
            쇼핑 계속하기
          </Link>
          <Link
            href={ROUTES.home}
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            홈으로 이동
          </Link>
        </div>
      </div>
    </div>
  </section>
)

export { OrderComplete }
