"use client"

import { CartItem, useCart } from "@/features/cart"
import { Button } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"

import { CartEmpty } from "./cart-empty"
import { CartSummary } from "./cart-summary"

export const Cart = () => {
  const {
    hasHydrated,
    items,
    itemCount,
    subtotal,
    shippingFee,
    total,
    amountUntilFreeShipping,
    clearCart,
  } = useCart()

  return (
    <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[90rem]">
        <div className="flex items-end justify-between gap-6 border-b border-ink/10 pb-7">
          <div>
            <Typography variant="overline" tone="brand">
              YOUR SELECTION
            </Typography>
            <Typography as="h1" variant="sectionTitle" className="mt-3">
              장바구니
            </Typography>
            <Typography tone="muted" className="mt-3">
              {hasHydrated
                ? `총 ${itemCount}개의 상품을 담았습니다.`
                : "장바구니를 확인하고 있습니다."}
            </Typography>
          </div>
          {hasHydrated && items.length > 0 ? (
            <Button type="button" variant="ghost" size="sm" onClick={clearCart}>
              전체 비우기
            </Button>
          ) : null}
        </div>

        {!hasHydrated ? (
          <div
            className="min-h-[26rem] animate-pulse border-b border-ink/10 bg-cream/25"
            aria-label="장바구니를 불러오는 중입니다."
          />
        ) : items.length === 0 ? (
          <CartEmpty />
        ) : (
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
            <ul aria-label="장바구니 상품">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ul>
            <CartSummary
              subtotal={subtotal}
              shippingFee={shippingFee}
              total={total}
              amountUntilFreeShipping={amountUntilFreeShipping}
            />
          </div>
        )}
      </div>
    </section>
  )
}
