import { INVENTORY_STOCK_STATUS_LABELS } from "@/entities/inventory"
import { DEFAULT_PAGINATION } from "@/shared/model/pagination"

import type { InventoryFilters } from "./types"

export const INVENTORY_STOCK_STATUS_FILTER_VALUES = [
  "normal",
  "low_stock",
  "sold_out",
] as const

export const INVENTORY_STOCK_STATUS_FILTER_OPTIONS = [
  { value: "all", label: "전체 재고 상태" },
  ...INVENTORY_STOCK_STATUS_FILTER_VALUES.map((status) => ({
    value: status,
    label: INVENTORY_STOCK_STATUS_LABELS[status],
  })),
] as const

export const DEFAULT_INVENTORY_FILTERS: InventoryFilters = {
  ...DEFAULT_PAGINATION,
  keyword: "",
  stockStatus: "all",
}
