type StorefrontPaymentMethod = "card" | "kakao_pay"

type StorefrontOrderItem = {
  id: number
  productId: string
  slug: string
  sku: string
  name: string
  quantity: number
  unitPrice: number
  totalAmount: number
}

type StorefrontOrder = {
  id: string
  orderNumber: string
  status: "paid" | "preparing" | "shipping" | "delivered" | "cancelled"
  orderedAt: string
  productAmount: number
  shippingFee: number
  paidAmount: number
  paymentMethod: StorefrontPaymentMethod
  transactionId: string
  items: StorefrontOrderItem[]
  shipping: {
    recipientName: string
    recipientPhone: string
    postalCode: string
    addressLine1: string
    addressLine2: string | null
    deliveryMemo: string | null
  }
}

export type {
  StorefrontOrder,
  StorefrontOrderItem,
  StorefrontPaymentMethod,
}
