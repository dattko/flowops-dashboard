import type { OrderFilters } from "./types"
import { ORDER_STATUS_LABELS } from "@/entities/order"
import { DEFAULT_PAGINATION } from "@/shared/model/pagination"

export const ORDER_STATUS_FILTER_VALUES = [
  "paid",
  "preparing",
  "shipping",
  "delivered",
  "cancelled",
] as const

export const ORDER_STATUS_FILTER_OPTIONS = [
  { value: "all", label: "전체 상태" },
  ...ORDER_STATUS_FILTER_VALUES.map((status) => ({
    value: status,
    label: ORDER_STATUS_LABELS[status],
  })),
] as const

export const DEFAULT_ORDER_FILTERS: OrderFilters = {
  ...DEFAULT_PAGINATION,
  keyword: "",
  status: "all",
}
