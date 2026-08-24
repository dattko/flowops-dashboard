import type { OrderPaymentMethod, OrderPaymentStatus } from "../model/types"

export const ORDER_PAYMENT_METHOD_LABELS: Record<OrderPaymentMethod, string> = {
  card: "신용카드",
  bank_transfer: "계좌이체",
  virtual_account: "가상계좌",
  kakao_pay: "카카오페이",
}

export const ORDER_PAYMENT_STATUS_LABELS: Record<OrderPaymentStatus, string> = {
  pending: "결제 대기",
  paid: "결제 완료",
  partially_refunded: "부분 환불",
  refunded: "환불 완료",
  failed: "결제 실패",
  cancelled: "결제 취소",
}
