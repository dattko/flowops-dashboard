import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Button } from "./button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"

const meta: Meta<typeof Card> = {
  title: "Shared/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>재고 알림</CardTitle>
        <CardDescription>안전 재고 이하 상품을 확인해 주세요.</CardDescription>
        <CardAction>
          <Button size="sm" variant="outline">
            전체 보기
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>에티오피아 구지 G1 · 현재 4개</CardContent>
      <CardFooter>마지막 갱신 10분 전</CardFooter>
    </Card>
  ),
}

export const Panel: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <Card appearance="panel" className="w-[560px]">
      <CardHeader className="border-b p-5">
        <CardTitle>최근 주문</CardTitle>
        <CardDescription>최근 접수된 주문 4건입니다.</CardDescription>
      </CardHeader>
      <CardContent className="p-5">목록 또는 차트가 배치되는 패널입니다.</CardContent>
    </Card>
  ),
}
