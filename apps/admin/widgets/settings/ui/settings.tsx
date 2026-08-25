import type { AdminSettings } from "@/entities/settings"
import { SettingsForm } from "@/features/update-settings"
import { PageHeader } from "@/shared/ui/page-header"

const SETTING_LINKS = [
  { href: "#store-settings", label: "상점 정보" },
  { href: "#shipping-settings", label: "배송 설정" },
  { href: "#account-settings", label: "내 계정" },
]

export const Settings = ({ settings }: { settings: AdminSettings }) => {
  return (
    <section aria-labelledby="settings-title">
      <PageHeader
        titleId="settings-title"
        title="설정"
        description="상점 운영과 관리자 계정에 필요한 기본 설정을 관리합니다."
      />

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[190px_minmax(0,1fr)]">
        <nav
          aria-label="설정 메뉴"
          className="flex gap-2 overflow-x-auto rounded-xl border bg-card p-2 lg:sticky lg:top-8 lg:flex-col"
        >
          {SETTING_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="type-body-small shrink-0 rounded-lg px-3 py-2.5 font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="min-w-0">
          <SettingsForm initialSettings={settings} />
        </div>
      </div>
    </section>
  )
}
