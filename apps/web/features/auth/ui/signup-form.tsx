"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle, MapPin, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { ROUTES } from "@/shared/config/routes";
import { Button } from "@/shared/ui/button";

import { signup } from "../api/auth-server.action";
import { signupSchema, type SignupValues } from "../model/auth-schema";
import { AuthField } from "./auth-field";
import { KakaoAuthButton } from "./kakao-auth-button";

export const SignupForm = () => {
  const router = useRouter();
  const [codeSent, setCodeSent] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      loginId: "",
      email: "",
      password: "",
      passwordConfirm: "",
      phone: "010-5550-0001",
      verificationCode: "",
      postalCode: "",
      addressLine1: "",
      addressLine2: "",
      deliveryMessage: "",
      termsAccepted: false,
      marketingOptIn: false,
    },
  });
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    formState: { errors },
  } = form;

  const sendCodeMutation = useMutation({
    mutationFn: async (phone: string) => {
      const digits = phone.replace(/[^0-9]/g, "");
      const isTestPhone =
        /^0105550000[1-9]$/.test(digits) || digits === "01055500010";

      if (!isTestPhone) {
        throw new Error("무료 테스트 번호 010-5550-0001~0010을 입력해 주세요.");
      }
    },
    onSuccess: () => {
      setCodeSent(true);
      setPhoneVerified(false);
      clearErrors();
    },
    onError: (error: Error) => {
      setError("phone", { message: error.message });
    },
  });
  const signupMutation = useMutation({
    mutationFn: signup,
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
        message: "회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요.",
      });
    },
  });
  const verifyMutation = useMutation({
    mutationFn: async (code: string) => {
      if (code.trim() !== "123456") {
        throw new Error("인증번호가 올바르지 않습니다.");
      }
    },
    onSuccess: () => {
      window.alert("인증 완료");
      setPhoneVerified(true);
      clearErrors();
    },
    onError: (error: Error) => {
      setPhoneVerified(false);
      setError("verificationCode", { message: error.message });
    },
  });

  const onSubmit = handleSubmit((values) => {
    clearErrors();
    if (!phoneVerified) {
      setError("phone", { message: "휴대폰 인증을 완료해 주세요." });
      return;
    }
    signupMutation.mutate(values);
  });

  const onSendCode = async () => {
    const isPhoneValid = await form.trigger("phone");
    if (!isPhoneValid) return;

    sendCodeMutation.mutate(getValues("phone"));
  };

  const onVerify = () => {
    const code = getValues("verificationCode").trim();
    if (!/^\d{6}$/.test(code)) {
      setError("verificationCode", {
        message: "인증번호 6자리를 입력해 주세요.",
      });
      return;
    }
    clearErrors("verificationCode");
    verifyMutation.mutate(code);
  };

  const isCreating = signupMutation.isPending;

  return (
    <form className="space-y-7" onSubmit={onSubmit} noValidate>
      <section className="space-y-4" aria-labelledby="account-information-title">
        <div>
          <p className="text-xs font-bold tracking-[0.12em] text-coffee">01 · ACCOUNT</p>
          <h2 id="account-information-title" className="mt-1 text-lg font-semibold">계정 정보</h2>
        </div>
        <AuthField id="signup-name" label="이름" autoComplete="name" placeholder="이름을 입력해 주세요" error={errors.name?.message} {...register("name")} />
        <AuthField id="signup-login-id" label="로그인 아이디" autoComplete="username" placeholder="영문으로 시작하는 4~20자" error={errors.loginId?.message} {...register("loginId")} />
        <AuthField id="signup-email" label="연락받을 이메일" type="email" autoComplete="email" placeholder="주문 안내를 받을 이메일" error={errors.email?.message} {...register("email")} />
        <div className="grid gap-4 sm:grid-cols-2">
          <AuthField id="signup-password" label="비밀번호" type="password" autoComplete="new-password" placeholder="영문·숫자 포함 8자 이상" error={errors.password?.message} {...register("password")} />
          <AuthField id="signup-password-confirm" label="비밀번호 확인" type="password" autoComplete="new-password" placeholder="한 번 더 입력해 주세요" error={errors.passwordConfirm?.message} {...register("passwordConfirm")} />
        </div>
      </section>

      <section className="space-y-4 border-t border-ink/10 pt-6" aria-labelledby="phone-information-title">
        <div className="flex items-start gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-leaf/10 text-leaf"><ShieldCheck className="size-4" aria-hidden="true" /></span>
          <div>
            <p className="text-xs font-bold tracking-[0.12em] text-coffee">02 · VERIFY</p>
            <h2 id="phone-information-title" className="mt-1 text-lg font-semibold">휴대폰 인증</h2>
            <p className="mt-1 text-xs leading-5 text-ink/55">무료 테스트 번호 010-5550-0001~0010 · 인증번호 123456</p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <AuthField id="signup-phone" label="휴대폰 번호" inputMode="tel" autoComplete="tel" placeholder="010-0000-0000" error={errors.phone?.message} readOnly={codeSent} {...register("phone")} />
          <Button type="button" variant="brand" className="h-12 rounded-xl sm:min-w-36" disabled={sendCodeMutation.isPending} onClick={onSendCode}>
            {sendCodeMutation.isPending && <LoaderCircle className="animate-spin" aria-hidden="true" />}
            {sendCodeMutation.isPending ? "전송 중..." : codeSent ? "인증번호 다시 받기" : "인증번호 받기"}
          </Button>
        </div>
        {codeSent && (
          <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
            <AuthField id="signup-verification-code" label="인증번호" inputMode="numeric" autoComplete="one-time-code" maxLength={6} placeholder="123456" error={errors.verificationCode?.message} readOnly={phoneVerified} {...register("verificationCode")} />
            <Button type="button" variant="brand" className="h-12 rounded-xl sm:min-w-32" disabled={verifyMutation.isPending || phoneVerified} onClick={onVerify}>
              {verifyMutation.isPending && <LoaderCircle className="animate-spin" aria-hidden="true" />}
              {verifyMutation.isPending ? "확인 중..." : phoneVerified ? "인증 완료" : "인증하기"}
            </Button>
          </div>
        )}
      </section>

      <section className="space-y-4 border-t border-ink/10 pt-6" aria-labelledby="shipping-information-title">
        <div className="flex items-start gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-cream text-coffee"><MapPin className="size-4" aria-hidden="true" /></span>
          <div>
            <p className="text-xs font-bold tracking-[0.12em] text-coffee">03 · SHIPPING</p>
            <h2 id="shipping-information-title" className="mt-1 text-lg font-semibold">기본 배송지</h2>
          </div>
        </div>
        <AuthField id="signup-postal-code" label="우편번호" inputMode="numeric" autoComplete="postal-code" maxLength={5} placeholder="우편번호 5자리" error={errors.postalCode?.message} {...register("postalCode")} />
        <AuthField id="signup-address-line1" label="기본 주소" autoComplete="address-line1" placeholder="도로명 주소를 입력해 주세요" error={errors.addressLine1?.message} {...register("addressLine1")} />
        <AuthField id="signup-address-line2" label="상세 주소" autoComplete="address-line2" placeholder="동·호수 등 상세 주소" error={errors.addressLine2?.message} {...register("addressLine2")} />
        <AuthField id="signup-delivery-message" label="배송 메모 (선택)" placeholder="예: 문 앞에 놓아주세요" error={errors.deliveryMessage?.message} {...register("deliveryMessage")} />
      </section>

      <div className="space-y-2 rounded-2xl bg-cream/55 p-4 text-sm leading-5">
        <label className="flex cursor-pointer items-start gap-3">
          <input type="checkbox" className="mt-0.5 size-4 accent-coffee" {...register("termsAccepted")} />
          <span><strong className="font-semibold">[필수]</strong> 이용약관 및 개인정보 수집·이용에 동의합니다.{errors.termsAccepted?.message && <span className="mt-1 block text-xs font-medium text-coral">{errors.termsAccepted.message}</span>}</span>
        </label>
        <label className="flex cursor-pointer items-start gap-3">
          <input type="checkbox" className="mt-0.5 size-4 accent-coffee" {...register("marketingOptIn")} />
          <span><strong className="font-semibold">[선택]</strong> 신상품과 할인 소식을 받아봅니다.</span>
        </label>
      </div>

      {errors.root?.message && <p role="alert" className="rounded-xl bg-coral/10 px-4 py-3 text-sm font-medium text-[#a13f28]">{errors.root.message}</p>}

      <Button type="submit" variant="brand" size="lg" className="w-full" disabled={!phoneVerified || isCreating}>
        {isCreating && <LoaderCircle className="animate-spin" aria-hidden="true" />}
        {isCreating ? "가입 처리 중..." : "가입하기"}
      </Button>

      <KakaoAuthButton />
      <p className="text-center text-sm text-ink/60">이미 계정이 있으신가요?{" "}<Link href={ROUTES.login} className="font-semibold text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">로그인</Link></p>
    </form>
  );
};
