"use client"

import { Package, UserRound } from "lucide-react"
import Link from "next/link"

import { ROUTES } from "@/shared/config/routes"
import { cn } from "@/shared/lib/utils"

import { useAccountNav } from "../lib/use-account-nav"

const ACCOUNT_NAV_ITEMS = [
  {
    href: ROUTES.orders.list,
    label: "주문 내역",
    icon: Package,
  },
  {
    href: ROUTES.profile,
    label: "내 정보 수정",
    icon: UserRound,
  },
] as const

const AccountNav = () => {
  const { isActive } = useAccountNav()

  return (
    <nav
      className="border-b border-ink/10 bg-paper px-5 sm:px-8 lg:px-12"
      aria-label="마이페이지 메뉴"
    >
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto py-3">
        {ACCOUNT_NAV_ITEMS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coffee",
              isActive(href)
                ? "bg-ink text-paper"
                : "text-ink/60 hover:bg-cream hover:text-ink",
            )}
            aria-current={isActive(href) ? "page" : undefined}
          >
            <Icon className="size-4" aria-hidden="true" />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export { AccountNav }
