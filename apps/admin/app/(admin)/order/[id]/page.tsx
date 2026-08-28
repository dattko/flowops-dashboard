import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getOrderDetail, OrderDetail } from "@/widgets/order-detail"

type OrderDetailPageProps = {
  params: Promise<{ id: string }>
}

export const generateMetadata = async ({
  params,
}: OrderDetailPageProps): Promise<Metadata> => {
  const { id } = await params
  const order = await getOrderDetail(id)

  if (!order) {
    return {
      title: "주문을 찾을 수 없음",
      description: "요청한 주문 정보를 찾을 수 없습니다.",
    }
  }

  return {
    title: `주문 ${order.orderNumber}`,
    description: `${order.orderNumber} 주문의 처리 상태, 결제, 배송 정보를 확인합니다.`,
  }
}

const OrderDetailPage = async ({
  params,
}: OrderDetailPageProps) => {
  const { id } = await params
  const order = await getOrderDetail(id)

  if (!order) {
    notFound()
  }

  return <OrderDetail initialOrder={order} />
}

export default OrderDetailPage
