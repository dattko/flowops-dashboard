import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import type { CustomerStatus } from "../model/types"
import { CustomerStatusBadge } from "./customer-status-badge"

const CUSTOMER_STATUSES: CustomerStatus[] = ["active", "inactive", "blocked"]

const meta: Meta<typeof CustomerStatusBadge> = {
  title: "Entities/Customer/CustomerStatusBadge",
  component: CustomerStatusBadge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    status: "active",
  },
  argTypes: {
    status: {
      control: "select",
      options: CUSTOMER_STATUSES,
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {CUSTOMER_STATUSES.map((status) => (
        <CustomerStatusBadge key={status} status={status} />
      ))}
    </div>
  ),
}
