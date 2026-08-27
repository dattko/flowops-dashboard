import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Download, Plus } from "lucide-react"

import { Button } from "./button"
import { PageHeader } from "./page-header"

const meta: Meta<typeof PageHeader> = {
  title: "Shared/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-6xl p-8">
        <Story />
      </div>
    ),
  ],
  args: {
    eyebrow: "2026년 8월 27일 목요일",
    title: "좋은 오후예요, 황민님",
    description: "오늘 운영 현황에서 우선 확인할 내용을 정리했어요.",
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithActions: Story = {
  args: {
    title: "주문 관리",
    description: "고객 주문을 조회하고 처리 상태를 관리합니다.",
    eyebrow: undefined,
    actions: (
      <div className="flex gap-2">
        <Button variant="outline">
          <Download aria-hidden="true" />
          내려받기
        </Button>
        <Button>
          <Plus aria-hidden="true" />
          주문 등록
        </Button>
      </div>
    ),
  },
}

export const WithAccessory: Story = {
  args: {
    title: "주문 ORD-20260827-001",
    description: "2026년 8월 27일 오후 2시 30분 주문",
    eyebrow: "주문 상세",
    titleAccessory: (
      <span className="rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
        배송완료
      </span>
    ),
  },
}
