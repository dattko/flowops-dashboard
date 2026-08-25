import { Suspense } from "react"

import { CustomerList } from "@/widgets/customer-list"

const CustomersPage = () => {
  return (
    <Suspense fallback={null}>
      <CustomerList />
    </Suspense>
  )
}

export default CustomersPage
