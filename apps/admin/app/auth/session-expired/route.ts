import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { SESSION_POLICY_COOKIE } from "@/shared/lib/auth/session-policy"
import { createClient } from "@/shared/lib/supabase/server"

export const GET = async (request: Request) => {
  const supabase = await createClient()
  const cookieStore = await cookies()

  await supabase.auth.signOut({ scope: "local" })
  cookieStore.delete(SESSION_POLICY_COOKIE)

  const loginUrl = new URL("/login", request.url)
  loginUrl.searchParams.set("reason", "session_expired")

  return NextResponse.redirect(loginUrl)
}
