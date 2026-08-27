"use client"

import Link from "next/link"
import {
  BarChart3,
  Boxes,
  ChartNoAxesCombined,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Settings,
  ShoppingBag,
  Users,
  X,
} from "lucide-react"

import { useProfile } from "@/entities/profile"
import { LogoutButton } from "@/features/auth"
import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"

import { useActiveMenu } from "../lib/use-active-menu"
import { useNavigationSections } from "../lib/use-navigation-sections"
import { useSidebar } from "../lib/use-sidebar"
import type { NavigationIcon, NavigationItem } from "../model/types"

const navigationIcons: Record<NavigationIcon, typeof LayoutDashboard> = {
  dashboard: LayoutDashboard,
  orders: ShoppingBag,
  inventory: Boxes,
  customers: Users,
  reports: ChartNoAxesCombined,
  settings: Settings,
}

type SidebarNavigationProps = {
  items: readonly NavigationItem[]
  ariaLabel: string
  collapsed?: boolean
  onNavigate?: () => void
}

const SidebarNavigation = ({
  items,
  ariaLabel,
  collapsed = false,
  onNavigate,
}: SidebarNavigationProps) => {
  const isActiveMenu = useActiveMenu()

  return (
    <nav className="space-y-1" aria-label={ariaLabel}>
      {items.map((item) => {
        const Icon = navigationIcons[item.icon]
        const isActive = isActiveMenu(item.href)

        return (
          <Link
            key={item.code}
            href={item.href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            title={collapsed ? item.label : undefined}
            className={cn(
              "type-body flex items-center rounded-xl py-2.5 font-medium transition-colors",
              collapsed ? "justify-center px-2" : "gap-3 px-3",
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <Icon
              className={cn(
                "size-[18px]",
                isActive && "text-sidebar-primary"
              )}
              aria-hidden="true"
            />
            <span className={cn(collapsed && "sr-only")}>{item.label}</span>
            {isActive && !collapsed ? (
              <span className="ml-auto size-1.5 rounded-full bg-sidebar-primary" />
            ) : null}
          </Link>
        )
      })}
    </nav>
  )
}

const SidebarBrand = ({ collapsed = false }: { collapsed?: boolean }) => {
  return (
    <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
      <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-[0_8px_20px_rgba(215,117,63,0.25)]">
        <BarChart3 className="size-5" aria-hidden="true" />
      </div>
      {!collapsed ? (
        <div>
          <Typography variant="cardTitle" tone="inherit">
            flowops
          </Typography>
          <Typography
            variant="overline"
            tone="inherit"
            className="text-sidebar-foreground/60"
          >
            Operations
          </Typography>
        </div>
      ) : null}
    </div>
  )
}

type SidebarProfileProps = {
  displayName: string
  role: string
  collapsed?: boolean
}

const SidebarProfile = ({
  displayName,
  role,
  collapsed = false,
}: SidebarProfileProps) => {
  return (
    <div
      className={cn(
        "mt-4 flex items-center border-t border-sidebar-border pt-5",
        collapsed ? "flex-col gap-2 px-1" : "gap-3 px-3"
      )}
    >
      <div className="type-body grid size-9 shrink-0 place-items-center rounded-full bg-sidebar-accent font-semibold text-sidebar-primary">
        {displayName.slice(0, 1)}
      </div>
      {!collapsed ? (
        <div className="min-w-0 flex-1">
          <Typography
            variant="body"
            tone="inherit"
            className="truncate font-medium"
          >
            {displayName}
          </Typography>
          <Typography
            variant="label"
            tone="inherit"
            className="truncate text-sidebar-foreground/50"
          >
            {role === "admin" ? "운영 관리자" : "일반 사용자"}
          </Typography>
        </div>
      ) : null}
      <LogoutButton />
    </div>
  )
}

type AppSidebarProps = {
  navigationItems: readonly NavigationItem[]
}

export const AppSidebar = ({ navigationItems }: AppSidebarProps) => {
  const { profile } = useProfile()
  const {
    isCollapsed,
    isMobileOpen,
    toggleDesktopSidebar,
    closeMobileSidebar,
  } = useSidebar()
  const displayName = profile.displayName ?? "사용자"
  const { mainNavigation, footerNavigation } =
    useNavigationSections(navigationItems)

  return (
    <>
      <aside
        data-collapsed={isCollapsed}
        className={cn(
          "peer fixed inset-y-0 left-0 z-30 hidden h-screen flex-col overflow-y-auto bg-sidebar py-6 text-sidebar-foreground transition-[width,padding] duration-200 lg:flex",
          isCollapsed ? "w-[80px] px-3" : "w-[248px] px-4"
        )}
      >
        <div
          className={cn(
            "flex",
            isCollapsed
              ? "flex-col items-center gap-3"
              : "items-center justify-between px-3"
          )}
        >
          <SidebarBrand collapsed={isCollapsed} />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={toggleDesktopSidebar}
            className="text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            aria-label={isCollapsed ? "사이드바 펼치기" : "사이드바 접기"}
            title={isCollapsed ? "사이드바 펼치기" : "사이드바 접기"}
          >
            {isCollapsed ? (
              <ChevronRight aria-hidden="true" />
            ) : (
              <ChevronLeft aria-hidden="true" />
            )}
          </Button>
        </div>

        <div className="mt-10">
          <SidebarNavigation
            items={mainNavigation}
            ariaLabel="주요 메뉴"
            collapsed={isCollapsed}
          />
        </div>

        <div className="mt-auto">
          <SidebarNavigation
            items={footerNavigation}
            ariaLabel="설정 메뉴"
            collapsed={isCollapsed}
          />
          <SidebarProfile
            displayName={displayName}
            role={profile.role}
            collapsed={isCollapsed}
          />
        </div>
      </aside>

      {isMobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/45 backdrop-blur-[1px]"
            onClick={closeMobileSidebar}
            aria-label="메뉴 닫기"
          />
          <aside
            id="mobile-sidebar"
            role="dialog"
            aria-modal="true"
            aria-label="모바일 메뉴"
            className="relative flex h-full w-[min(85vw,300px)] flex-col overflow-y-auto bg-sidebar px-4 py-6 text-sidebar-foreground shadow-2xl"
          >
            <div className="flex items-center justify-between px-3">
              <SidebarBrand />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={closeMobileSidebar}
                className="text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                aria-label="메뉴 닫기"
              >
                <X aria-hidden="true" />
              </Button>
            </div>

            <div className="mt-10">
              <SidebarNavigation
                items={mainNavigation}
                ariaLabel="주요 메뉴"
                onNavigate={closeMobileSidebar}
              />
            </div>

            <div className="mt-auto">
              <SidebarNavigation
                items={footerNavigation}
                ariaLabel="설정 메뉴"
                onNavigate={closeMobileSidebar}
              />
              <SidebarProfile displayName={displayName} role={profile.role} />
            </div>
          </aside>
        </div>
      ) : null}
    </>
  )
}
