import type { InventoryStockStatus } from "@/entities/inventory"
import type { PaginationParams } from "@/shared/model/pagination"

export type InventoryStockStatusFilter = InventoryStockStatus | "all"

export type InventoryFilters = PaginationParams & {
  keyword: string
  stockStatus: InventoryStockStatusFilter
}

export type InventoryFilterFormValues = Pick<
  InventoryFilters,
  "keyword" | "stockStatus"
>
