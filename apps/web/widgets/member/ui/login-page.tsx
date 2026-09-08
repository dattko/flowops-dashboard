import { LoginForm } from "@/features/auth"

import { MemberShell } from "./member-shell"

export type LoginPageProps = {
  searchParams: Promise<{ error?: string }>
}

export const LoginPage = async ({ searchParams }: LoginPageProps) => {
  const { error } = await searchParams

  return (
    <MemberShell
      eyebrow="WELCOME BACK"
      title="다시 만나 반가워요"
      description="가입한 아이디와 비밀번호로 로그인해 주세요."
    >
      <LoginForm callbackError={error === "invalid_callback"} />
    </MemberShell>
  )
}
