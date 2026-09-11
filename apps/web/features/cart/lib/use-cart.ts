"use client"

import {
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_FEE,
} from "../model/constants"
import { useCartStore } from "../store/use-cart-store"
import { useCartHydration } from "./use-cart-hydration"

const useCart = () => {
  const hasHydrated = useCartHydration()
  const isSessionReady = useCartStore((state) => state.isSessionReady)
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )
  const shippingFee =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : STANDARD_SHIPPING_FEE

  return {
    hasHydrated: hasHydrated && isSessionReady,
    items,
    itemCount,
    subtotal,
    shippingFee,
    total: subtotal + shippingFee,
    amountUntilFreeShipping: Math.max(
      FREE_SHIPPING_THRESHOLD - subtotal,
      0,
    ),
    clearCart,
  }
}

export { useCart }
