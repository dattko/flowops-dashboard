import "server-only"

import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js"

const USER_PAGE_SIZE = 1000

const getSuperAdminEmails = () => {
  return (process.env.SUPER_ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
}

export const isSuperAdminEmail = (email?: string | null) => {
  if (!email) return false

  return getSuperAdminEmails().includes(email.trim().toLowerCase())
}

export const createAdminClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const secretKey = process.env.SUPABASE_SECRET_KEY

  if (!supabaseUrl || !secretKey) {
    throw new Error("관리자 초대 환경 변수가 설정되지 않았습니다.")
  }

  return createClient(supabaseUrl, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  })
}

export const listAllAuthUsers = async (supabase: SupabaseClient) => {
  const users: User[] = []
  let page = 1

  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({
      page,
      perPage: USER_PAGE_SIZE,
    })

    if (error) throw error

    users.push(...data.users)

    if (data.users.length < USER_PAGE_SIZE) break
    page += 1
  }

  return users
}

export const findAuthUserByEmail = async (
  supabase: SupabaseClient,
  email: string
) => {
  const normalizedEmail = email.trim().toLowerCase()
  const users = await listAllAuthUsers(supabase)

  return users.find(
    (user) => user.email?.trim().toLowerCase() === normalizedEmail
  )
}
