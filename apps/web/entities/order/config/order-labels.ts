import type {
  StorefrontOrderStatus,
  StorefrontPaymentMethod,
  StorefrontPaymentStatus,
} from "../model/types"

const STOREFRONT_ORDER_STATUS_LABELS: Record<StorefrontOrderStatus, string> = {
  paid: "결제 완료",
  preparing: "상품 준비 중",
  shipping: "배송 중",
  delivered: "배송 완료",
  cancelled: "주문 취소",
}

const STOREFRONT_PAYMENT_METHOD_LABELS: Record<
  StorefrontPaymentMethod,
  string
> = {
  card: "카드",
  bank_transfer: "계좌이체",
  virtual_account: "가상계좌",
  kakao_pay: "카카오페이",
}

const STOREFRONT_PAYMENT_STATUS_LABELS: Record<
  StorefrontPaymentStatus,
  string
> = {
  pending: "결제 대기",
  paid: "결제 완료",
  partially_refunded: "부분 환불",
  refunded: "환불 완료",
  failed: "결제 실패",
  cancelled: "결제 취소",
}

export {
  STOREFRONT_ORDER_STATUS_LABELS,
  STOREFRONT_PAYMENT_METHOD_LABELS,
  STOREFRONT_PAYMENT_STATUS_LABELS,
}
