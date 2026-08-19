import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

import {
  POLICY_COOKIE_MAX_AGE_SECONDS,
  SESSION_POLICY_COOKIE,
  createShortSessionPolicy,
  getShortSessionExpiresAt,
} from "@/lib/auth/session-policy"

export const updateSession = async (request: NextRequest) => {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => {
          return request.cookies.getAll()
        },
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 세션 갱신 (반드시 호출해야 함)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isPublicPath =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/auth")
  const sessionExpiresAt = getShortSessionExpiresAt(
    request.cookies.get(SESSION_POLICY_COOKIE)?.value
  )

  if (
    user &&
    !isPublicPath &&
    sessionExpiresAt !== null &&
    sessionExpiresAt <= Date.now()
  ) {
    const url = request.nextUrl.clone()
    url.pathname = "/auth/session-expired"
    url.search = ""
    return NextResponse.redirect(url)
  }

  if (user && !isPublicPath && sessionExpiresAt !== null) {
    response.cookies.set(SESSION_POLICY_COOKIE, createShortSessionPolicy(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: POLICY_COOKIE_MAX_AGE_SECONDS,
    })
  }

  // 로그인 안 된 상태로 보호된 페이지 접근 시 리다이렉트
  if (!user && !isPublicPath) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  return response
}
