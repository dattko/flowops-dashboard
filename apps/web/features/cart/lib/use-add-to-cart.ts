"use client"

import { useState } from "react"

import type { Product } from "@/entities/product"

import { useCartStore } from "../store/use-cart-store"
import { useCartHydration } from "./use-cart-hydration"

const useAddToCart = (product: Product) => {
  const hasHydrated = useCartHydration()
  const isSessionReady = useCartStore((state) => state.isSessionReady)
  const [quantity, setQuantity] = useState(1)
  const [addedQuantity, setAddedQuantity] = useState(0)
  const addItem = useCartStore((state) => state.addItem)
  const cartQuantity = useCartStore(
    (state) => state.items.find((item) => item.id === product.id)?.quantity ?? 0,
  )
  const remainingQuantity = Math.max(product.available - cartQuantity, 0)
  const isReady = hasHydrated && isSessionReady
  const canAdd = isReady && !product.soldOut && remainingQuantity > 0

  const decreaseQuantity = () => {
    setQuantity((currentQuantity) => Math.max(currentQuantity - 1, 1))
    setAddedQuantity(0)
  }

  const increaseQuantity = () => {
    setQuantity((currentQuantity) =>
      Math.min(currentQuantity + 1, remainingQuantity),
    )
    setAddedQuantity(0)
  }

  const addToCart = () => {
    if (!canAdd) return

    const quantityToAdd = Math.min(quantity, remainingQuantity)
    addItem(product, quantityToAdd)
    setAddedQuantity(quantityToAdd)
    setQuantity(1)
  }

  return {
    quantity,
    addedQuantity,
    remainingQuantity,
    canAdd,
    canDecrease: quantity > 1,
    canIncrease: quantity < remainingQuantity,
    buttonLabel: !isReady
      ? "장바구니 확인 중"
      : product.soldOut
        ? "품절된 상품입니다"
        : remainingQuantity === 0
          ? "최대 수량을 담았어요"
          : "장바구니 담기",
    decreaseQuantity,
    increaseQuantity,
    addToCart,
  }
}

export { useAddToCart }
