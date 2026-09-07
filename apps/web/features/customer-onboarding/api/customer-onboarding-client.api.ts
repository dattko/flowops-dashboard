"use client";

import { createClient } from "@/shared/lib/supabase/client";

import type {
  CompleteOnboardingPayload,
  CustomerOnboarding,
} from "../model/types";

const normalizeKoreanPhone = (phone: string) => {
  const digits = phone.replace(/[^0-9]/g, "");
  return digits.startsWith("0") ? `+82${digits.slice(1)}` : `+${digits}`;
};

const getErrorMessage = (error: { message?: string } | null, fallback: string) => {
  if (!error?.message) return fallback;
  if (error.message.toLowerCase().includes("already registered")) {
    return "이미 다른 계정에서 사용 중인 휴대폰 번호입니다.";
  }
  if (error.message.toLowerCase().includes("token")) {
    return "인증번호가 올바르지 않거나 만료되었습니다.";
  }
  if (/인증|휴대폰|고객|테스트|가상/.test(error.message)) {
    return error.message;
  }
  return fallback;
};

const getCustomerOnboarding = async (): Promise<CustomerOnboarding> => {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_my_customer_onboarding");

  if (error || !data) {
    throw new Error("회원 정보를 불러오지 못했습니다.");
  }

  return data as CustomerOnboarding;
};

const sendPhoneVerification = async (phone: string) => {
  const supabase = createClient();
  const normalizedPhone = normalizeKoreanPhone(phone);
  const { error } = await supabase.rpc("request_test_phone_verification", {
    p_phone: normalizedPhone,
  });

  if (error) {
    throw new Error(getErrorMessage(error, "인증번호를 보내지 못했습니다."));
  }

  return { phone: normalizedPhone };
};

const verifyPhone = async ({ phone, token }: { phone: string; token: string }) => {
  const supabase = createClient();
  const normalizedPhone = normalizeKoreanPhone(phone);
  const { error } = await supabase.rpc("verify_test_customer_phone", {
    p_phone: normalizedPhone,
    p_code: token,
  });

  if (error) {
    throw new Error(getErrorMessage(error, "휴대폰 인증에 실패했습니다."));
  }

  return { phone: normalizedPhone };
};

const completeOnboarding = async (
  payload: CompleteOnboardingPayload,
): Promise<CustomerOnboarding> => {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("complete_customer_onboarding", {
    p_recipient_name: payload.recipientName,
    p_postal_code: payload.postalCode,
    p_address_line1: payload.addressLine1,
    p_address_line2: payload.addressLine2 || null,
    p_delivery_message: payload.deliveryMessage || null,
    p_terms_accepted: payload.termsAccepted,
    p_marketing_opt_in: payload.marketingOptIn,
  });

  if (error || !data) {
    throw new Error(error?.message ?? "가입 정보를 저장하지 못했습니다.");
  }

  return data as CustomerOnboarding;
};

export {
  completeOnboarding,
  getCustomerOnboarding,
  sendPhoneVerification,
  verifyPhone,
};
