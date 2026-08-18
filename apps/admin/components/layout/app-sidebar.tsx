import {
  BarChart3,
  Boxes,
  ChartNoAxesCombined,
  Headphones,
  LayoutDashboard,
  MoreHorizontal,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react"

import { Typography } from "@/components/ui/typography"

const navigation = [
  { label: "대시보드", icon: LayoutDashboard, active: true },
  { label: "주문 관리", icon: ShoppingBag },
  { label: "재고 관리", icon: Boxes },
  { label: "고객 관리", icon: Users },
  { label: "리포트", icon: ChartNoAxesCombined },
]

export function AppSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden h-screen w-[248px] flex-col overflow-y-auto bg-sidebar px-4 py-6 text-sidebar-foreground lg:flex">
      <div className="flex items-center gap-3 px-3">
        <div className="grid size-9 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-[0_8px_20px_rgba(215,117,63,0.25)]">
          <BarChart3 className="size-5" aria-hidden="true" />
        </div>
        <div>
          <Typography variant="cardTitle" tone="inherit">flowops</Typography>
          <Typography variant="overline" tone="inherit" className="text-sidebar-foreground/60">
            Operations
          </Typography>
        </div>
      </div>

      <nav className="mt-10 space-y-1" aria-label="주요 메뉴">
        {navigation.map((item) => {
          const Icon = item.icon

          return (
            <a
              key={item.label}
              href="#"
              aria-current={item.active ? "page" : undefined}
              className={`type-body flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium transition-colors ${
                item.active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <Icon
                className={`size-[18px] ${item.active ? "text-sidebar-primary" : ""}`}
                aria-hidden="true"
              />
              {item.label}
              {item.active && <span className="ml-auto size-1.5 rounded-full bg-sidebar-primary" />}
            </a>
          )
        })}
      </nav>

      <div className="mt-auto space-y-1">
        <a
          href="#"
          className="type-body flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <Settings className="size-[18px]" aria-hidden="true" />
          설정
        </a>
        <a
          href="#"
          className="type-body flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <Headphones className="size-[18px]" aria-hidden="true" />
          도움말
        </a>

        <div className="mt-4 flex items-center gap-3 border-t border-sidebar-border px-3 pt-5">
          <div className="type-body grid size-9 place-items-center rounded-full bg-sidebar-accent font-semibold text-sidebar-primary">
            황
          </div>
          <div className="min-w-0 flex-1">
            <Typography variant="body" tone="inherit" className="truncate font-medium">
              황민
            </Typography>
            <Typography variant="label" tone="inherit" className="truncate text-sidebar-foreground/50">
              운영 관리자
            </Typography>
          </div>
          <MoreHorizontal className="size-4 text-sidebar-foreground/40" aria-hidden="true" />
        </div>
      </div>
    </aside>
  )
}
