export type ProductStatus = "active" | "inactive"

export type InventoryStockStatus = "normal" | "low_stock" | "sold_out"

export type InventoryMovementType =
  | "initial"
  | "inbound"
  | "outbound"
  | "adjustment"

export type InventoryItem = {
  productId: string
  sku: string
  name: string
  productStatus: ProductStatus
  onHand: number
  reserved: number
  available: number
  reorderPoint: number
  stockStatus: InventoryStockStatus
  updatedAt: string
}

export type InventoryMovement = {
  id: number
  movementType: InventoryMovementType
  quantityDelta: number
  previousOnHand: number
  resultingOnHand: number
  reason: string
  createdBy: string | null
  createdAt: string
}

export type InventoryDetail = InventoryItem & {
  description: string | null
  price: number
  movements: InventoryMovement[]
}
