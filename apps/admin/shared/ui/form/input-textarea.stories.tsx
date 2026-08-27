import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { InputTextarea } from "./input-textarea"

const meta: Meta<typeof InputTextarea> = {
  title: "Shared/Form/InputTextarea",
  component: InputTextarea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[420px]">
        <Story />
      </div>
    ),
  ],
  args: {
    id: "consultation-note",
    label: "상담 메모",
    placeholder: "고객 상담 내용을 입력해 주세요.",
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDescription: Story = {
  args: {
    description: "상담 메모는 작성 후 수정할 수 없습니다.",
  },
}

export const Error: Story = {
  args: {
    error: "상담 내용을 입력해 주세요.",
  },
}

export const Disabled: Story = {
  args: {
    defaultValue: "배송지 변경 요청이 처리되었습니다.",
    disabled: true,
  },
}
