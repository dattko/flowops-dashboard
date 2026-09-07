"use client";

import { LoaderCircle, MapPin, ShieldCheck, UserRound } from "lucide-react";

import {
  CustomerConsentFields,
  formatKoreanPhone,
  ShippingAddressFields,
} from "@/entities/customer";
import { Button } from "@/shared/ui/button";
import { FormMessage, InputText } from "@/shared/ui/form";

import { useCustomerProfileForm } from "../lib/use-customer-profile-form";
import type { CustomerProfile } from "../model/types";

const CustomerProfileForm = ({
  initialProfile,
}: {
  initialProfile: CustomerProfile;
}) => {
  const { form, profile, submit, saved, isLoading, isError, isSaving } =
    useCustomerProfileForm(initialProfile);
  const { errors } = form.formState;

  if (isLoading) {
    return (
      <div className="flex min-h-56 items-center justify-center text-sm text-ink/55">
        <LoaderCircle className="mr-2 size-4 animate-spin" aria-hidden="true" />
        내 정보를 불러오고 있어요.
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="rounded-2xl bg-coral/10 px-5 py-4 text-sm font-medium text-[#a13f28]">
        내 정보를 불러오지 못했습니다. 페이지를 새로고침해 주세요.
      </div>
    );
  }

  return (
    <form className="space-y-7" onSubmit={submit} noValidate>
      <section className="space-y-4" aria-labelledby="profile-account-title">
        <div className="flex items-start gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-coffee/10 text-coffee">
            <UserRound className="size-4" aria-hidden="true" />
          </span>
          <div>
            <h2 id="profile-account-title" className="font-semibold">기본 정보</h2>
            <p className="mt-1 text-xs text-ink/50">로그인 아이디는 변경할 수 없습니다.</p>
          </div>
        </div>
        <InputText id="profile-login-id" label="로그인 아이디" value={profile.loginId ?? "카카오 로그인 회원"} readOnly className="bg-cream/45 text-ink/55" />
        <div className="grid gap-4 sm:grid-cols-2">
          <InputText id="profile-name" label="이름" autoComplete="name" error={errors.name?.message} {...form.register("name")} />
          <InputText id="profile-email" label="연락받을 이메일" type="email" autoComplete="email" error={errors.email?.message} {...form.register("email")} />
        </div>
        <div>
          <InputText id="profile-phone" label="휴대폰 번호" value={formatKoreanPhone(profile.phone) || "등록된 번호가 없습니다."} readOnly className="bg-cream/45 text-ink/55" />
          {profile.phoneVerified && (
            <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-leaf">
              <ShieldCheck className="size-3.5" aria-hidden="true" /> 인증 완료된 번호입니다.
            </p>
          )}
        </div>
      </section>

      <section className="space-y-4 border-t border-ink/10 pt-6" aria-labelledby="profile-address-title">
        <div className="flex items-start gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-cream text-coffee">
            <MapPin className="size-4" aria-hidden="true" />
          </span>
          <div>
            <h2 id="profile-address-title" className="font-semibold">기본 배송지</h2>
            <p className="mt-1 text-xs text-ink/50">주문할 때 기본으로 불러올 주소입니다.</p>
          </div>
        </div>
        <ShippingAddressFields
          postalCode={{ id: "profile-postal-code", error: errors.postalCode?.message, ...form.register("postalCode") }}
          addressLine1={{ id: "profile-address-line1", error: errors.addressLine1?.message, ...form.register("addressLine1") }}
          addressLine2={{ id: "profile-address-line2", error: errors.addressLine2?.message, ...form.register("addressLine2") }}
          deliveryMessage={{ id: "profile-delivery-message", error: errors.deliveryMessage?.message, ...form.register("deliveryMessage") }}
        />
      </section>

      <CustomerConsentFields control={form.control} marketingName="marketingOptIn" />

      <FormMessage
        errorMessage={errors.root?.message}
        successMessage={saved ? "내 정보가 저장되었습니다." : undefined}
      />

      <Button type="submit" variant="brand" size="lg" className="w-full" disabled={isSaving}>
        {isSaving && <LoaderCircle className="animate-spin" aria-hidden="true" />}
        {isSaving ? "저장하는 중..." : "변경사항 저장"}
      </Button>
    </form>
  );
};

export { CustomerProfileForm };
