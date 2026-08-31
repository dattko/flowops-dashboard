import { NextResponse, type NextRequest } from "next/server"

import { ROUTES } from "@/shared/config/routes"
import { createClient } from "@/shared/lib/supabase/server"

const isSafeInternalPath = (path: string | null): path is string => {
  return Boolean(path?.startsWith("/") && !path.startsWith("//"))
}

export const GET = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl
  const code = searchParams.get("code")
  const requestedPath = searchParams.get("next")
  const nextPath = isSafeInternalPath(requestedPath)
    ? requestedPath
    : ROUTES.dashboard

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return NextResponse.redirect(new URL(nextPath, request.url))
    }
  }

  const retryUrl = new URL(ROUTES.findPassword, request.url)
  retryUrl.searchParams.set("error", "invalid_link")
  return NextResponse.redirect(retryUrl)
}
