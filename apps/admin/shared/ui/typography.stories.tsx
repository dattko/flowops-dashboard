import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Typography } from "./typography"

const meta: Meta<typeof Typography> = {
  title: "Shared/Typography",
  component: Typography,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  args: {
    children: "Morrow Coffee 운영 현황",
    variant: "body",
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Hierarchy: Story = {
  render: () => (
    <div className="grid gap-5">
      <Typography variant="display">Display · Morrow Coffee</Typography>
      <Typography variant="pageTitle">Page Title · 주문 관리</Typography>
      <Typography variant="sectionTitle">Section Title · 오늘 운영 현황</Typography>
      <Typography variant="cardTitle">Card Title · 주문 상품</Typography>
      <Typography variant="metric">₩12,840,000</Typography>
      <Typography variant="body">Body · 오늘 접수된 주문을 확인하세요.</Typography>
      <Typography variant="bodySmall" tone="muted">
        Body Small · 마지막 갱신 10분 전
      </Typography>
      <Typography variant="label">Label · 주문번호</Typography>
      <Typography variant="caption" tone="muted">
        Caption · 필수 입력 항목입니다.
      </Typography>
      <Typography variant="overline" tone="primary">
        Overline · FlowOps
      </Typography>
    </div>
  ),
}

export const Tones: Story = {
  render: () => (
    <div className="grid gap-2">
      <Typography>기본 텍스트</Typography>
      <Typography tone="muted">보조 텍스트</Typography>
      <Typography tone="primary">강조 텍스트</Typography>
      <Typography tone="success">성공 메시지</Typography>
      <Typography tone="warning">주의 메시지</Typography>
      <Typography tone="destructive">오류 메시지</Typography>
    </div>
  ),
}
