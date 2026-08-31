"use server"

import { revalidatePath } from "next/cache"
import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"

import {
  POLICY_COOKIE_MAX_AGE_SECONDS,
  SESSION_POLICY_COOKIE,
  createShortSessionPolicy,
} from "@/shared/lib/auth/session-policy"
import {
  createAdminClient,
  findAuthUserByEmail,
} from "@/shared/lib/supabase/admin"
import { createClient } from "@/shared/lib/supabase/server"
import { ROUTES } from "@/shared/config/routes"

import { loginSchema, type LoginValues } from "../model/login-schema"
import {
  findPasswordSchema,
  resetPasswordSchema,
  type FindPasswordValues,
  type ResetPasswordValues,
} from "../model/password-schema"

const login = async (values: LoginValues) => {
  const parsed = loginSchema.safeParse(values)

  if (!parsed.success) {
    return {
      error: "입력값을 다시 확인해 주세요.",
    }
  }

  const supabase = await createClient()
  const { email, password, rememberMe } = parsed.data
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return {
      error: "이메일 또는 비밀번호가 올바르지 않습니다.",
    }
  }

  const cookieStore = await cookies()

  if (rememberMe) {
    cookieStore.delete(SESSION_POLICY_COOKIE)
  } else {
    cookieStore.set(SESSION_POLICY_COOKIE, createShortSessionPolicy(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: POLICY_COOKIE_MAX_AGE_SECONDS,
    })
  }

  revalidatePath(ROUTES.dashboard, "layout")
  redirect(ROUTES.dashboard)
}

const demoLogin = async () => {
  const demoEmail = process.env.DEMO_ACCOUNT_EMAIL?.trim().toLowerCase()

  if (!demoEmail) {
    return { error: "데모 계정이 아직 설정되지 않았습니다." }
  }

  try {
    const adminClient = createAdminClient()
    const demoUser = await findAuthUserByEmail(adminClient, demoEmail)

    if (
      !demoUser ||
      demoUser.app_metadata.demo !== true ||
      demoUser.app_metadata.role !== "admin" ||
      demoUser.app_metadata.admin_status !== "active"
    ) {
      return { error: "사용 가능한 데모 계정을 확인할 수 없습니다." }
    }

    const { data, error: linkError } =
      await adminClient.auth.admin.generateLink({
        type: "magiclink",
        email: demoEmail,
      })

    if (linkError || !data.properties?.hashed_token) {
      throw linkError ?? new Error("데모 로그인 토큰을 생성하지 못했습니다.")
    }

    const supabase = await createClient()
    const { data: sessionData, error: verifyError } =
      await supabase.auth.verifyOtp({
        token_hash: data.properties.hashed_token,
        type: "magiclink",
      })

    if (verifyError || sessionData.user?.id !== demoUser.id) {
      throw verifyError ?? new Error("데모 계정 세션을 확인하지 못했습니다.")
    }

    const cookieStore = await cookies()
    cookieStore.set(SESSION_POLICY_COOKIE, createShortSessionPolicy(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: POLICY_COOKIE_MAX_AGE_SECONDS,
    })
  } catch (error) {
    console.error("[demo-login] failed", error)
    return { error: "데모 로그인에 실패했습니다. 잠시 후 다시 시도해 주세요." }
  }

  revalidatePath(ROUTES.dashboard, "layout")
  redirect(ROUTES.dashboard)
}

const logout = async () => {
  const supabase = await createClient()
  const cookieStore = await cookies()
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error("로그아웃에 실패했습니다.")
  }

  cookieStore.delete(SESSION_POLICY_COOKIE)

  revalidatePath(ROUTES.dashboard, "layout")
  redirect(ROUTES.login)
}

const requestPasswordReset = async (values: FindPasswordValues) => {
  const parsed = findPasswordSchema.safeParse(values)

  if (!parsed.success) {
    return { error: "입력한 이메일을 다시 확인해 주세요." }
  }

  const requestHeaders = await headers()
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ?? requestHeaders.get("origin")

  if (!origin) {
    return { error: "서비스 주소를 확인할 수 없습니다. 잠시 후 다시 시도해 주세요." }
  }

  const callbackUrl = new URL(ROUTES.auth.callback, origin)
  callbackUrl.searchParams.set("next", ROUTES.resetPassword)

  const supabase = await createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(
    parsed.data.email,
    { redirectTo: callbackUrl.toString() }
  )

  if (error) {
    return { error: "재설정 메일을 보내지 못했습니다. 잠시 후 다시 시도해 주세요." }
  }

  return { success: true as const }
}

const updatePassword = async (values: ResetPasswordValues) => {
  const parsed = resetPasswordSchema.safeParse(values)

  if (!parsed.success) {
    return { error: "새 비밀번호를 다시 확인해 주세요." }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  })

  if (error) {
    return { error: "비밀번호를 변경하지 못했습니다. 재설정 링크를 다시 요청해 주세요." }
  }

  await supabase.auth.signOut()
  revalidatePath(ROUTES.dashboard, "layout")
  redirect(`${ROUTES.login}?reset=success`)
}

export { demoLogin, login, logout, requestPasswordReset, updatePassword }
