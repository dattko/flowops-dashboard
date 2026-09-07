"use client";

import { LoaderCircle, MapPin, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { CustomerConsentFields, ShippingAddressFields } from "@/entities/customer";
import { ROUTES } from "@/shared/config/routes";
import { Button } from "@/shared/ui/button";
import { FormMessage, InputText } from "@/shared/ui/form";

import { useSignupForm } from "../lib/use-signup-form";
import { KakaoAuthButton } from "./kakao-auth-button";

export const SignupForm = () => {
  const {
    form,
    submit,
    sendCode,
    verifyCode,
    codeSent,
    phoneVerified,
    isSending,
    isVerifying,
    isCreating,
  } = useSignupForm();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <form className="space-y-7" onSubmit={submit} noValidate>
      <section className="space-y-4" aria-labelledby="account-information-title">
        <div>
          <p className="text-xs font-bold tracking-[0.12em] text-coffee">01 · ACCOUNT</p>
          <h2 id="account-information-title" className="mt-1 text-lg font-semibold">계정 정보</h2>
        </div>
        <InputText id="signup-name" label="이름" autoComplete="name" placeholder="이름을 입력해 주세요" error={errors.name?.message} {...register("name")} />
        <InputText id="signup-login-id" label="로그인 아이디" autoComplete="username" placeholder="영문으로 시작하는 4~20자" error={errors.loginId?.message} {...register("loginId")} />
        <InputText id="signup-email" label="연락받을 이메일" type="email" autoComplete="email" placeholder="주문 안내를 받을 이메일" error={errors.email?.message} {...register("email")} />
        <div className="grid gap-4 sm:grid-cols-2">
          <InputText id="signup-password" label="비밀번호" type="password" autoComplete="new-password" placeholder="영문·숫자 포함 8자 이상" error={errors.password?.message} {...register("password")} />
          <InputText id="signup-password-confirm" label="비밀번호 확인" type="password" autoComplete="new-password" placeholder="한 번 더 입력해 주세요" error={errors.passwordConfirm?.message} {...register("passwordConfirm")} />
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
          <InputText id="signup-phone" label="휴대폰 번호" inputMode="tel" autoComplete="tel" placeholder="010-0000-0000" error={errors.phone?.message} readOnly={codeSent} {...register("phone")} />
          <Button type="button" variant="brand" className="h-12 rounded-xl sm:min-w-36" disabled={isSending} onClick={sendCode}>
            {isSending && <LoaderCircle className="animate-spin" aria-hidden="true" />}
            {isSending ? "전송 중..." : codeSent ? "인증번호 다시 받기" : "인증번호 받기"}
          </Button>
        </div>
        {codeSent && (
          <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
            <InputText id="signup-verification-code" label="인증번호" inputMode="numeric" autoComplete="one-time-code" maxLength={6} placeholder="123456" error={errors.verificationCode?.message} readOnly={phoneVerified} {...register("verificationCode")} />
            <Button type="button" variant="brand" className="h-12 rounded-xl sm:min-w-32" disabled={isVerifying || phoneVerified} onClick={verifyCode}>
              {isVerifying && <LoaderCircle className="animate-spin" aria-hidden="true" />}
              {isVerifying ? "확인 중..." : phoneVerified ? "인증 완료" : "인증하기"}
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
        <ShippingAddressFields
          postalCode={{ id: "signup-postal-code", error: errors.postalCode?.message, ...register("postalCode") }}
          addressLine1={{ id: "signup-address-line1", error: errors.addressLine1?.message, ...register("addressLine1") }}
          addressLine2={{ id: "signup-address-line2", error: errors.addressLine2?.message, ...register("addressLine2") }}
          deliveryMessage={{ id: "signup-delivery-message", error: errors.deliveryMessage?.message, ...register("deliveryMessage") }}
        />
      </section>

      <CustomerConsentFields
        control={form.control}
        termsName="termsAccepted"
        marketingName="marketingOptIn"
      />

      <FormMessage errorMessage={errors.root?.message} />

      <Button type="submit" variant="brand" size="lg" className="w-full" disabled={!phoneVerified || isCreating}>
        {isCreating && <LoaderCircle className="animate-spin" aria-hidden="true" />}
        {isCreating ? "가입 처리 중..." : "가입하기"}
      </Button>

      <KakaoAuthButton />
      <p className="text-center text-sm text-ink/60">이미 계정이 있으신가요?{" "}<Link href={ROUTES.login} className="font-semibold text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">로그인</Link></p>
    </form>
  );
};
