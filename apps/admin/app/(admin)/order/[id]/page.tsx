import { notFound } from "next/navigation"

import { getOrderDetail, OrderDetail } from "@/widgets/order-detail"

const OrderDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const order = await getOrderDetail(id)

  if (!order) {
    notFound()
  }

  return <OrderDetail initialOrder={order} />
}

export default OrderDetailPage
