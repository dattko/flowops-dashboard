import type { Metadata } from "next"

import { CartPage } from "@/widgets/cart"

export const metadata: Metadata = {
  title: "장바구니",
  description: "선택한 모로우 커피 상품과 결제 예정 금액을 확인하세요.",
}

const Page = () => <CartPage />

export default Page
