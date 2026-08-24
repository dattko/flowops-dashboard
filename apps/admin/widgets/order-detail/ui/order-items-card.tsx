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
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="bg-muted/45 text-xs text-muted-foreground">
              <tr>
                <th scope="col" className="px-5 py-3 font-medium">상품</th>
                <th scope="col" className="px-4 py-3 font-medium">단가</th>
                <th scope="col" className="px-4 py-3 text-center font-medium">수량</th>
                <th scope="col" className="px-5 py-3 text-right font-medium">합계</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/70">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="px-5 py-4">
                    <div className="font-semibold">{item.name}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      SKU {item.sku ?? "-"}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">
                    {formatWon(item.unitPrice)}
                  </td>
                  <td className="px-4 py-4 text-center">{item.quantity}</td>
                  <td className="px-5 py-4 text-right font-semibold">
                    {formatWon(item.totalAmount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
