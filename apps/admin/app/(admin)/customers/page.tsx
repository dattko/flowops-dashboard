import type { Metadata } from "next"
import { Suspense } from "react"

import { CustomerList } from "@/widgets/customer-list"

export const metadata: Metadata = {
  title: "고객 관리",
  description: "고객 상태와 누적 주문 및 구매 금액을 확인합니다.",
}

const CustomersPage = () => {
  return (
    <Suspense fallback={null}>
      <CustomerList />
    </Suspense>
  )
}

export default CustomersPage
