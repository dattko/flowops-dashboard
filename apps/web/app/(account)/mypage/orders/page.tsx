import type { Metadata } from "next"

import {
  OrderHistoryPage,
  type OrderHistoryPageProps,
} from "@/widgets/order-history"

export const metadata: Metadata = {
  title: "주문 내역",
  description: "Morrow Coffee 주문과 배송 진행 상태를 확인하세요.",
}

const Page = (props: OrderHistoryPageProps) => <OrderHistoryPage {...props} />

export default Page
