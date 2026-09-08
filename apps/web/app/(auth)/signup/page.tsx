import type { Metadata } from "next"

import { SignupPage } from "@/widgets/member"

export const metadata: Metadata = {
  title: "회원가입",
  description: "Morrow Coffee 멤버십에 가입하세요.",
}

const Page = () => <SignupPage />

export default Page
