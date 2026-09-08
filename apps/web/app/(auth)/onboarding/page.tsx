import type { Metadata } from "next"

import { OnboardingPage } from "@/widgets/member"

export const metadata: Metadata = {
  title: "가입 정보 입력",
  description: "휴대폰을 인증하고 기본 배송지를 등록하세요.",
}

const Page = () => <OnboardingPage />

export default Page
