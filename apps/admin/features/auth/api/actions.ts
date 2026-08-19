"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

import { loginSchema, type LoginValues } from "../model/login-schema"

export async function login(values: LoginValues) {
  const parsed = loginSchema.safeParse(values)

  if (!parsed.success) {
    return {
      error: "입력값을 다시 확인해 주세요.",
    }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword(parsed.data)

  if (error) {
    return {
      error: "이메일 또는 비밀번호가 올바르지 않습니다.",
    }
  }

  revalidatePath("/", "layout")
  redirect("/")
}

export async function logout() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error("로그아웃에 실패했습니다.")
  }

  revalidatePath("/", "layout")
  redirect("/login")
}
