import { cookies } from "next/headers"

import { getProfile, ProfileProvider } from "@/entities/profile"
import { SessionExpiryGuard } from "@/features/auth"
import {
  SESSION_POLICY_COOKIE,
  getShortSessionExpiresAt,
} from "@/shared/lib/auth/session-policy"
import { MobileHeader } from "@/widgets/mobile-header"
import { AppSidebar, getNavigation } from "@/widgets/sidebar"

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const [profile, navigationItems, cookieStore] = await Promise.all([
    getProfile(),
    getNavigation(),
    cookies(),
  ])
  const expiresAt = getShortSessionExpiresAt(
    cookieStore.get(SESSION_POLICY_COOKIE)?.value
  )

  return (
    <ProfileProvider initialProfile={profile}>
      <div className="min-h-screen bg-[#f6f5f0]">
        <SessionExpiryGuard expiresAt={expiresAt} />
        <AppSidebar navigationItems={navigationItems} />
        <div className="min-w-0 transition-[padding] duration-200 lg:pl-[248px] lg:peer-data-[collapsed=true]:pl-[80px]">
          <MobileHeader />
          <main className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8 xl:px-10">
            {children}
          </main>
        </div>
      </div>
    </ProfileProvider>
  )
}

export default DashboardLayout
