import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { FormMessage } from "./form-message"

const meta: Meta<typeof FormMessage> = {
  title: "Shared/Form/FormMessage",
  component: FormMessage,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultMessage: "변경할 내용을 확인한 후 저장해 주세요.",
  },
}

export const Success: Story = {
  args: {
    successMessage: "변경 사항을 저장했습니다.",
  },
}

export const Error: Story = {
  args: {
    errorMessage: "저장 중 문제가 발생했습니다. 다시 시도해 주세요.",
  },
}
