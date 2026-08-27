import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { InputText } from "./input-text"

const meta: Meta<typeof InputText> = {
  title: "Shared/Form/InputText",
  component: InputText,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[360px]">
        <Story />
      </div>
    ),
  ],
  args: {
    id: "customer-email",
    label: "이메일",
    placeholder: "customer@example.com",
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDescription: Story = {
  args: {
    label: "SKU",
    defaultValue: "BEAN-ETH-001",
    description: "영문 대문자와 숫자로 입력해 주세요.",
  },
}

export const Error: Story = {
  args: {
    defaultValue: "invalid-email",
    error: "올바른 이메일 형식을 입력해 주세요.",
  },
}

export const Disabled: Story = {
  args: {
    defaultValue: "admin@morrow.coffee",
    disabled: true,
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="grid gap-5">
      <InputText id="input-small" label="Small" size="sm" placeholder="작은 입력창" />
      <InputText id="input-medium" label="Medium" size="md" placeholder="기본 입력창" />
      <InputText id="input-large" label="Large" size="lg" placeholder="큰 입력창" />
    </div>
  ),
}
