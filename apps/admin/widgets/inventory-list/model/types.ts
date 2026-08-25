import type { InventoryItem } from "@/entities/inventory"

export type InventoryListResponse = {
  items: InventoryItem[]
  totalCount: number
  page: number
  pageSize: number
  totalPages: number
}
