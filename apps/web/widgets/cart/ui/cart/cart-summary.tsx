import { ArrowRight, Truck } from "lucide-react"
import Link from "next/link"

import { ROUTES } from "@/shared/config/routes"
import { formatWon } from "@/shared/lib/currency"
import { buttonVariants } from "@/shared/ui/button"

type CartSummaryProps = {
  subtotal: number
  shippingFee: number
  total: number
  amountUntilFreeShipping: number
}

export const CartSummary = ({
  subtotal,
  shippingFee,
  total,
  amountUntilFreeShipping,
}: CartSummaryProps) => (
  <aside className="rounded-[1.5rem] bg-cream/65 p-6 lg:sticky lg:top-28 lg:p-8">
    <h2 className="text-lg font-semibold tracking-[-0.03em]">결제 예정 금액</h2>
    <dl className="mt-6 space-y-4 text-sm">
      <div className="flex items-center justify-between gap-6">
        <dt className="text-ink/55">상품 금액</dt>
        <dd className="font-medium">{formatWon(subtotal)}</dd>
      </div>
      <div className="flex items-center justify-between gap-6">
        <dt className="text-ink/55">배송비</dt>
        <dd className="font-medium">
          {shippingFee === 0 ? "무료" : formatWon(shippingFee)}
        </dd>
      </div>
      <div className="flex items-center justify-between gap-6 border-t border-ink/10 pt-5 text-base">
        <dt className="font-semibold">총 금액</dt>
        <dd className="text-xl font-semibold tracking-[-0.03em]">
          {formatWon(total)}
        </dd>
      </div>
    </dl>

    <div className="mt-6 flex gap-3 border-t border-ink/10 pt-5 text-xs leading-5 text-ink/60">
      <Truck className="mt-0.5 size-4 shrink-0 text-coffee" strokeWidth={1.7} />
      <p>
        {amountUntilFreeShipping > 0
          ? `${formatWon(amountUntilFreeShipping)} 더 담으면 무료배송입니다.`
          : "무료배송 조건을 충족했습니다."}
      </p>
    </div>

    <Link
      href={ROUTES.products.list}
      className={`${buttonVariants({ variant: "outline", size: "lg" })} mt-7 w-full`}
    >
      쇼핑 계속하기
      <ArrowRight aria-hidden="true" />
    </Link>
  </aside>
)
