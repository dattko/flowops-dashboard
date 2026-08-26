export type CustomerStatus = "active" | "inactive" | "blocked"

export type CustomerProfile = {
  id: string
  name: string
  email: string
  phone: string | null
  status: CustomerStatus
  memo: string | null
  createdAt: string
  updatedAt: string
}

export type CustomerListItem = Omit<CustomerProfile, "memo"> & {
  totalOrders: number
  totalSpent: number
  lastOrderedAt: string | null
}
