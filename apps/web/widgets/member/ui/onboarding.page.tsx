import { redirect } from "next/navigation"

import { CustomerOnboardingForm } from "@/features/customer-onboarding"
import { ROUTES } from "@/shared/config/routes"
import { createClient } from "@/shared/lib/supabase/server"

import { MemberShell } from "./member-shell"

export const OnboardingPage = async () => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect(ROUTES.login)

  return (
    <MemberShell
      eyebrow="MEMBER SETUP"
      title="가입을 마무리할게요"
      description="휴대폰 인증과 기본 배송지를 등록하면 바로 쇼핑을 시작할 수 있어요."
    >
      <CustomerOnboardingForm />
    </MemberShell>
  )
}
