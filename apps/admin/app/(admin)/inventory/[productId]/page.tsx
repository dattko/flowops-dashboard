import { notFound } from "next/navigation"

import {
  getInventoryDetail,
  InventoryDetail,
} from "@/widgets/inventory-detail"

const InventoryDetailPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>
}) => {
  const { productId } = await params
  const inventory = await getInventoryDetail(productId)

  if (!inventory) {
    notFound()
  }

  return <InventoryDetail initialInventory={inventory} />
}

export default InventoryDetailPage
