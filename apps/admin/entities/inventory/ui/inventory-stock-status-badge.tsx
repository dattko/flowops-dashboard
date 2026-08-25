import type { ComponentProps } from "react"

import { cn } from "@/shared/lib/utils"
import { StatusBadge } from "@/shared/ui/status-badge"

import {
  INVENTORY_STOCK_STATUS_CLASS_NAMES,
  INVENTORY_STOCK_STATUS_LABELS,
} from "../config/inventory-status"
import type { InventoryStockStatus } from "../model/types"

type InventoryStockStatusBadgeProps = Omit<
  ComponentProps<typeof StatusBadge>,
  "children"
> & {
  status: InventoryStockStatus
}

const InventoryStockStatusBadge = ({
  status,
  className,
  ...props
}: InventoryStockStatusBadgeProps) => {
  return (
    <StatusBadge
      className={cn(INVENTORY_STOCK_STATUS_CLASS_NAMES[status], className)}
      {...props}
    >
      {INVENTORY_STOCK_STATUS_LABELS[status]}
    </StatusBadge>
  )
}

export { InventoryStockStatusBadge }
export type { InventoryStockStatusBadgeProps }
