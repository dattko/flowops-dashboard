"use client"

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table"

import { cn } from "@/shared/lib/utils"

export type DataTableColumnMeta = {
  headerClassName?: string
  cellClassName?: string
}

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  emptyMessage?: string
  getRowId?: (row: TData) => string
  className?: string
  onRowClick?: (row: TData) => void
}

export const DataTable = <TData, TValue>({
  columns,
  data,
  emptyMessage = "조회된 데이터가 없습니다.",
  getRowId,
  className,
  onRowClick,
}: DataTableProps<TData, TValue>) => {
  // TanStack Table returns non-memoizable functions by design.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getRowId,
  })

  return (
    <div className="overflow-x-auto">
      <table className={cn("w-full min-w-[860px] text-left", className)}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="type-caption border-b border-[#eeece6] bg-[#faf9f6] font-medium text-muted-foreground"
            >
              {headerGroup.headers.map((header) => {
                const meta = header.column.columnDef.meta as
                  | DataTableColumnMeta
                  | undefined

                return (
                  <th
                    key={header.id}
                    className={cn("px-4 py-3 font-medium", meta?.headerClassName)}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-[#f0eee8]">
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="type-label transition-colors hover:bg-[#faf9f6]"
                onClick={() => onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map((cell) => {
                  const meta = cell.column.columnDef.meta as
                    | DataTableColumnMeta
                    | undefined

                  return (
                    <td
                      key={cell.id}
                      className={cn("px-4 py-3.5", meta?.cellClassName)}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  )
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-12 text-center text-muted-foreground"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
