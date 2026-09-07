import type { Metadata } from "next";

import { LoginForm } from "@/features/auth";
import { MemberShell } from "@/widgets/member-shell";

export const metadata: Metadata = {
  title: "로그인",
  description: "Morrow Coffee 계정으로 로그인하세요.",
};

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

const LoginPage = async ({ searchParams }: LoginPageProps) => {
  const { error } = await searchParams;

  return (
    <MemberShell
      eyebrow="WELCOME BACK"
      title="다시 만나 반가워요"
      description="가입한 아이디와 비밀번호로 로그인해 주세요."
    >
      <LoginForm callbackError={error === "invalid_callback"} />
    </MemberShell>
  );
};

export default LoginPage;
