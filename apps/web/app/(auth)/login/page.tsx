import type { Metadata } from "next"

import { LoginPage, type LoginPageProps } from "@/widgets/member"

export const metadata: Metadata = {
  title: "로그인",
  description: "Morrow Coffee 계정으로 로그인하세요.",
}

const Page = (props: LoginPageProps) => <LoginPage {...props} />

export default Page
