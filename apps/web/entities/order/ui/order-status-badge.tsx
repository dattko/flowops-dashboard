import type { StorefrontOrderStatus } from "../model/types"
import { STOREFRONT_ORDER_STATUS_LABELS } from "../config/order-labels"
import { cn } from "@/shared/lib/utils"

const STATUS_STYLES: Record<StorefrontOrderStatus, string> = {
  paid: "bg-coffee/10 text-coffee",
  preparing: "bg-mustard/20 text-[#725516]",
  shipping: "bg-navy/10 text-navy",
  delivered: "bg-leaf/10 text-leaf",
  cancelled: "bg-coral/10 text-[#a13f28]",
}

const OrderStatusBadge = ({
  status,
  className,
}: {
  status: StorefrontOrderStatus
  className?: string
}) => (
  <span
    className={cn(
      "inline-flex h-7 items-center rounded-full px-3 text-xs font-semibold",
      STATUS_STYLES[status],
      className,
    )}
  >
    {STOREFRONT_ORDER_STATUS_LABELS[status]}
  </span>
)

export { OrderStatusBadge }
