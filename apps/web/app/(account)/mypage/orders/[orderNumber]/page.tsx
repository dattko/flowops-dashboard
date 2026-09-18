import type { Metadata } from "next"

import {
  OrderDetailPage,
  type OrderDetailPageProps,
} from "@/widgets/order-detail"

export const metadata: Metadata = {
  title: "주문 상세",
  description: "주문 상품과 결제, 배송 진행 상황을 확인하세요.",
}

const Page = (props: OrderDetailPageProps) => <OrderDetailPage {...props} />

export default Page
