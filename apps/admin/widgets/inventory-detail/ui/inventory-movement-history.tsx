"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { History } from "lucide-react"

import {
  INVENTORY_MOVEMENT_TYPE_LABELS,
  type InventoryMovement,
} from "@/entities/inventory"
import { formatDateTime } from "@/shared/lib/dayjs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"
import { DataTable } from "@/shared/ui/data-table"

const columns: ColumnDef<InventoryMovement>[] = [
  {
    accessorKey: "createdAt",
    header: "일시",
    cell: ({ row }) => formatDateTime(row.original.createdAt),
    meta: {
      headerClassName: "pl-4",
      cellClassName: "pl-4 text-muted-foreground",
    },
  },
  {
    accessorKey: "movementType",
    header: "유형",
    cell: ({ row }) =>
      INVENTORY_MOVEMENT_TYPE_LABELS[row.original.movementType],
  },
  {
    accessorKey: "quantityDelta",
    header: "변경 수량",
    cell: ({ row }) => {
      const quantity = row.original.quantityDelta
      return `${quantity > 0 ? "+" : ""}${quantity.toLocaleString()}개`
    },
    meta: {
      headerClassName: "text-right",
      cellClassName: "text-right font-semibold",
    },
  },
  {
    id: "stockChange",
    header: "보유 재고",
    cell: ({ row }) =>
      `${row.original.previousOnHand.toLocaleString()} → ${row.original.resultingOnHand.toLocaleString()}개`,
    meta: {
      headerClassName: "text-right",
      cellClassName: "text-right text-muted-foreground",
    },
  },
  {
    accessorKey: "reason",
    header: "사유",
  },
  {
    accessorKey: "createdBy",
    header: "처리자",
    cell: ({ row }) => row.original.createdBy ?? "시스템",
    meta: {
      headerClassName: "pr-4",
      cellClassName: "pr-4 text-muted-foreground",
    },
  },
]

const InventoryMovementHistory = ({
  movements,
}: {
  movements: InventoryMovement[]
}) => {
  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex items-center gap-2">
          <History className="size-4 text-primary" aria-hidden="true" />
          <CardTitle>재고 변경 이력</CardTitle>
        </div>
        <CardDescription>최근 변경 내역을 최대 30건 표시합니다.</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <DataTable
            columns={columns}
            data={movements}
            getRowId={(movement) => String(movement.id)}
            emptyMessage="아직 기록된 재고 변경 내역이 없습니다."
            className="min-w-[840px]"
          />
        </div>
      </CardContent>
    </Card>
  )
}

export { InventoryMovementHistory }
