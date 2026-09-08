import type { Metadata } from "next"

import { CustomerProfilePage } from "@/widgets/member"

export const metadata: Metadata = {
  title: "내 정보 수정",
  description: "회원 정보와 기본 배송지를 관리하세요.",
}

const Page = () => <CustomerProfilePage />

export default Page
