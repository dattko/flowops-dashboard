"use client";

import { LoaderCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/shared/ui/button";
import { FormMessage, InputText } from "@/shared/ui/form";
import { ROUTES } from "@/shared/config/routes";

import { useLoginForm } from "../lib/use-login-form";
import { KakaoAuthButton } from "./kakao-auth-button";

type LoginFormProps = {
  callbackError?: boolean;
};

export const LoginForm = ({ callbackError = false }: LoginFormProps) => {
  const { form, submit, isPending, errorMessage } = useLoginForm({ callbackError });
  const { register, formState: { errors } } = form;

  return (
    <form className="space-y-5" onSubmit={submit} noValidate>
      <InputText
        id="login-id"
        label="아이디"
        autoComplete="username"
        placeholder="아이디를 입력해 주세요"
        error={errors.loginId?.message}
        {...register("loginId")}
      />
      <InputText
        id="login-password"
        label="비밀번호"
        type="password"
        autoComplete="current-password"
        placeholder="비밀번호를 입력해 주세요"
        error={errors.password?.message}
        {...register("password")}
      />

      <FormMessage errorMessage={errorMessage} />

      <Button type="submit" variant="brand" size="lg" className="w-full" disabled={isPending}>
        {isPending && <LoaderCircle className="animate-spin" aria-hidden="true" />}
        {isPending ? "로그인 중..." : "로그인"}
      </Button>

      <KakaoAuthButton />

      <p className="text-center text-sm text-ink/60">
        아직 계정이 없으신가요?{" "}
        <Link href={ROUTES.signup} className="font-semibold text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
          회원가입
        </Link>
      </p>
    </form>
  );
};
