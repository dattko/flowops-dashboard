import type { CustomerListItem } from "@/entities/customer"

export type CustomerListResponse = {
  items: CustomerListItem[]
  totalCount: number
  page: number
  pageSize: number
  totalPages: number
}
