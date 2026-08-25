import type { ComponentProps } from "react"

import { cn } from "@/shared/lib/utils"
import { StatusBadge } from "@/shared/ui/status-badge"

import {
  CUSTOMER_STATUS_CLASS_NAMES,
  CUSTOMER_STATUS_LABELS,
} from "../config/customer-status"
import type { CustomerStatus } from "../model/types"

type CustomerStatusBadgeProps = Omit<
  ComponentProps<typeof StatusBadge>,
  "children"
> & {
  status: CustomerStatus
}

const CustomerStatusBadge = ({
  status,
  className,
  ...props
}: CustomerStatusBadgeProps) => {
  return (
    <StatusBadge
      className={cn(CUSTOMER_STATUS_CLASS_NAMES[status], className)}
      {...props}
    >
      {CUSTOMER_STATUS_LABELS[status]}
    </StatusBadge>
  )
}

export { CustomerStatusBadge }
export type { CustomerStatusBadgeProps }
