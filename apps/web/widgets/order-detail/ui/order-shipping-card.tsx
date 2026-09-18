import { Truck } from "lucide-react"

import type { CustomerOrderDetail } from "@/entities/order"

type OrderShippingCardProps = {
  shipping: CustomerOrderDetail["shipping"]
}

const OrderShippingCard = ({ shipping }: OrderShippingCardProps) => (
  <section
    className="rounded-[1.5rem] border border-ink/10 bg-paper p-5 sm:p-7"
    aria-labelledby="order-shipping-title"
  >
    <div className="flex items-center justify-between gap-4">
      <h2 id="order-shipping-title" className="text-lg font-semibold">
        배송 정보
      </h2>
      <Truck className="size-5 text-coffee" aria-hidden="true" />
    </div>
    <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-[7rem_1fr] sm:gap-x-6">
      <dt className="text-ink/55">받는 분</dt>
      <dd>{shipping.recipientName}</dd>
      <dt className="text-ink/55">연락처</dt>
      <dd>{shipping.recipientPhone}</dd>
      <dt className="text-ink/55">배송지</dt>
      <dd className="break-words">
        ({shipping.postalCode}) {shipping.addressLine1}
        {shipping.addressLine2 ? ` ${shipping.addressLine2}` : ""}
      </dd>
      {shipping.deliveryMemo ? (
        <>
          <dt className="text-ink/55">배송 메모</dt>
          <dd>{shipping.deliveryMemo}</dd>
        </>
      ) : null}
      {shipping.trackingNumber ? (
        <>
          <dt className="text-ink/55">운송장</dt>
          <dd>
            {shipping.carrier ? `${shipping.carrier} · ` : ""}
            {shipping.trackingNumber}
          </dd>
        </>
      ) : null}
    </dl>
  </section>
)

export { OrderShippingCard }
