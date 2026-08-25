import type { ComponentProps } from "react"

import { cn } from "@/shared/lib/utils"
import { StatusBadge } from "@/shared/ui/status-badge"

import { ORDER_STATUS_CLASS_NAMES } from "../config/order-status-style"
import { ORDER_STATUS_LABELS } from "../model/order-status"
import type { OrderStatus } from "../model/types"

type OrderStatusBadgeProps = Omit<
  ComponentProps<typeof StatusBadge>,
  "children"
> & {
  status: OrderStatus
}

const OrderStatusBadge = ({
  status,
  className,
  ...props
}: OrderStatusBadgeProps) => {
  return (
    <StatusBadge
      className={cn(ORDER_STATUS_CLASS_NAMES[status], className)}
      {...props}
    >
      {ORDER_STATUS_LABELS[status]}
    </StatusBadge>
  )
}

export { OrderStatusBadge }
export type { OrderStatusBadgeProps }
