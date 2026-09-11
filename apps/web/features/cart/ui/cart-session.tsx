"use client"

import { useCartSession } from "../lib/use-cart-session"

const CartSession = ({ userId }: { userId: string | null }) => {
  useCartSession(userId)

  return null
}

export { CartSession }
