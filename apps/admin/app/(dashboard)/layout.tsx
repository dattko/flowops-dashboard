import { cookies } from "next/headers"

import { AppSidebar } from "@/components/layout/app-sidebar"
import { MobileHeader } from "@/components/layout/mobile-header"
import { SessionExpiryGuard } from "@/features/auth/components/session-expiry-guard"
import {
  SESSION_POLICY_COOKIE,
  getShortSessionExpiresAt,
} from "@/lib/auth/session-policy"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const expiresAt = getShortSessionExpiresAt(
    cookieStore.get(SESSION_POLICY_COOKIE)?.value
  )

  return (
    <div className="min-h-screen bg-[#f6f5f0]">
      <SessionExpiryGuard expiresAt={expiresAt} />
      <AppSidebar />
      <div className="min-w-0 lg:pl-[248px]">
        <MobileHeader />
        {children}
      </div>
    </div>
  )
}
