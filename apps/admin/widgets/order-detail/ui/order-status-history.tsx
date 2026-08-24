import { History } from "lucide-react"

import {
  ORDER_STATUS_LABELS,
  type OrderStatusHistory as OrderStatusHistoryData,
} from "@/entities/order"
import { formatDateTime } from "@/shared/lib/dayjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Typography } from "@/shared/ui/typography"

export const OrderStatusHistory = ({
  statusHistory,
}: {
  statusHistory: OrderStatusHistoryData[]
}) => {
  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex items-center gap-2">
          <History className="size-4 text-primary" aria-hidden="true" />
          <CardTitle>처리 이력</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ol className="space-y-0">
          {statusHistory.map((history, index) => (
            <li
              key={history.id}
              className="relative grid grid-cols-[12px_1fr] gap-3 pb-5 last:pb-0"
            >
              {index < statusHistory.length - 1 ? (
                <span className="absolute left-[5px] top-3 h-full w-px bg-border" />
              ) : null}
              <span className="relative mt-1.5 size-3 rounded-full border-2 border-primary bg-card" />
              <div>
                <Typography variant="label">
                  {ORDER_STATUS_LABELS[history.status]}
                </Typography>
                {history.note ? (
                  <Typography variant="bodySmall" tone="muted" className="mt-1">
                    {history.note}
                  </Typography>
                ) : null}
                <Typography variant="caption" tone="muted" className="mt-1">
                  {history.changedBy ? `${history.changedBy} · ` : ""}
                  {formatDateTime(history.changedAt)}
                </Typography>
              </div>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}
