export {
  INVENTORY_MOVEMENT_TYPE_LABELS,
  INVENTORY_STOCK_STATUS_CLASS_NAMES,
  INVENTORY_STOCK_STATUS_LABELS,
  PRODUCT_STATUS_CLASS_NAMES,
  PRODUCT_STATUS_LABELS,
  PRODUCT_STATUS_OPTIONS,
} from "./config/inventory-status"
export type {
  InventoryDetail,
  InventoryItem,
  InventoryMovement,
  InventoryMovementType,
  InventoryStockStatus,
  ProductStatus,
} from "./model/types"
export { InventoryStockStatusBadge } from "./ui/inventory-stock-status-badge"
export type { InventoryStockStatusBadgeProps } from "./ui/inventory-stock-status-badge"
export { ProductStatusBadge } from "./ui/product-status-badge"
export type { ProductStatusBadgeProps } from "./ui/product-status-badge"
