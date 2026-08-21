import type { OrderStatus } from "./types"

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  paid: "결제완료",
  preparing: "상품준비",
  shipping: "배송중",
  delivered: "배송완료",
  cancelled: "주문취소",
}
