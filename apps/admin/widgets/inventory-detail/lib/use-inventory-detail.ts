"use client"

import { useState } from "react"

import type { InventoryDetail } from "@/entities/inventory"

const useInventoryDetail = (initialInventory: InventoryDetail) => {
  const [inventory, setInventory] = useState(initialInventory)

  return {
    inventory,
    updateInventory: setInventory,
  }
}

export { useInventoryDetail }
