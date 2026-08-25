export type CustomerStatus = "active" | "inactive" | "blocked"

export type CustomerListItem = {
  id: string
  name: string
  email: string
  phone: string | null
  status: CustomerStatus
  totalOrders: number
  totalSpent: number
  lastOrderedAt: string | null
  createdAt: string
  updatedAt: string
}
