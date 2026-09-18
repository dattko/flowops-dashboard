import { Coffee } from "lucide-react"
import Link from "next/link"

import type { StorefrontOrderItem } from "@/entities/order"
import { ROUTES } from "@/shared/config/routes"
import { formatWon } from "@/shared/lib/currency"

type OrderItemsCardProps = {
  items: StorefrontOrderItem[]
}

const OrderItemsCard = ({ items }: OrderItemsCardProps) => (
  <section
    className="rounded-[1.5rem] border border-ink/10 bg-paper p-5 sm:p-7"
    aria-labelledby="order-items-title"
  >
    <h2 id="order-items-title" className="text-lg font-semibold">
      주문 상품
    </h2>
    <ul className="mt-5 divide-y divide-ink/10">
      {items.map((item) => (
        <li key={item.id} className="flex gap-4 py-5 first:pt-0 last:pb-0">
          <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-cream text-coffee">
            <Coffee className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <Link
              href={ROUTES.products.detail(item.slug)}
              className="font-semibold underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coffee"
            >
              {item.name}
            </Link>
            <p className="mt-1 text-xs text-ink/50">상품 코드 {item.sku}</p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="text-ink/60">
                {formatWon(item.unitPrice)} · {item.quantity}개
              </span>
              <strong>{formatWon(item.totalAmount)}</strong>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </section>
)

export { OrderItemsCard }
