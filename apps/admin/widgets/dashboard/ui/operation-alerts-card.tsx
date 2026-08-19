import { CircleAlert } from "lucide-react"

import type { LowStockProduct } from "@/entities/dashboard"
import { Badge } from "@/shared/ui/badge"
import { Card, CardContent } from "@/shared/ui/card"
import { SectionHeading } from "@/shared/ui/section-heading"
import { Typography } from "@/shared/ui/typography"

type OperationAlertsCardProps = {
  lowStockProducts: readonly LowStockProduct[]
}

export const OperationAlertsCard = ({ lowStockProducts }: OperationAlertsCardProps) => {
  const visibleLowStockProducts = lowStockProducts.slice(0, 2)
  return (
    <Card className="gap-0 rounded-none border border-[#e3e0d8] bg-white py-0 shadow-[0_1px_2px_rgba(42,39,31,0.03)] ring-0">
      <CardContent className="p-5">
      <div className="flex items-center justify-between">
        <SectionHeading title="운영 알림" description="우선 확인이 필요한 항목" />
        <Badge variant="secondary" className="type-caption bg-warning/10 font-semibold text-warning">
          {visibleLowStockProducts.length}건
        </Badge>
      </div>
      <div className="mt-4 divide-y divide-[#eeece6]">
        {visibleLowStockProducts.map((product) => (
          <div key={product.product_name} className="flex gap-3 py-3 first:pt-1 last:pb-0">
            <div
              className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg ${
                product.available === 0
                  ? "bg-destructive/10 text-destructive"
                  : "bg-warning/10 text-warning"
              }`}
            >
              <CircleAlert className="size-4" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <Typography variant="label" className="font-semibold">
                {product.product_name} 재고 부족
              </Typography>
              <Typography variant="caption" tone="muted" className="mt-0.5">
                현재 {product.available}개 · 안전 재고 {product.reorder_point}개
              </Typography>
            </div>
          </div>
        ))}
      </div>
      </CardContent>
    </Card>
  )
}
