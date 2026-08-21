import type { OrderStatus } from "../model/types"

export const ORDER_STATUS_CLASS_NAMES: Record<OrderStatus, string> = {
  paid: "bg-warning/10 text-warning",
  preparing: "bg-warning/10 text-warning",
  shipping: "bg-success/10 text-success",
  delivered: "bg-muted text-muted-foreground",
  cancelled: "bg-destructive/10 text-destructive",
}
