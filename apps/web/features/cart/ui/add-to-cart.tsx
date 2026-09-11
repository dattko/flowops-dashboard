"use client"

import { Minus, Plus, ShoppingBag } from "lucide-react"
import Link from "next/link"

import type { Product } from "@/entities/product"
import { ROUTES } from "@/shared/config/routes"
import { Button, buttonVariants } from "@/shared/ui/button"

import { useAddToCart } from "../lib/use-add-to-cart"

export const AddToCart = ({ product }: { product: Product }) => {
  const {
    quantity,
    addedQuantity,
    remainingQuantity,
    canAdd,
    canDecrease,
    canIncrease,
    buttonLabel,
    decreaseQuantity,
    increaseQuantity,
    addToCart,
  } = useAddToCart(product)

  return (
    <div className="mt-8 border-y border-ink/10 py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-12 items-center justify-between rounded-full border border-ink/15 px-1 sm:w-36">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={decreaseQuantity}
            disabled={!canDecrease || !canAdd}
            aria-label="수량 줄이기"
          >
            <Minus aria-hidden="true" />
          </Button>
          <span className="min-w-8 text-center text-sm font-semibold" aria-live="polite">
            {canAdd ? quantity : 0}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={increaseQuantity}
            disabled={!canIncrease || !canAdd}
            aria-label="수량 늘리기"
          >
            <Plus aria-hidden="true" />
          </Button>
        </div>
        <Button
          type="button"
          variant="brand"
          size="lg"
          className="flex-1"
          onClick={addToCart}
          disabled={!canAdd}
        >
          <ShoppingBag aria-hidden="true" />
          {buttonLabel}
        </Button>
      </div>

      <div className="mt-3 min-h-5 text-xs text-ink/55" aria-live="polite">
        {addedQuantity > 0 ? (
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            장바구니에 {addedQuantity}개를 담았습니다.
            <Link
              href={ROUTES.cart}
              className={buttonVariants({ variant: "link", size: "sm" })}
            >
              장바구니 보기
            </Link>
          </p>
        ) : canAdd ? (
          <p>현재 장바구니에 최대 {remainingQuantity}개까지 더 담을 수 있습니다.</p>
        ) : null}
      </div>
    </div>
  )
}
