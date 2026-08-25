import type { InventoryStockAdjustmentType } from "./types"

export const INVENTORY_STOCK_ADJUSTMENT_OPTIONS: Array<{
  label: string
  value: InventoryStockAdjustmentType
}> = [
  { label: "입고", value: "inbound" },
  { label: "출고", value: "outbound" },
  { label: "재고 실사 조정", value: "adjustment" },
]
