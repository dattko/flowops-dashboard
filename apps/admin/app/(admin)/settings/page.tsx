import type { Metadata } from "next"

import { getSettings, Settings } from "@/widgets/settings"

export const metadata: Metadata = {
  title: "설정",
  description: "FlowOps 운영 환경과 알림 및 서비스 설정을 관리합니다.",
}

const SettingsPage = async () => {
  const settings = await getSettings()

  return <Settings settings={settings} />
}

export default SettingsPage
