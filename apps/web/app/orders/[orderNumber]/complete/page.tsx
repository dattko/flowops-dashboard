import type { Metadata } from "next"

import {
  OrderCompletePage,
  type OrderCompletePageProps,
} from "@/widgets/order-complete"

export const metadata: Metadata = {
  title: "주문 완료",
  description: "Morrow Coffee 테스트 결제 주문이 완료되었습니다.",
}

const Page = (props: OrderCompletePageProps) => <OrderCompletePage {...props} />

export default Page
