import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AuthShell } from "@/features/auth";
import { CustomerOnboardingForm } from "@/features/customer-onboarding";
import { ROUTES } from "@/shared/config/routes";
import { createClient } from "@/shared/lib/supabase/server";

export const metadata: Metadata = {
  title: "가입 정보 입력",
  description: "휴대폰을 인증하고 기본 배송지를 등록하세요.",
};

const OnboardingPage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(ROUTES.login);

  return (
    <AuthShell
      eyebrow="MEMBER SETUP"
      title="가입을 마무리할게요"
      description="휴대폰 인증과 기본 배송지를 등록하면 바로 쇼핑을 시작할 수 있어요."
    >
      <CustomerOnboardingForm />
    </AuthShell>
  );
};

export default OnboardingPage;
