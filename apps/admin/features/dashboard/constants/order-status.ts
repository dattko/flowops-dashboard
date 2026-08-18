import type { OrderStatus } from "../model/types"

export const ORDER_STATUS_STYLES: Record<OrderStatus, string> = {
  결제완료: "bg-warning/10 text-warning",
  상품준비: "bg-warning/10 text-warning",
  배송중: "bg-success/10 text-success",
  배송완료: "bg-muted text-muted-foreground",
}
