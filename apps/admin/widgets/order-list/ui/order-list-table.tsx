"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { OrderStatusBadge } from "@/entities/order"
import { ROUTES } from "@/shared/config/routes"
import { formatWon } from "@/shared/lib/currency"
import { dayjs } from "@/shared/lib/dayjs"
import { DataTable } from "@/shared/ui/data-table"

import type { OrderListItem } from "../model/types"

type OrderListTableProps = {
  orders: OrderListItem[]
  emptyMessage?: string
}

const ORDER_COLUMNS: ColumnDef<OrderListItem>[] = [
  {
    accessorKey: "orderNumber",
    header: "주문번호",
    cell: ({ row }) => (
      <span className="font-medium text-foreground">
        {row.original.orderNumber}
      </span>
    ),
    meta: {
      headerClassName: "pl-6",
      cellClassName: "pl-6",
    },
  },
  {
    accessorKey: "orderedAt",
    header: "주문일시",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {dayjs(row.original.orderedAt).tz().format("YYYY.MM.DD HH:mm")}
      </span>
    ),
  },
  {
    accessorKey: "customerName",
    header: "고객",
    cell: ({ row }) => (
      <div>
        <div className="font-semibold text-foreground">
          {row.original.customerName}
        </div>
        <div className="mt-0.5 text-muted-foreground">
          {row.original.customerEmail ?? "이메일 없음"}
        </div>
      </div>
    ),
  },
  {
    id: "products",
    header: "상품",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.original.itemCount}종 · 총 {row.original.totalQuantity}개
      </span>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: "결제금액",
    cell: ({ row }) => (
      <span className="font-semibold text-foreground">
        {formatWon(row.original.totalAmount)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ row }) => (
      <OrderStatusBadge status={row.original.status} />
    ),
    meta: {
      headerClassName: "pr-6",
      cellClassName: "pr-6",
    },
  },
]

export const OrderListTable = ({
  orders,
  emptyMessage,
}: OrderListTableProps) => {
  return (
    <DataTable
      columns={ORDER_COLUMNS}
      data={orders}
      getRowId={(order) => order.id}
      emptyMessage={emptyMessage}
      onRowClick={(order) => {
        window.location.href = ROUTES.orders.detail(order.id)
      }}
    />
  )
}
