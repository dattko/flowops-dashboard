import type { Metadata } from "next"
import { Suspense } from "react"

import { OrderList } from "@/widgets/order-list"

export const metadata: Metadata = {
  title: "주문 관리",
  description: "접수된 주문을 검색하고 처리 상태와 결제 정보를 관리합니다.",
}

const OrderPage = () => {
  return (
    <Suspense fallback={null}>
      <OrderList />
    </Suspense>
  )
}

export default OrderPage
