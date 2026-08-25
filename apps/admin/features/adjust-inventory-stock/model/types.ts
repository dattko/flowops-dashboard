export type InventoryStockAdjustmentType =
  | "inbound"
  | "outbound"
  | "adjustment"

export type InventoryStockAdjustmentFormValues = {
  movementType: InventoryStockAdjustmentType
  quantity: number
  reason: string
}
