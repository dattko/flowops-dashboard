import type { Product } from "@/entities/product"

export type CartItem = Pick<
  Product,
  "id" | "slug" | "name" | "price" | "available" | "label" | "tone"
> & {
  quantity: number
}

export type CartResponse = {
  items: CartItem[]
}

export type CartItemPayload = {
  productId: string
  quantity: number
}
