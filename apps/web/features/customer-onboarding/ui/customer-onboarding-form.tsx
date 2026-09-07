"use client";

import { Check, LoaderCircle, MapPin, ShieldCheck } from "lucide-react";

import { CustomerConsentFields, ShippingAddressFields } from "@/entities/customer";
import { Button } from "@/shared/ui/button";
import { FormMessage, InputText } from "@/shared/ui/form";

import { useCustomerOnboardingForm } from "../lib/use-customer-onboarding-form";

const StepBadge = ({ active, done, children }: { active: boolean; done: boolean; children: React.ReactNode }) => (
  <div className="flex items-center gap-2">
    <span
      className={`grid size-7 place-items-center rounded-full text-xs font-bold ${
        active || done ? "bg-coffee text-white" : "bg-cream text-ink/45"
      }`}
    >
      {done ? <Check className="size-3.5" aria-hidden="true" /> : children}
    </span>
  </div>
);

const CustomerOnboardingForm = () => {
  const {
    form,
    step,
    sentPhone,
    sendCode,
    verifyCode,
    submit,
    isLoading,
    isSending,
    isVerifying,
    isSaving,
  } = useCustomerOnboardingForm();
  const { errors } = form.formState;

  if (isLoading) {
    return (
      <div className="flex min-h-44 items-center justify-center text-sm text-ink/55">
        <LoaderCircle className="mr-2 size-4 animate-spin" aria-hidden="true" />
        회원 정보를 준비하고 있어요.
      </div>
    );
  }

  return (
    <form className="space-y-7" onSubmit={submit} noValidate>
      <ol className="flex items-center gap-3 border-b border-ink/10 pb-5 text-sm font-semibold">
        <li className="flex items-center gap-2">
          <StepBadge active={step === "phone"} done={step === "address"}>1</StepBadge>
          <span className={step === "phone" ? "text-ink" : "text-ink/50"}>휴대폰 인증</span>
        </li>
        <li className="h-px flex-1 bg-ink/10" aria-hidden="true" />
        <li className="flex items-center gap-2">
          <StepBadge active={step === "address"} done={false}>2</StepBadge>
          <span className={step === "address" ? "text-ink" : "text-ink/40"}>배송 정보</span>
        </li>
      </ol>

      {step === "phone" ? (
        <section className="space-y-5" aria-labelledby="phone-step-title">
          <div className="flex gap-3 rounded-2xl border border-leaf/15 bg-leaf/5 p-4">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-leaf" aria-hidden="true" />
            <div>
              <h2 id="phone-step-title" className="text-sm font-semibold">무료 테스트 인증 모드</h2>
              <p className="mt-1 text-xs leading-5 text-ink/60">
                실제 문자는 발송되지 않습니다. 테스트 번호는 010-5550-0001부터
                010-5550-0010까지, 인증번호는 123456을 사용해 주세요.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
            <InputText
              id="onboarding-phone"
              label="휴대폰 번호"
              inputMode="tel"
              autoComplete="tel"
              placeholder="010-0000-0000"
              error={errors.phone?.message}
              disabled={Boolean(sentPhone)}
              {...form.register("phone")}
            />
            <Button
              type="button"
              variant="outline"
              className="h-12 rounded-xl sm:min-w-28"
              disabled={isSending || Boolean(sentPhone)}
              onClick={sendCode}
            >
              {isSending && <LoaderCircle className="animate-spin" aria-hidden="true" />}
              {sentPhone ? "발송 완료" : "인증번호 받기"}
            </Button>
          </div>

          {sentPhone && (
            <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
              <InputText
                id="onboarding-code"
                label="인증번호"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                placeholder="6자리 숫자"
                error={errors.verificationCode?.message}
                {...form.register("verificationCode")}
              />
              <Button
                type="button"
                variant="brand"
                className="h-12 rounded-xl sm:min-w-28"
                disabled={isVerifying}
                onClick={verifyCode}
              >
                {isVerifying && <LoaderCircle className="animate-spin" aria-hidden="true" />}
                인증하기
              </Button>
            </div>
          )}
        </section>
      ) : (
        <section className="space-y-5" aria-labelledby="address-step-title">
          <div className="flex items-start gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-cream text-coffee">
              <MapPin className="size-4" aria-hidden="true" />
            </span>
            <div>
              <h2 id="address-step-title" className="font-semibold">기본 배송지를 알려주세요</h2>
              <p className="mt-1 text-sm text-ink/55">첫 주문부터 빠르게 불러올 수 있도록 안전하게 저장할게요.</p>
            </div>
          </div>

          <ShippingAddressFields
            recipientName={{ id: "recipient-name", error: errors.recipientName?.message, ...form.register("recipientName") }}
            postalCode={{ id: "postal-code", error: errors.postalCode?.message, ...form.register("postalCode") }}
            addressLine1={{ id: "address-line1", error: errors.addressLine1?.message, ...form.register("addressLine1") }}
            addressLine2={{ id: "address-line2", error: errors.addressLine2?.message, ...form.register("addressLine2") }}
            deliveryMessage={{ id: "delivery-message", error: errors.deliveryMessage?.message, ...form.register("deliveryMessage") }}
          />

          <CustomerConsentFields
            control={form.control}
            termsName="termsAccepted"
            marketingName="marketingOptIn"
          />

          <Button type="submit" variant="brand" size="lg" className="w-full" disabled={isSaving}>
            {isSaving && <LoaderCircle className="animate-spin" aria-hidden="true" />}
            {isSaving ? "가입 정보를 저장하는 중..." : "가입 완료"}
          </Button>
        </section>
      )}

      <FormMessage errorMessage={errors.root?.message} />
    </form>
  );
};

export { CustomerOnboardingForm };
