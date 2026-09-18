type StorefrontOrderStatus =
  | "paid"
  | "preparing"
  | "shipping"
  | "delivered"
  | "cancelled"

type StorefrontPaymentMethod =
  | "card"
  | "bank_transfer"
  | "virtual_account"
  | "kakao_pay"

type StorefrontPaymentStatus =
  | "pending"
  | "paid"
  | "partially_refunded"
  | "refunded"
  | "failed"
  | "cancelled"

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
  status: StorefrontOrderStatus
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

type CustomerOrderListItem = {
  id: string
  orderNumber: string
  status: StorefrontOrderStatus
  orderedAt: string
  paidAmount: number
  paymentMethod: StorefrontPaymentMethod
  itemCount: number
  totalQuantity: number
  representativeItem: {
    name: string
    slug: string
  } | null
}

type CustomerOrderListResponse = {
  items: CustomerOrderListItem[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
}

type CustomerOrderStatusHistory = {
  id: number
  status: StorefrontOrderStatus
  note: string | null
  changedAt: string
}

type CustomerOrderDetail = StorefrontOrder & {
  paymentStatus: StorefrontPaymentStatus
  discountAmount: number
  paidAt: string | null
  shipping: StorefrontOrder["shipping"] & {
    carrier: string | null
    trackingNumber: string | null
    shippedAt: string | null
    deliveredAt: string | null
  }
  statusHistory: CustomerOrderStatusHistory[]
}

type CustomerOrderListFilters = {
  page: number
  pageSize: number
}

export type {
  CustomerOrderDetail,
  CustomerOrderListFilters,
  CustomerOrderListItem,
  CustomerOrderListResponse,
  CustomerOrderStatusHistory,
  StorefrontOrder,
  StorefrontOrderItem,
  StorefrontOrderStatus,
  StorefrontPaymentMethod,
  StorefrontPaymentStatus,
}
