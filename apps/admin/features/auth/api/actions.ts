"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import {
  POLICY_COOKIE_MAX_AGE_SECONDS,
  SESSION_POLICY_COOKIE,
  createShortSessionPolicy,
} from "@/shared/lib/auth/session-policy"
import { createClient } from "@/shared/lib/supabase/server"

import { loginSchema, type LoginValues } from "../model/login-schema"

export const login = async (values: LoginValues) => {
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

  revalidatePath("/", "layout")
  redirect("/")
}

export const logout = async () => {
  const supabase = await createClient()
  const cookieStore = await cookies()
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error("로그아웃에 실패했습니다.")
  }

  cookieStore.delete(SESSION_POLICY_COOKIE)

  revalidatePath("/", "layout")
  redirect("/login")
}
