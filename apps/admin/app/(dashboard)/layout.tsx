import { cookies } from "next/headers"

import { getProfile } from "@/entities/profile"
import { ProfileProvider } from "@/entities/profile/client"
import { SessionExpiryGuard } from "@/features/auth/ui/session-expiry-guard"
import {
  SESSION_POLICY_COOKIE,
  getShortSessionExpiresAt,
} from "@/shared/lib/auth/session-policy"
import { AppSidebar } from "@/widgets/layout/ui/app-sidebar"
import { MobileHeader } from "@/widgets/layout/ui/mobile-header"

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const profile = await getProfile()
  const cookieStore = await cookies()
  const expiresAt = getShortSessionExpiresAt(
    cookieStore.get(SESSION_POLICY_COOKIE)?.value
  )

  return (
    <ProfileProvider initialProfile={profile}>
      <div className="min-h-screen bg-[#f6f5f0]">
        <SessionExpiryGuard expiresAt={expiresAt} />
        <AppSidebar />
        <div className="min-w-0 lg:pl-[248px]">
          <MobileHeader />
          {children}
        </div>
      </div>
    </ProfileProvider>
  )
}

export default DashboardLayout
