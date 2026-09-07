"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { ROUTES } from "@/shared/config/routes";
import { createClient } from "@/shared/lib/supabase/server";
import { normalizeKoreanPhone } from "@/entities/customer";

import { loginSchema, type LoginValues } from "../model/login-schema";
import { signupSchema, type SignupValues } from "../model/signup-schema";

type AuthActionResult = {
  error?: string;
  redirectTo?: string;
};

const getLoginEmail = (loginId: string) =>
  loginId.includes("@")
    ? loginId.trim().toLowerCase()
    : `${loginId.trim().toLowerCase()}@members.morrowcoffee.com`;

const getAuthCallbackUrl = async () => {
  const requestHeaders = await headers();
  const forwardedHost = requestHeaders.get("x-forwarded-host");
  const forwardedProto = requestHeaders.get("x-forwarded-proto");
  const vercelUrl = process.env.VERCEL_URL;
  const origin =
    requestHeaders.get("origin") ??
    (forwardedHost
      ? `${forwardedProto ?? "https"}://${forwardedHost}`
      : undefined) ??
    (vercelUrl ? `https://${vercelUrl}` : undefined) ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3001";
  const callbackUrl = new URL(ROUTES.authCallback, origin);
  callbackUrl.searchParams.set("next", ROUTES.home);

  return callbackUrl.toString();
};

const getClient = async () => {
  try {
    return await createClient();
  } catch (error) {
    console.error("[web-auth] Supabase configuration error", error);
    return null;
  }
};

const login = async (values: LoginValues): Promise<AuthActionResult> => {
  const parsed = loginSchema.safeParse(values);

  if (!parsed.success) {
    return { error: "입력한 아이디와 비밀번호를 다시 확인해 주세요." };
  }

  const supabase = await getClient();
  if (!supabase) {
    return { error: "로그인 설정을 확인할 수 없습니다. 잠시 후 다시 시도해 주세요." };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: getLoginEmail(parsed.data.loginId),
    password: parsed.data.password,
  });

  if (error) {
    return { error: "아이디 또는 비밀번호가 올바르지 않습니다." };
  }

  return { redirectTo: ROUTES.home };
};

const signup = async (values: SignupValues): Promise<AuthActionResult> => {
  const parsed = signupSchema.safeParse(values);

  if (!parsed.success) {
    return { error: "회원가입 정보를 다시 확인해 주세요." };
  }

  const supabase = await getClient();
  if (!supabase) {
    return { error: "회원가입 설정을 확인할 수 없습니다. 잠시 후 다시 시도해 주세요." };
  }

  const { data, error } = await supabase.auth.signUp({
    email: getLoginEmail(parsed.data.loginId),
    password: parsed.data.password,
    options: {
      emailRedirectTo: await getAuthCallbackUrl(),
      data: {
        display_name: parsed.data.name,
        login_id: parsed.data.loginId.trim().toLowerCase(),
        contact_email: parsed.data.email,
        role: "customer",
      },
    },
  });

  if (error) {
    if (error.message.toLowerCase().includes("already")) {
      return { error: "이미 사용 중인 아이디입니다. 다른 아이디를 입력해 주세요." };
    }

    return { error: "회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요." };
  }

  if (data.session) {
    const { error: verificationError } = await supabase.rpc(
      "verify_test_customer_phone",
      {
        p_phone: normalizeKoreanPhone(parsed.data.phone),
        p_code: parsed.data.verificationCode,
      },
    );

    if (verificationError) {
      console.error("[web-auth] Phone verification failed", verificationError);
      return { error: verificationError.message };
    }

    const { error: onboardingError } = await supabase.rpc(
      "complete_customer_onboarding",
      {
        p_recipient_name: parsed.data.name,
        p_postal_code: parsed.data.postalCode,
        p_address_line1: parsed.data.addressLine1,
        p_address_line2: parsed.data.addressLine2 || null,
        p_delivery_message: parsed.data.deliveryMessage || null,
        p_terms_accepted: parsed.data.termsAccepted,
        p_marketing_opt_in: parsed.data.marketingOptIn,
      },
    );

    if (onboardingError) {
      console.error("[web-auth] Onboarding completion failed", onboardingError);
      return { error: "배송지 정보를 저장하지 못했습니다. 잠시 후 다시 시도해 주세요." };
    }

    revalidatePath(ROUTES.home, "layout");
    return { redirectTo: ROUTES.home };
  }

  return {
    error:
      "이메일 확인 없이 가입하도록 Supabase 설정을 변경하는 중입니다. 잠시 후 다시 시도해 주세요.",
  };
};

const loginWithKakao = async (): Promise<AuthActionResult> => {
  const supabase = await getClient();

  if (!supabase) {
    return { error: "카카오 로그인 설정을 확인할 수 없습니다. 잠시 후 다시 시도해 주세요." };
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: await getAuthCallbackUrl(),
    },
  });

  if (error || !data.url) {
    console.error("[web-auth] Kakao OAuth start failed", error);
    return { error: "카카오 로그인을 시작하지 못했습니다. 잠시 후 다시 시도해 주세요." };
  }

  redirect(data.url);
};

const logout = async () => {
  const supabase = await getClient();

  if (supabase) {
    await supabase.auth.signOut();
  }

  revalidatePath(ROUTES.home, "layout");
  redirect(ROUTES.home);
};

export { login, loginWithKakao, logout, signup };
