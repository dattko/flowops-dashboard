import type {
  InventoryMovementType,
  InventoryStockStatus,
  ProductStatus,
} from "../model/types"

export const INVENTORY_STOCK_STATUS_LABELS: Record<
  InventoryStockStatus,
  string
> = {
  normal: "정상",
  low_stock: "재고 부족",
  sold_out: "품절",
}

export const INVENTORY_STOCK_STATUS_CLASS_NAMES: Record<
  InventoryStockStatus,
  string
> = {
  normal: "bg-success/10 text-success",
  low_stock: "bg-warning/10 text-warning",
  sold_out: "bg-destructive/10 text-destructive",
}

export const PRODUCT_STATUS_LABELS: Record<ProductStatus, string> = {
  active: "판매 중",
  inactive: "판매 중지",
}

export const PRODUCT_STATUS_OPTIONS: Array<{
  label: string
  value: ProductStatus
}> = [
  { label: PRODUCT_STATUS_LABELS.active, value: "active" },
  { label: PRODUCT_STATUS_LABELS.inactive, value: "inactive" },
]

export const PRODUCT_STATUS_CLASS_NAMES: Record<ProductStatus, string> = {
  active: "bg-success/10 text-success",
  inactive: "bg-muted text-muted-foreground",
}

export const INVENTORY_MOVEMENT_TYPE_LABELS: Record<
  InventoryMovementType,
  string
> = {
  initial: "최초 등록",
  inbound: "입고",
  outbound: "출고",
  adjustment: "재고 조정",
}
