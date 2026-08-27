import { notFound } from "next/navigation"

import {
  getInventoryDetail,
  InventoryDetail,
} from "@/widgets/inventory-detail"

const InventoryDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const inventory = await getInventoryDetail(id)

  if (!inventory) {
    notFound()
  }

  return <InventoryDetail initialInventory={inventory} />
}

export default InventoryDetailPage
