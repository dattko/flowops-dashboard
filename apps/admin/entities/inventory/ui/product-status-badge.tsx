import type { ComponentProps } from "react"

import { cn } from "@/shared/lib/utils"
import { StatusBadge } from "@/shared/ui/status-badge"

import {
  PRODUCT_STATUS_CLASS_NAMES,
  PRODUCT_STATUS_LABELS,
} from "../config/inventory-status"
import type { ProductStatus } from "../model/types"

type ProductStatusBadgeProps = Omit<
  ComponentProps<typeof StatusBadge>,
  "children"
> & {
  status: ProductStatus
}

const ProductStatusBadge = ({
  status,
  className,
  ...props
}: ProductStatusBadgeProps) => {
  return (
    <StatusBadge
      className={cn(PRODUCT_STATUS_CLASS_NAMES[status], className)}
      {...props}
    >
      {PRODUCT_STATUS_LABELS[status]}
    </StatusBadge>
  )
}

export { ProductStatusBadge }
export type { ProductStatusBadgeProps }
