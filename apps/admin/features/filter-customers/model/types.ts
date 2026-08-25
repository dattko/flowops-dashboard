import type { CustomerStatus } from "@/entities/customer"
import type { PaginationParams } from "@/shared/model/pagination"

export type CustomerStatusFilter = CustomerStatus | "all"

export type CustomerFilters = PaginationParams & {
  keyword: string
  status: CustomerStatusFilter
}

export type CustomerFilterFormValues = Pick<
  CustomerFilters,
  "keyword" | "status"
>
