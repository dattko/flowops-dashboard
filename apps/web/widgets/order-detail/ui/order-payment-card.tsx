import {
  STOREFRONT_PAYMENT_METHOD_LABELS,
  STOREFRONT_PAYMENT_STATUS_LABELS,
  type CustomerOrderDetail,
} from "@/entities/order"
import { formatWon } from "@/shared/lib/currency"
import { formatKoreanDateTime } from "@/shared/lib/date"

type OrderPaymentCardProps = {
  order: CustomerOrderDetail
}

const OrderPaymentCard = ({ order }: OrderPaymentCardProps) => (
  <section
    className="rounded-[1.5rem] border border-ink/10 bg-paper p-5 sm:p-7"
    aria-labelledby="order-payment-title"
  >
    <h2 id="order-payment-title" className="text-lg font-semibold">
      결제 정보
    </h2>
    <dl className="mt-5 space-y-3 text-sm">
      <div className="flex justify-between gap-4">
        <dt className="text-ink/55">상품 금액</dt>
        <dd>{formatWon(order.productAmount)}</dd>
      </div>
      <div className="flex justify-between gap-4">
        <dt className="text-ink/55">할인 금액</dt>
        <dd>{order.discountAmount > 0 ? `-${formatWon(order.discountAmount)}` : "0원"}</dd>
      </div>
      <div className="flex justify-between gap-4">
        <dt className="text-ink/55">배송비</dt>
        <dd>{order.shippingFee === 0 ? "무료" : formatWon(order.shippingFee)}</dd>
      </div>
      <div className="flex justify-between gap-4 border-t border-ink/10 pt-4 text-base">
        <dt className="font-semibold">총 결제 금액</dt>
        <dd className="font-semibold text-coffee">{formatWon(order.paidAmount)}</dd>
      </div>
      <div className="flex justify-between gap-4 pt-2">
        <dt className="text-ink/55">결제 수단</dt>
        <dd>{STOREFRONT_PAYMENT_METHOD_LABELS[order.paymentMethod]}</dd>
      </div>
      <div className="flex justify-between gap-4">
        <dt className="text-ink/55">결제 상태</dt>
        <dd>{STOREFRONT_PAYMENT_STATUS_LABELS[order.paymentStatus]}</dd>
      </div>
      {order.paidAt ? (
        <div className="flex justify-between gap-4">
          <dt className="text-ink/55">결제 일시</dt>
          <dd className="text-right">{formatKoreanDateTime(order.paidAt)}</dd>
        </div>
      ) : null}
    </dl>
  </section>
)

export { OrderPaymentCard }
