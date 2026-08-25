import { Package } from "lucide-react"

import type { OrderDetailItem } from "@/entities/order"
import { formatWon } from "@/shared/lib/currency"
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

type OrderItemsCardProps = {
  items: OrderDetailItem[]
  totalAmount: number
}

export const OrderItemsCard = ({
  items,
  totalAmount,
}: OrderItemsCardProps) => {
  return (
    <Card className="gap-0 py-0">
      <CardHeader className="border-b py-5">
        <div className="flex items-center gap-2">
          <Package className="size-4 text-primary" aria-hidden="true" />
          <CardTitle>주문 상품</CardTitle>
        </div>
        <CardDescription>
          총 {items.length}종 · {formatWon(totalAmount)}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table className="min-w-[620px] text-sm">
          <TableHeader className="bg-muted/45 text-xs text-muted-foreground">
            <TableRow>
              <TableHead className="px-5">상품</TableHead>
              <TableHead>단가</TableHead>
              <TableHead className="text-center">수량</TableHead>
              <TableHead className="px-5 text-right">합계</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-border/70">
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="px-5 py-4">
                  <div className="font-semibold">{item.name}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    SKU {item.sku ?? "-"}
                  </div>
                </TableCell>
                <TableCell className="py-4 text-muted-foreground">
                  {formatWon(item.unitPrice)}
                </TableCell>
                <TableCell className="py-4 text-center">
                  {item.quantity}
                </TableCell>
                <TableCell className="px-5 py-4 text-right font-semibold">
                  {formatWon(item.totalAmount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
