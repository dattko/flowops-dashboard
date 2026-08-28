"use client"

import type { ColumnDef } from "@tanstack/react-table"

import {
  CustomerStatusBadge,
  type CustomerListItem,
} from "@/entities/customer"
import { formatWon } from "@/shared/lib/currency"
import { ROUTES } from "@/shared/config/routes"
import { dayjs, formatDateTime } from "@/shared/lib/dayjs"
import { DataTable } from "@/shared/ui/data-table"

const columns: ColumnDef<CustomerListItem>[] = [
  {
    accessorKey: "name",
    header: "고객",
    cell: ({ row }) => (
      <div>
        <div className="font-semibold text-foreground">{row.original.name}</div>
        <div className="mt-0.5 text-muted-foreground">
          {row.original.email}
        </div>
      </div>
    ),
    meta: {
      headerClassName: "pl-6",
      cellClassName: "pl-6",
    },
  },
  {
    accessorKey: "phone",
    header: "연락처",
    cell: ({ row }) => row.original.phone ?? "-",
    meta: {
      cellClassName: "text-muted-foreground",
    },
  },
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ row }) => <CustomerStatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "totalOrders",
    header: "누적 주문",
    cell: ({ row }) => `${row.original.totalOrders.toLocaleString()}건`,
    meta: {
      headerClassName: "text-right",
      cellClassName: "text-right font-semibold",
    },
  },
  {
    accessorKey: "totalSpent",
    header: "누적 구매 금액",
    cell: ({ row }) => formatWon(row.original.totalSpent),
    meta: {
      headerClassName: "text-right",
      cellClassName: "text-right font-semibold text-foreground",
    },
  },
  {
    accessorKey: "lastOrderedAt",
    header: "최근 주문",
    cell: ({ row }) => formatDateTime(row.original.lastOrderedAt),
    meta: {
      cellClassName: "text-muted-foreground",
    },
  },
  {
    accessorKey: "createdAt",
    header: "가입일",
    cell: ({ row }) => dayjs(row.original.createdAt).format("YYYY.MM.DD"),
    meta: {
      cellClassName: "text-muted-foreground",
    },
  },
]

type CustomerListTableProps = {
  customers: CustomerListItem[]
  emptyMessage?: string
}

const CustomerListTable = ({
  customers,
  emptyMessage,
}: CustomerListTableProps) => {
  return (
    <DataTable
      columns={columns}
      data={customers}
      getRowId={(customer) => customer.id}
      emptyMessage={emptyMessage}
      className="min-w-[1140px]"
      onRowClick={(customer) => {
        window.location.href = ROUTES.customers.detail(customer.id)
      }}
    />
  )
}

export { CustomerListTable }
