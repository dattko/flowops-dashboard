import type { Metadata } from "next"

import { InventoryProductCreateForm } from "@/features/create-inventory-product"

export const metadata: Metadata = {
  title: "상품 등록",
  description: "새로운 상품과 초기 재고 정보를 등록합니다.",
}

const InventoryProductCreatePage = () => {
  return <InventoryProductCreateForm />
}

export default InventoryProductCreatePage
