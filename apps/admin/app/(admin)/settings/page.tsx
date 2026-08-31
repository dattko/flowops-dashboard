import type { Metadata } from "next"

import { getAdminAccessOverview } from "@/features/manage-admins"
import { getSettings, Settings } from "@/widgets/settings"

export const metadata: Metadata = {
  title: "설정",
  description: "FlowOps 운영 환경과 알림 및 서비스 설정을 관리합니다.",
}

const SettingsPage = async () => {
  const [settings, adminAccess] = await Promise.all([
    getSettings(),
    getAdminAccessOverview(),
  ])

  return <Settings settings={settings} adminAccess={adminAccess} />
}

export default SettingsPage
