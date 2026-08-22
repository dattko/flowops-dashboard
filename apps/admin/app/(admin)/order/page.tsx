import { Suspense } from "react"

import { OrderList } from "@/widgets/order-list"

const OrderPage = () => {
  return (
    <Suspense fallback={null}>
      <OrderList />
    </Suspense>
  )
}

export default OrderPage
