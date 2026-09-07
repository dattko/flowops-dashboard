"use client";

import { baseApiFetcherClient } from "@/shared/api/base/base-fetcher-client";
import { getApiErrorMessage } from "@/shared/api/base/utils";
import { normalizeKoreanPhone } from "@/entities/customer";

import type {
  CompleteOnboardingPayload,
  CustomerOnboarding,
} from "../model/types";

const getErrorMessage = (error: unknown, fallback: string) => {
  const message = getApiErrorMessage(error);
  if (message.toLowerCase().includes("already registered")) {
    return "이미 다른 계정에서 사용 중인 휴대폰 번호입니다.";
  }
  if (message.toLowerCase().includes("token")) {
    return "인증번호가 올바르지 않거나 만료되었습니다.";
  }
  if (/인증|휴대폰|고객|테스트|가상/.test(message)) {
    return message;
  }
  return fallback;
};

const getCustomerOnboarding = async (): Promise<CustomerOnboarding> => {
  return baseApiFetcherClient.post<CustomerOnboarding>(
    "/rest/v1/rpc/get_my_customer_onboarding",
  );
};

const sendPhoneVerification = async (phone: string) => {
  const normalizedPhone = normalizeKoreanPhone(phone);
  try {
    await baseApiFetcherClient.post<boolean>(
      "/rest/v1/rpc/request_test_phone_verification",
      { p_phone: normalizedPhone },
    );
  } catch (error) {
    throw new Error(getErrorMessage(error, "인증번호를 보내지 못했습니다."));
  }

  return { phone: normalizedPhone };
};

const verifyPhone = async ({ phone, token }: { phone: string; token: string }) => {
  const normalizedPhone = normalizeKoreanPhone(phone);
  try {
    await baseApiFetcherClient.post<boolean>(
      "/rest/v1/rpc/verify_test_customer_phone",
      { p_phone: normalizedPhone, p_code: token },
    );
  } catch (error) {
    throw new Error(getErrorMessage(error, "휴대폰 인증에 실패했습니다."));
  }

  return { phone: normalizedPhone };
};

const completeOnboarding = async (
  payload: CompleteOnboardingPayload,
): Promise<CustomerOnboarding> => {
  return baseApiFetcherClient.post<CustomerOnboarding>(
    "/rest/v1/rpc/complete_customer_onboarding",
    {
      p_recipient_name: payload.recipientName,
      p_postal_code: payload.postalCode,
      p_address_line1: payload.addressLine1,
      p_address_line2: payload.addressLine2 || null,
      p_delivery_message: payload.deliveryMessage || null,
      p_terms_accepted: payload.termsAccepted,
      p_marketing_opt_in: payload.marketingOptIn,
    },
  );
};

export {
  completeOnboarding,
  getCustomerOnboarding,
  sendPhoneVerification,
  verifyPhone,
};
