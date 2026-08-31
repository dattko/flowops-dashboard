import { NextResponse, type NextRequest } from "next/server"

import { ROUTES } from "@/shared/config/routes"
import { createClient } from "@/shared/lib/supabase/server"

export const GET = async (request: NextRequest) => {
  const supabase = await createClient()
  await supabase.auth.signOut()

  const loginUrl = new URL(ROUTES.login, request.url)
  loginUrl.searchParams.set("reason", "unauthorized")

  return NextResponse.redirect(loginUrl)
}
