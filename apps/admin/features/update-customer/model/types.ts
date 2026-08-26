import type { CustomerStatus } from "@/entities/customer"

export type CustomerUpdateFormValues = {
  name: string
  email: string
  phone: string
  status: CustomerStatus
  memo: string
}
