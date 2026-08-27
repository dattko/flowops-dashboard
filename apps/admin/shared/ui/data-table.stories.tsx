import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ColumnDef } from "@tanstack/react-table"

import { formatWon } from "@/shared/lib/currency"

import { DataTable } from "./data-table"

type CoffeeOrder = {
  orderNumber: string
  customerName: string
  productName: string
  amount: number
  status: string
}

const columns: ColumnDef<CoffeeOrder>[] = [
  {
    accessorKey: "orderNumber",
    header: "주문번호",
  },
  {
    accessorKey: "customerName",
    header: "고객",
  },
  {
    accessorKey: "productName",
    header: "주문 상품",
  },
  {
    accessorKey: "amount",
    header: "결제 금액",
    cell: ({ row }) => formatWon(row.original.amount),
    meta: {
      headerClassName: "text-right",
      cellClassName: "text-right font-semibold",
    },
  },
  {
    accessorKey: "status",
    header: "상태",
  },
]

const orders: CoffeeOrder[] = [
  {
    orderNumber: "ORD-20260827-001",
    customerName: "김하늘",
    productName: "에티오피아 구지 G1",
    amount: 28000,
    status: "결제완료",
  },
  {
    orderNumber: "ORD-20260827-002",
    customerName: "이서준",
    productName: "콜롬비아 디카페인",
    amount: 42000,
    status: "상품준비",
  },
  {
    orderNumber: "ORD-20260827-003",
    customerName: "박지민",
    productName: "Morrow 드립백 세트",
    amount: 36000,
    status: "배송중",
  },
]

const OrderTablePreview = ({ empty = false }: { empty?: boolean }) => {
  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <DataTable
        columns={columns}
        data={empty ? [] : orders}
        getRowId={(order) => order.orderNumber}
        className="min-w-[720px]"
        emptyMessage="조건에 맞는 주문이 없습니다."
      />
    </div>
  )
}

const meta: Meta<typeof OrderTablePreview> = {
  title: "Shared/DataTable",
  component: OrderTablePreview,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const WithData: Story = {}

export const Empty: Story = {
  args: {
    empty: true,
  },
}
