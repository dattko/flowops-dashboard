"use client"

import type { CartItem } from "../model/types"
import { useCartStore } from "../store/use-cart-store"

const useCartItem = (item: CartItem) => {
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)

  return {
    canDecrease: item.quantity > 1,
    canIncrease: item.quantity < item.available,
    decreaseQuantity: () => updateQuantity(item.id, item.quantity - 1),
    increaseQuantity: () => updateQuantity(item.id, item.quantity + 1),
    removeItem: () => removeItem(item.id),
  }
}

export { useCartItem }
