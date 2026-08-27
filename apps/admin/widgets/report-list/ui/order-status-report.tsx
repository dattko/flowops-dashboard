import { ListChecks } from "lucide-react"

import { ORDER_STATUS_LABELS } from "@/entities/order"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"
import { Typography } from "@/shared/ui/typography"

import type { OrderStatusReport as OrderStatusReportItem } from "../model/types"

const OrderStatusReport = ({
  statusDistribution,
}: {
  statusDistribution: OrderStatusReportItem[]
}) => {
  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex items-center gap-2">
          <ListChecks className="size-4 text-primary" aria-hidden="true" />
          <CardTitle>주문 상태 분포</CardTitle>
        </div>
        <CardDescription>조회 기간의 상태별 주문 건수입니다.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {statusDistribution.length > 0 ? (
          statusDistribution.map((item) => (
            <div
              key={item.status}
              className="flex items-center justify-between gap-4 rounded-lg border px-4 py-3"
            >
              <Typography variant="bodySmall" tone="muted">
                {ORDER_STATUS_LABELS[item.status]}
              </Typography>
              <Typography variant="bodySmall" className="font-semibold">
                {item.orderCount.toLocaleString()}건
              </Typography>
            </div>
          ))
        ) : (
          <Typography variant="bodySmall" tone="muted">
            조회 기간의 주문이 없습니다.
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export { OrderStatusReport }
