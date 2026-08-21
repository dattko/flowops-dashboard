"use client"

import { Card, CardContent } from "@/shared/ui/card"
import { Typography } from "@/shared/ui/typography"

import { useOrdersQuery } from "../lib/use-orders-query"
import { OrderTable } from "./order-table"

export const OrderList = () => {
  const { data: orders = [] } = useOrdersQuery()

  return (
    <section aria-labelledby="order-list-title">
      <div>
        <Typography as="h1" id="order-list-title" variant="pageTitle">
          주문 관리
        </Typography>
        <Typography variant="body" tone="muted" className="mt-2">
          자사몰에서 접수된 주문 내역입니다.
        </Typography>
      </div>

      <Card className="mt-7 gap-0 rounded-none border border-[#e3e0d8] bg-white py-0 shadow-[0_1px_2px_rgba(42,39,31,0.03)] ring-0">
        <CardContent className="p-0">
          <OrderTable orders={orders} />
        </CardContent>
      </Card>
    </section>
  )
}
