import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Select } from "./select"

const ORDER_STATUS_OPTIONS = [
  { label: "전체 상태", value: "all" },
  { label: "결제완료", value: "paid" },
  { label: "상품준비", value: "preparing" },
  { label: "배송중", value: "shipping" },
  { label: "배송완료", value: "delivered" },
  { label: "주문취소", value: "cancelled", disabled: true },
]

const meta: Meta<typeof Select> = {
  title: "Shared/Form/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
  args: {
    id: "order-status",
    label: "주문 상태",
    options: ORDER_STATUS_OPTIONS,
    defaultValue: "all",
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDescription: Story = {
  args: {
    description: "선택한 상태의 주문만 조회합니다.",
  },
}

export const Error: Story = {
  args: {
    error: "주문 상태를 선택해 주세요.",
  },
}

export const Disabled: Story = {
  args: {
    defaultValue: "shipping",
    disabled: true,
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="grid gap-5">
      <Select label="Small" options={ORDER_STATUS_OPTIONS} defaultValue="all" size="sm" />
      <Select label="Medium" options={ORDER_STATUS_OPTIONS} defaultValue="all" size="md" />
      <Select label="Large" options={ORDER_STATUS_OPTIONS} defaultValue="all" size="lg" />
    </div>
  ),
}
