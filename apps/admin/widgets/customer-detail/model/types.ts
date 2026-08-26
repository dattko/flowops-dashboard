import type { CustomerProfile } from "@/entities/customer"
import type { OrderStatus } from "@/entities/order"

export type CustomerOrderSummary = {
  totalOrders: number
  totalSpent: number
  lastOrderedAt: string | null
}

export type CustomerRecentOrder = {
  id: string
  orderNumber: string
  status: OrderStatus
  totalAmount: number
  orderedAt: string
}

export type CustomerDetailData = CustomerProfile & {
  summary: CustomerOrderSummary
  recentOrders: CustomerRecentOrder[]
}
