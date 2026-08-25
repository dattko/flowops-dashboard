import type { ProductStatus } from "@/entities/inventory"

export type InventoryProductUpdateFormValues = {
  name: string
  description: string
  price: number
  productStatus: ProductStatus
  reorderPoint: number
}
