export type OrderStatus =
  | "paid"
  | "preparing"
  | "shipping"
  | "delivered"
  | "cancelled"

export type OrderPaymentMethod =
  | "card"
  | "bank_transfer"
  | "virtual_account"
  | "kakao_pay"

export type OrderPaymentStatus =
  | "pending"
  | "paid"
  | "partially_refunded"
  | "refunded"
  | "failed"
  | "cancelled"

export type OrderEditableField =
  | "customer"
  | "shipping"
  | "tracking"
  | "status"

export type OrderDetailItem = {
  id: number
  productId: string | null
  sku: string | null
  name: string
  quantity: number
  unitPrice: number
  totalAmount: number
}

export type OrderPayment = {
  method: OrderPaymentMethod
  status: OrderPaymentStatus
  productAmount: number
  discountAmount: number
  shippingFee: number
  paidAmount: number
  transactionId: string | null
  paidAt: string | null
  refundedAt: string | null
}

export type OrderShipping = {
  recipientName: string
  recipientPhone: string
  postalCode: string
  addressLine1: string
  addressLine2: string | null
  deliveryMemo: string | null
  carrier: string | null
  trackingNumber: string | null
  shippedAt: string | null
  deliveredAt: string | null
}

export type OrderStatusHistory = {
  id: number
  status: OrderStatus
  note: string | null
  changedAt: string
  changedBy: string | null
}

export type OrderConsultationNote = {
  id: number
  content: string
  authorId: string | null
  authorName: string | null
  createdAt: string
}

export type OrderDetail = {
  id: string
  orderNumber: string
  status: OrderStatus
  orderedAt: string
  updatedAt: string
  totalAmount: number
  salesChannel: string
  editableFields: OrderEditableField[]
  availableStatuses: OrderStatus[]
  customer: {
    name: string
    email: string | null
    phone: string | null
  }
  items: OrderDetailItem[]
  payment: OrderPayment | null
  shipping: OrderShipping | null
  statusHistory: OrderStatusHistory[]
  consultationNotes: OrderConsultationNote[]
}
