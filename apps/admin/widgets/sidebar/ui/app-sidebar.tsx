"use client"

import {
  BarChart3,
  Boxes,
  ChartNoAxesCombined,
  LayoutDashboard,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react"
import Link from "next/link"

import { useProfile } from "@/entities/profile"
import { LogoutButton } from "@/features/auth"
import { Typography } from "@/shared/ui/typography"

import { useNavigationSections } from "../lib/use-navigation-sections"
import { useActiveMenu } from "../lib/use-active-menu"
import type { NavigationIcon, NavigationItem } from "../model/types"

const navigationIcons: Record<NavigationIcon, typeof LayoutDashboard> = {
  dashboard: LayoutDashboard,
  orders: ShoppingBag,
  inventory: Boxes,
  customers: Users,
  reports: ChartNoAxesCombined,
  settings: Settings,
}

type AppSidebarProps = {
  navigationItems: readonly NavigationItem[]
}

export const AppSidebar = ({ navigationItems }: AppSidebarProps) => {
  const isActiveMenu = useActiveMenu()
  const { profile } = useProfile()
  const displayName = profile.displayName ?? "사용자"
  const { mainNavigation, footerNavigation } =
    useNavigationSections(navigationItems)

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
        {mainNavigation.map((item) => {
          const Icon = navigationIcons[item.icon]
          const isActive = isActiveMenu(item.href)

          return (
            <Link
              key={item.code}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`type-body flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <Icon
                className={`size-[18px] ${isActive ? "text-sidebar-primary" : ""}`}
                aria-hidden="true"
              />
              {item.label}
              {isActive && <span className="ml-auto size-1.5 rounded-full bg-sidebar-primary" />}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto space-y-1">
        {footerNavigation.map((item) => {
          const Icon = navigationIcons[item.icon]
          const isActive = isActiveMenu(item.href)

          return (
            <Link
              key={item.code}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className="type-body flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Icon className="size-[18px]" aria-hidden="true" />
              {item.label}
            </Link>
          )
        })}

        <div className="mt-4 flex items-center gap-3 border-t border-sidebar-border px-3 pt-5">
          <div className="type-body grid size-9 place-items-center rounded-full bg-sidebar-accent font-semibold text-sidebar-primary">
            {displayName.slice(0, 1)}
          </div>
          <div className="min-w-0 flex-1">
            <Typography variant="body" tone="inherit" className="truncate font-medium">
              {displayName}
            </Typography>
            <Typography variant="label" tone="inherit" className="truncate text-sidebar-foreground/50">
              {profile.role === "admin" ? "운영 관리자" : "일반 사용자"}
            </Typography>
          </div>
          <LogoutButton />
        </div>
      </div>
    </aside>
  )
}
