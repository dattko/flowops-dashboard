"use client"
import type { ColumnDef } from "@tanstack/react-table"

import {
  InventoryStockStatusBadge,
  ProductStatusBadge,
  type InventoryItem,
} from "@/entities/inventory"
import { dayjs } from "@/shared/lib/dayjs"
import { ROUTES } from "@/shared/config/routes"
import { DataTable } from "@/shared/ui/data-table"

type InventoryListTableProps = {
  inventoryItems: InventoryItem[]
  emptyMessage?: string
}

const columns: ColumnDef<InventoryItem>[] = [
  {
    accessorKey: "name",
    header: "상품",
    cell: ({ row }) => (
      <div>
        <div className="font-semibold text-foreground">{row.original.name}</div>
        <div className="mt-0.5 text-muted-foreground">
          SKU {row.original.sku}
        </div>
      </div>
    ),
    meta: {
      headerClassName: "pl-6",
      cellClassName: "pl-6",
    },
  },
  {
    accessorKey: "productStatus",
    header: "상품 상태",
    cell: ({ row }) => (
      <ProductStatusBadge status={row.original.productStatus} />
    ),
  },
  {
    accessorKey: "onHand",
    header: "보유",
    cell: ({ row }) => row.original.onHand.toLocaleString(),
    meta: {
      headerClassName: "text-right",
      cellClassName: "text-right font-semibold text-foreground",
    },
  },
  {
    accessorKey: "reserved",
    header: "예약",
    cell: ({ row }) => row.original.reserved.toLocaleString(),
    meta: {
      headerClassName: "text-right",
      cellClassName: "text-right text-muted-foreground",
    },
  },
  {
    accessorKey: "available",
    header: "판매 가능",
    cell: ({ row }) => row.original.available.toLocaleString(),
    meta: {
      headerClassName: "text-right",
      cellClassName: "text-right font-semibold text-foreground",
    },
  },
  {
    accessorKey: "reorderPoint",
    header: "안전 재고",
    cell: ({ row }) => row.original.reorderPoint.toLocaleString(),
    meta: {
      headerClassName: "text-right",
      cellClassName: "text-right text-muted-foreground",
    },
  },
  {
    accessorKey: "stockStatus",
    header: "재고 상태",
    cell: ({ row }) => (
      <InventoryStockStatusBadge status={row.original.stockStatus} />
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "최근 수정",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {dayjs(row.original.updatedAt).tz().format("YYYY.MM.DD HH:mm")}
      </span>
    ),
  }
]

const InventoryListTable = ({
  inventoryItems,
  emptyMessage,
}: InventoryListTableProps) => {
  return (
    <DataTable
      columns={columns}
      data={inventoryItems}
      getRowId={(inventory) => inventory.productId}
      emptyMessage={emptyMessage}
      className="min-w-[1080px]"
      onRowClick={(inventoryItem) => {
        window.location.href = ROUTES.inventory.detail(inventoryItem.productId)
      }}
    />
  )
}

export { InventoryListTable }
