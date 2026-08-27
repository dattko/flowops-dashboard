import { useState } from "react"
import type { ComponentProps } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { DatePicker } from "./date-picker"

const ControlledDatePicker = ({
  value: initialValue,
  onValueChange,
  ...props
}: ComponentProps<typeof DatePicker>) => {
  const [value, setValue] = useState(initialValue)

  return (
    <DatePicker
      {...props}
      value={value}
      onValueChange={(nextValue) => {
        setValue(nextValue)
        onValueChange(nextValue)
      }}
    />
  )
}

const meta: Meta<typeof DatePicker> = {
  title: "Shared/Form/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
  args: {
    id: "report-date",
    label: "조회 날짜",
    value: "",
    onValueChange: () => undefined,
  },
  render: (args) => <ControlledDatePicker {...args} />,
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Selected: Story = {
  args: {
    value: "2026-08-27",
  },
}

export const WithDescription: Story = {
  args: {
    description: "해당 날짜의 매출 리포트를 조회합니다.",
  },
}

export const Error: Story = {
  args: {
    error: "조회 날짜를 선택해 주세요.",
  },
}

export const Disabled: Story = {
  args: {
    value: "2026-08-27",
    disabled: true,
  },
}
