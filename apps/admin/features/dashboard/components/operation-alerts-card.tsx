import { CircleAlert } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeading } from "@/components/ui/section-heading"
import { Typography } from "@/components/ui/typography"
import { operationAlerts } from "@/features/dashboard/data/mock-data"

export const OperationAlertsCard = () => {
  return (
    <Card className="gap-0 rounded-none border border-[#e3e0d8] bg-white py-0 shadow-[0_1px_2px_rgba(42,39,31,0.03)] ring-0">
      <CardContent className="p-5">
      <div className="flex items-center justify-between">
        <SectionHeading title="운영 알림" description="우선 확인이 필요한 항목" />
        <Badge variant="secondary" className="type-caption bg-warning/10 font-semibold text-warning">
          {operationAlerts.length}건
        </Badge>
      </div>
      <div className="mt-4 divide-y divide-[#eeece6]">
        {operationAlerts.map((alert) => (
          <div key={alert.title} className="flex gap-3 py-3 first:pt-1 last:pb-0">
            <div
              className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg ${
                alert.tone === "danger"
                  ? "bg-destructive/10 text-destructive"
                  : "bg-warning/10 text-warning"
              }`}
            >
              <CircleAlert className="size-4" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <Typography variant="label" className="font-semibold">
                {alert.title}
              </Typography>
              <Typography variant="caption" tone="muted" className="mt-0.5">
                {alert.description}
              </Typography>
            </div>
          </div>
        ))}
      </div>
      </CardContent>
    </Card>
  )
}
