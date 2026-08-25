import { Boxes, PackageCheck, PackageOpen, ShieldCheck } from "lucide-react"

import type { InventoryDetail } from "@/entities/inventory"
import { Card, CardContent } from "@/shared/ui/card"
import { Typography } from "@/shared/ui/typography"

const InventoryStockSummary = ({
  inventory,
}: {
  inventory: InventoryDetail
}) => {
  const items = [
    {
      label: "보유 재고",
      value: inventory.onHand,
      icon: Boxes,
    },
    {
      label: "예약 재고",
      value: inventory.reserved,
      icon: PackageOpen,
    },
    {
      label: "판매 가능",
      value: inventory.available,
      icon: PackageCheck,
    },
    {
      label: "안전 재고",
      value: inventory.reorderPoint,
      icon: ShieldCheck,
    },
  ]

  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} size="sm">
          <CardContent className="flex items-center justify-between gap-4">
            <div>
              <Typography variant="label" tone="muted">
                {item.label}
              </Typography>
              <Typography variant="sectionTitle" className="mt-1">
                {item.value.toLocaleString()}개
              </Typography>
            </div>
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <item.icon className="size-4" aria-hidden="true" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export { InventoryStockSummary }
