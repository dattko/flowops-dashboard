"use client"

import { Minus, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

import { ProductVisual } from "@/entities/product"
import { type CartItem as CartItemData, useCartItem } from "@/features/cart"
import { ROUTES } from "@/shared/config/routes"
import { formatWon } from "@/shared/lib/currency"
import { Button } from "@/shared/ui/button"

export const CartItem = ({ item }: { item: CartItemData }) => {
  const {
    canDecrease,
    canIncrease,
    decreaseQuantity,
    increaseQuantity,
    removeItem,
  } = useCartItem(item)

  return (
    <li className="grid gap-5 border-b border-ink/10 py-6 sm:grid-cols-[8rem_minmax(0,1fr)_auto] sm:items-center">
      <Link
        href={ROUTES.products.detail(item.slug)}
        className="grid aspect-square place-items-center overflow-hidden rounded-2xl bg-cream/65 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coffee"
        aria-label={`${item.name} 상세 보기`}
      >
        <ProductVisual tone={item.tone} label={item.label} size="thumbnail" />
      </Link>

      <div className="min-w-0">
        <p className="text-[0.65rem] font-bold tracking-[0.12em] text-coffee">
          {item.label}
        </p>
        <Link
          href={ROUTES.products.detail(item.slug)}
          className="mt-1 block truncate text-base font-semibold tracking-[-0.025em] hover:text-coffee focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coffee"
        >
          {item.name}
        </Link>
        <p className="mt-2 text-sm text-ink/55">{formatWon(item.price)}</p>

        <div className="mt-4 flex items-center gap-2">
          <div className="flex h-9 items-center rounded-full border border-ink/15 px-0.5">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={decreaseQuantity}
              disabled={!canDecrease}
              aria-label={`${item.name} 수량 줄이기`}
            >
              <Minus aria-hidden="true" />
            </Button>
            <span
              className="min-w-8 text-center text-sm font-semibold"
              aria-live="polite"
            >
              {item.quantity}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={increaseQuantity}
              disabled={!canIncrease}
              aria-label={`${item.name} 수량 늘리기`}
            >
              <Plus aria-hidden="true" />
            </Button>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={removeItem}
            aria-label={`${item.name} 장바구니에서 삭제`}
          >
            <Trash2 aria-hidden="true" />
          </Button>
        </div>
      </div>

      <p className="text-right text-base font-semibold sm:min-w-24">
        {formatWon(item.price * item.quantity)}
      </p>
    </li>
  )
}
