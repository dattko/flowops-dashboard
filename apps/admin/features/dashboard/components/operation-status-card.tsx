import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeading } from "@/components/ui/section-heading"
import { Typography } from "@/components/ui/typography"

export function OperationStatusCard() {
  return (
    <Card className="gap-0 rounded-none border border-[#e3e0d8] bg-white py-0 shadow-[0_1px_2px_rgba(42,39,31,0.03)] ring-0">
      <CardContent className="p-5">
      <div className="flex items-center justify-between">
        <SectionHeading title="오늘 처리 현황" description="전체 주문 142건 기준" />
        <Button variant="ghost" size="icon-sm" aria-label="처리 현황 상세 보기">
          <ChevronRight aria-hidden="true" />
        </Button>
      </div>
      <div className="mt-6 flex items-center gap-6">
        <div
          className="relative grid size-28 shrink-0 place-items-center rounded-full"
          style={{ background: "conic-gradient(#d7753f 0 86%, #eeeae1 86% 100%)" }}
          role="img"
          aria-label="오늘 주문 처리율 86퍼센트"
        >
          <div className="grid size-[86px] place-items-center rounded-full bg-white text-center">
            <div>
              <Typography variant="metric">86%</Typography>
              <Typography variant="caption" tone="muted">처리 완료</Typography>
            </div>
          </div>
        </div>
        <dl className="min-w-0 flex-1 space-y-3">
          <StatusRow label="배송 완료" value="72" color="bg-[#3d8672]" />
          <StatusRow label="배송 중" value="52" color="bg-[#d6b76d]" />
          <StatusRow label="처리 대기" value="18" color="bg-[#ddd9cf]" />
        </dl>
      </div>
      </CardContent>
    </Card>
  )
}

function StatusRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="type-label flex items-center justify-between gap-3">
      <dt className="flex items-center gap-2 text-muted-foreground">
        <span className={`size-2 rounded-full ${color}`} />
        {label}
      </dt>
      <dd className="font-semibold text-foreground">{value}</dd>
    </div>
  )
}
