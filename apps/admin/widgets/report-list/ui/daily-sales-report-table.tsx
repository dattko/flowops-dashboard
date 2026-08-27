import { CalendarRange } from "lucide-react"

import { formatWon } from "@/shared/lib/currency"
import { dayjs } from "@/shared/lib/dayjs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"

import type { DailySalesReport } from "../model/types"

const DailySalesReportTable = ({
  dailySales,
}: {
  dailySales: DailySalesReport[]
}) => {
  return (
    <Card className="gap-0 py-0">
      <CardHeader className="border-b py-5">
        <div className="flex items-center gap-2">
          <CalendarRange className="size-4 text-primary" aria-hidden="true" />
          <CardTitle>일자별 실적</CardTitle>
        </div>
        <CardDescription>조회 기간의 주문 수와 매출입니다.</CardDescription>
      </CardHeader>
      <CardContent className="max-h-[520px] overflow-auto p-0">
        <Table className="min-w-[520px] text-sm">
          <TableHeader className="sticky top-0 z-10 bg-muted/95 text-xs text-muted-foreground backdrop-blur">
            <TableRow>
              <TableHead className="px-5">일자</TableHead>
              <TableHead className="text-right">주문 수</TableHead>
              <TableHead className="px-5 text-right">매출</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dailySales.map((dailySale) => (
              <TableRow key={dailySale.statDate}>
                <TableCell className="px-5 py-4 font-medium">
                  {dayjs(dailySale.statDate).format("YYYY.MM.DD (dd)")}
                </TableCell>
                <TableCell className="text-right">
                  {dailySale.orderCount.toLocaleString()}건
                </TableCell>
                <TableCell className="px-5 text-right font-semibold">
                  {formatWon(dailySale.grossRevenue)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export { DailySalesReportTable }
