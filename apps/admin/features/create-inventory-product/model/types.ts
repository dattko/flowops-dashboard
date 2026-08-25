import type { ProductStatus } from "@/entities/inventory"

export type InventoryProductCreateFormValues = {
  sku: string
  name: string
  description: string
  price: number
  productStatus: ProductStatus
  onHand: number
  reorderPoint: number
}
