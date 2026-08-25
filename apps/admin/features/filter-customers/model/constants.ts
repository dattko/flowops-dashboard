import { CUSTOMER_STATUS_LABELS } from "@/entities/customer"
import { DEFAULT_PAGINATION } from "@/shared/model/pagination"

import type { CustomerFilters } from "./types"

export const CUSTOMER_STATUS_FILTER_VALUES = [
  "active",
  "inactive",
  "blocked",
] as const

export const CUSTOMER_STATUS_FILTER_OPTIONS = [
  { value: "all", label: "전체 고객 상태" },
  ...CUSTOMER_STATUS_FILTER_VALUES.map((status) => ({
    value: status,
    label: CUSTOMER_STATUS_LABELS[status],
  })),
] as const

export const DEFAULT_CUSTOMER_FILTERS: CustomerFilters = {
  ...DEFAULT_PAGINATION,
  keyword: "",
  status: "all",
}
