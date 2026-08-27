import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import type { InventoryStockStatus, ProductStatus } from "../model/types"
import { InventoryStockStatusBadge } from "./inventory-stock-status-badge"
import { ProductStatusBadge } from "./product-status-badge"

const STOCK_STATUSES: InventoryStockStatus[] = [
  "normal",
  "low_stock",
  "sold_out",
]
const PRODUCT_STATUSES: ProductStatus[] = ["active", "inactive"]

const meta: Meta<typeof InventoryStockStatusBadge> = {
  title: "Entities/Inventory/InventoryStatusBadge",
  component: InventoryStockStatusBadge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    status: "normal",
  },
  argTypes: {
    status: {
      control: "select",
      options: STOCK_STATUSES,
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const StockStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {STOCK_STATUSES.map((status) => (
        <InventoryStockStatusBadge key={status} status={status} />
      ))}
    </div>
  ),
}

export const ProductStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {PRODUCT_STATUSES.map((status) => (
        <ProductStatusBadge key={status} status={status} />
      ))}
    </div>
  ),
}
