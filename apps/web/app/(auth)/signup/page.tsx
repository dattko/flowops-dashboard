import type { Metadata } from "next";

import { AuthShell, SignupForm } from "@/features/auth";

export const metadata: Metadata = {
  title: "회원가입",
  description: "Morrow Coffee 멤버십에 가입하세요.",
};

const SignupPage = () => {
  return (
    <AuthShell
      eyebrow="JOIN MORROW"
      title="취향을 이어갈 계정을 만드세요"
      description="사용할 아이디와 연락처, 기본 배송지를 입력해 주세요."
    >
      <SignupForm />
    </AuthShell>
  );
};

export default SignupPage;
