import type { Metadata } from "next"
import { Suspense } from "react"

import { InventoryList } from "@/widgets/inventory-list"

export const metadata: Metadata = {
  title: "재고 관리",
  description: "상품별 보유, 예약, 판매 가능 재고와 재고 상태를 관리합니다.",
}

const InventoryPage = () => {
  return (
    <Suspense fallback={null}>
      <InventoryList />
    </Suspense>
  )
}

export default InventoryPage
