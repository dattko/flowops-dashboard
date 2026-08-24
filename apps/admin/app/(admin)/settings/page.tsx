import { getSettings, Settings } from "@/widgets/settings"

const SettingsPage = async () => {
  const settings = await getSettings()

  return <Settings settings={settings} />
}

export default SettingsPage
