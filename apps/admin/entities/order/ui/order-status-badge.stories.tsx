import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import type { OrderStatus } from "../model/types"
import { OrderStatusBadge } from "./order-status-badge"

const ORDER_STATUSES: OrderStatus[] = [
  "paid",
  "preparing",
  "shipping",
  "delivered",
  "cancelled",
]

const meta: Meta<typeof OrderStatusBadge> = {
  title: "Entities/Order/OrderStatusBadge",
  component: OrderStatusBadge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    status: "paid",
  },
  argTypes: {
    status: {
      control: "select",
      options: ORDER_STATUSES,
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {ORDER_STATUSES.map((status) => (
        <OrderStatusBadge key={status} status={status} />
      ))}
    </div>
  ),
}
