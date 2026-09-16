import type { Metadata } from "next"

import { CheckoutPage } from "@/widgets/checkout"

export const metadata: Metadata = {
  title: "주문서",
  description: "배송 정보를 확인하고 포트폴리오용 테스트 결제를 진행하세요.",
}

const Page = () => <CheckoutPage />

export default Page
