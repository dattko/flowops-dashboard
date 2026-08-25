"use client"

import type { InventoryDetail as InventoryDetailData } from "@/entities/inventory"
import { InventoryStockAdjustmentForm } from "@/features/adjust-inventory-stock"
import { InventoryProductUpdateForm } from "@/features/update-inventory-product"

import { useInventoryDetail } from "../lib/use-inventory-detail"
import { InventoryDetailHeader } from "./inventory-detail-header"
import { InventoryMovementHistory } from "./inventory-movement-history"
import { InventoryStockSummary } from "./inventory-stock-summary"

const InventoryDetail = ({
  initialInventory,
}: {
  initialInventory: InventoryDetailData
}) => {
  const { inventory, updateInventory } = useInventoryDetail(initialInventory)

  return (
    <section aria-labelledby="inventory-detail-title">
      <InventoryDetailHeader inventory={inventory} />
      <InventoryStockSummary inventory={inventory} />

      <div className="mt-5 grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-5">
          <InventoryProductUpdateForm
            inventory={inventory}
            onUpdated={updateInventory}
          />
          <InventoryMovementHistory movements={inventory.movements} />
        </div>

        <aside className="xl:sticky xl:top-8">
          <InventoryStockAdjustmentForm
            inventory={inventory}
            onUpdated={updateInventory}
          />
        </aside>
      </div>
    </section>
  )
}

export { InventoryDetail }
