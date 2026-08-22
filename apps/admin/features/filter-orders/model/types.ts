import type { OrderStatus } from "@/entities/order"
import type { PaginationParams } from "@/shared/model/pagination"

export type OrderStatusFilter = OrderStatus | "all"

export type OrderFilters = PaginationParams & {
  keyword: string
  status: OrderStatusFilter
}

export type OrderFilterFormValues = Pick<OrderFilters, "keyword" | "status">
