import { AppSidebar } from "@/components/layout/app-sidebar"
import { MobileHeader } from "@/components/layout/mobile-header"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f6f5f0]">
      <AppSidebar />
      <div className="min-w-0 lg:pl-[248px]">
        <MobileHeader />
        {children}
      </div>
    </div>
  )
}
