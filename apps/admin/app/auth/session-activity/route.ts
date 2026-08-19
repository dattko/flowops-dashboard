import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import {
  POLICY_COOKIE_MAX_AGE_SECONDS,
  SESSION_POLICY_COOKIE,
  createShortSessionPolicy,
  getShortSessionExpiresAt,
} from "@/lib/auth/session-policy"

export async function POST() {
  const cookieStore = await cookies()
  const policy = cookieStore.get(SESSION_POLICY_COOKIE)?.value
  const expiresAt = getShortSessionExpiresAt(policy)

  if (expiresAt === null) {
    return new NextResponse(null, { status: 204 })
  }

  if (expiresAt <= Date.now()) {
    return NextResponse.json({ error: "session_expired" }, { status: 401 })
  }

  cookieStore.set(SESSION_POLICY_COOKIE, createShortSessionPolicy(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: POLICY_COOKIE_MAX_AGE_SECONDS,
  })

  return new NextResponse(null, { status: 204 })
}
