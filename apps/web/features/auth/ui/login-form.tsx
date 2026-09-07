"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/shared/ui/button";
import { ROUTES } from "@/shared/config/routes";

import { login } from "../api/auth-server.action";
import { loginSchema, type LoginValues } from "../model/auth-schema";
import { AuthField } from "./auth-field";
import { KakaoAuthButton } from "./kakao-auth-button";

type LoginFormProps = {
  callbackError?: boolean;
};

export const LoginForm = ({ callbackError = false }: LoginFormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { loginId: "", password: "" },
  });
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (result) => {
      if (result?.error) {
        setError("root", { message: result.error });
        return;
      }

      if (result?.redirectTo) {
        router.replace(result.redirectTo);
        router.refresh();
      }
    },
    onError: () => {
      setError("root", {
        message: "로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.",
      });
    },
  });

  const onSubmit = handleSubmit((values) => {
    loginMutation.mutate(values);
  });
  const isPending = isSubmitting || loginMutation.isPending;

  const rootError =
    errors.root?.message ??
    (callbackError ? "인증 링크가 만료되었거나 올바르지 않습니다." : undefined);

  return (
    <form className="space-y-5" onSubmit={onSubmit} noValidate>
      <AuthField
        id="login-id"
        label="아이디"
        autoComplete="username"
        placeholder="아이디를 입력해 주세요"
        error={errors.loginId?.message}
        {...register("loginId")}
      />
      <AuthField
        id="login-password"
        label="비밀번호"
        type="password"
        autoComplete="current-password"
        placeholder="비밀번호를 입력해 주세요"
        error={errors.password?.message}
        {...register("password")}
      />

      {rootError && (
        <p role="alert" className="rounded-xl bg-coral/10 px-4 py-3 text-sm font-medium text-[#a13f28]">
          {rootError}
        </p>
      )}

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
