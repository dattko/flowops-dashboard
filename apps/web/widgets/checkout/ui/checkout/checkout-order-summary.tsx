import { ShieldCheck, Truck } from "lucide-react"

import { ProductVisual } from "@/entities/product"
import type { CartItem } from "@/features/cart"
import { formatWon } from "@/shared/lib/currency"

type CheckoutOrderSummaryProps = {
  items: CartItem[]
  subtotal: number
  shippingFee: number
  total: number
}

const CheckoutOrderSummary = ({
  items,
  subtotal,
  shippingFee,
  total,
}: CheckoutOrderSummaryProps) => (
  <aside className="rounded-[1.75rem] bg-cream/65 p-6 lg:sticky lg:top-28 lg:p-8">
    <h2 className="text-xl font-semibold tracking-[-0.035em]">주문 상품</h2>

    <ul className="mt-5 divide-y divide-ink/10">
      {items.map((item) => (
        <li key={item.id} className="flex items-center gap-4 py-4 first:pt-0">
          <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-2xl bg-paper">
            <ProductVisual
              tone={item.tone}
              label={item.label}
              size="thumbnail"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{item.name}</p>
            <p className="mt-1 text-xs text-ink/50">
              {formatWon(item.price)} · {item.quantity}개
            </p>
          </div>
          <p className="text-sm font-semibold">
            {formatWon(item.price * item.quantity)}
          </p>
        </li>
      ))}
    </ul>

    <dl className="mt-4 space-y-3 border-t border-ink/10 pt-5 text-sm">
      <div className="flex justify-between gap-6">
        <dt className="text-ink/55">상품 금액</dt>
        <dd className="font-medium">{formatWon(subtotal)}</dd>
      </div>
      <div className="flex justify-between gap-6">
        <dt className="text-ink/55">배송비</dt>
        <dd className="font-medium">
          {shippingFee === 0 ? "무료" : formatWon(shippingFee)}
        </dd>
      </div>
      <div className="flex items-end justify-between gap-6 border-t border-ink/10 pt-5">
        <dt className="font-semibold">최종 결제 금액</dt>
        <dd className="text-2xl font-semibold tracking-[-0.04em]">
          {formatWon(total)}
        </dd>
      </div>
    </dl>

    <div className="mt-6 space-y-2 text-xs leading-5 text-ink/55">
      <p className="flex gap-2">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-leaf" aria-hidden="true" />
        실제 결제 정보는 입력하거나 저장하지 않습니다.
      </p>
      <p className="flex gap-2">
        <Truck className="mt-0.5 size-4 shrink-0 text-coffee" aria-hidden="true" />
        결제 완료 후 관리자 주문 목록과 재고에 바로 반영됩니다.
      </p>
    </div>
  </aside>
)

export { CheckoutOrderSummary }
