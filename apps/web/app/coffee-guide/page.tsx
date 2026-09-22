import type { Metadata } from "next"

import { CoffeeGuidePage } from "@/widgets/coffee-guide"

export const metadata: Metadata = {
  title: "커피 취향 테스트",
  description: "세 가지 질문으로 내 취향에 맞는 모로우 커피를 찾아보세요.",
}

const Page = () => <CoffeeGuidePage />

export default Page
