import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ArrowRight, Download } from "lucide-react"

import { Button } from "./button"

const meta: Meta<typeof Button> = {
  title: "Shared/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    children: "저장",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "outline",
        "secondary",
        "ghost",
        "destructive",
        "success",
        "warning",
        "info",
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "default", "lg", "xl"],
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>기본</Button>
      <Button variant="outline">외곽선</Button>
      <Button variant="secondary">보조</Button>
      <Button variant="ghost">고스트</Button>
      <Button variant="destructive">삭제</Button>
      <Button variant="success">승인</Button>
      <Button variant="warning">주의</Button>
      <Button variant="info">안내</Button>
      <Button variant="link">링크</Button>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="xs">아주 작게</Button>
      <Button size="sm">작게</Button>
      <Button>기본</Button>
      <Button size="lg">크게</Button>
      <Button size="xl">아주 크게</Button>
    </div>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button>
        <Download aria-hidden="true" />
        내려받기
      </Button>
      <Button variant="outline">
        주문 상세
        <ArrowRight aria-hidden="true" />
      </Button>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    children: "저장 중",
    disabled: true,
  },
}
