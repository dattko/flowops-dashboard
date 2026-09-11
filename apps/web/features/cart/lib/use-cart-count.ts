"use client"

import { useCartStore } from "../store/use-cart-store"
import { useCartHydration } from "./use-cart-hydration"

const useCartCount = () => {
  const hasHydrated = useCartHydration()
  const isSessionReady = useCartStore((state) => state.isSessionReady)
  const itemCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  )

  return hasHydrated && isSessionReady ? itemCount : 0
}

export { useCartCount }
