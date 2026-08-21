import type { OrderStatus } from "@/entities/order"

export type OrderListItem = {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string | null
  status: OrderStatus
  totalAmount: number
  orderedAt: string
  itemCount: number
  totalQuantity: number
}
