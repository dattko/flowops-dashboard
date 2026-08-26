"use client"

import Link from "next/link"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowRight } from "lucide-react"

import {
  CustomerStatusBadge,
  type CustomerListItem,
} from "@/entities/customer"
import { formatWon } from "@/shared/lib/currency"
import { dayjs, formatDateTime } from "@/shared/lib/dayjs"
import { buttonVariants } from "@/shared/ui/button"
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
  {
    id: "actions",
    header: "관리",
    cell: ({ row }) => (
      <Link
        href={`/customers/${row.original.id}`}
        className={buttonVariants({ variant: "outline", size: "sm" })}
      >
        상세
        <ArrowRight aria-hidden="true" />
      </Link>
    ),
    meta: {
      headerClassName: "pr-6",
      cellClassName: "pr-6",
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
    />
  )
}

export { CustomerListTable }
