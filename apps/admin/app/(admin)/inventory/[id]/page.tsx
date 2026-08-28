import type { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  getInventoryDetail,
  InventoryDetail,
} from "@/widgets/inventory-detail"

type InventoryDetailPageProps = {
  params: Promise<{ id: string }>
}

export const generateMetadata = async ({
  params,
}: InventoryDetailPageProps): Promise<Metadata> => {
  const { id } = await params
  const inventory = await getInventoryDetail(id)

  if (!inventory) {
    return {
      title: "상품을 찾을 수 없음",
      description: "요청한 상품 정보를 찾을 수 없습니다.",
    }
  }

  return {
    title: inventory.name,
    description: `${inventory.name}의 재고 현황과 입출고 이력을 확인합니다.`,
  }
}

const InventoryDetailPage = async ({
  params,
}: InventoryDetailPageProps) => {
  const { id } = await params
  const inventory = await getInventoryDetail(id)

  if (!inventory) {
    notFound()
  }

  return <InventoryDetail initialInventory={inventory} />
}

export default InventoryDetailPage
