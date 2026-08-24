import type { OrderStatus } from "@/entities/order"

export type UpdateOrderDetailValues = {
  status?: OrderStatus
  customerName?: string
  customerEmail?: string | null
  customerPhone?: string | null
  recipientName?: string
  recipientPhone?: string
  postalCode?: string
  addressLine1?: string
  addressLine2?: string | null
  deliveryMemo?: string | null
  carrier?: string | null
  trackingNumber?: string | null
}

export type OrderDetailFormValues = {
  status: OrderStatus
  customerName: string
  customerEmail: string
  customerPhone: string
  recipientName: string
  recipientPhone: string
  postalCode: string
  addressLine1: string
  addressLine2: string
  deliveryMemo: string
  carrier: string
  trackingNumber: string
}
