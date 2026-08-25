import { Suspense } from "react"

import { InventoryList } from "@/widgets/inventory-list"

const InventoryPage = () => {
  return (
    <Suspense fallback={null}>
      <InventoryList />
    </Suspense>
  )
}

export default InventoryPage
