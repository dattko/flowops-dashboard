import type { CustomerStatus } from "../model/types"

export const CUSTOMER_STATUS_LABELS: Record<CustomerStatus, string> = {
  active: "활성",
  inactive: "휴면",
  blocked: "차단",
}

export const CUSTOMER_STATUS_OPTIONS: Array<{
  label: string
  value: CustomerStatus
}> = [
  { label: CUSTOMER_STATUS_LABELS.active, value: "active" },
  { label: CUSTOMER_STATUS_LABELS.inactive, value: "inactive" },
  { label: CUSTOMER_STATUS_LABELS.blocked, value: "blocked" },
]

export const CUSTOMER_STATUS_CLASS_NAMES: Record<CustomerStatus, string> = {
  active: "bg-success/10 text-success",
  inactive: "bg-muted text-muted-foreground",
  blocked: "bg-destructive/10 text-destructive",
}
