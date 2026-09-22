"use client"

import { Dialog } from "@base-ui/react/dialog"
import { LogOut, Menu, X } from "lucide-react"
import Link from "next/link"

import { logout } from "@/features/auth"
import { ROUTES } from "@/shared/config/routes"
import { buttonVariants } from "@/shared/ui/button"

import { useMobileNavigation } from "../lib/use-mobile-navigation"
import { SITE_NAVIGATION } from "../model/navigation"

type MobileNavigationProps = {
  isAuthenticated: boolean
}

const menuLinkClassName =
  "block rounded-xl px-4 py-3.5 text-base font-semibold text-ink transition-colors hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coffee"

const MobileNavigation = ({ isAuthenticated }: MobileNavigationProps) => {
  const { isOpen, setIsOpen, closeMenu } = useMobileNavigation()

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger
        className={buttonVariants({
          variant: "ghost",
          size: "icon",
          className: "ml-1 md:hidden",
        })}
        aria-label="메뉴 열기"
      >
        <Menu className="size-5" strokeWidth={1.7} aria-hidden="true" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[70] min-h-dvh bg-ink/45 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 md:hidden supports-[-webkit-touch-callout:none]:absolute" />
        <Dialog.Viewport className="fixed inset-0 z-[71] flex min-h-dvh justify-end md:hidden">
          <Dialog.Popup className="flex h-dvh w-[min(22rem,calc(100vw-2rem))] flex-col overflow-y-auto rounded-l-[1.75rem] bg-paper px-5 py-6 text-ink shadow-2xl transition-[transform,opacity] duration-150 ease-out data-ending-style:translate-x-4 data-ending-style:opacity-0 data-starting-style:translate-x-4 data-starting-style:opacity-0 sm:px-7">
            <div className="flex items-center justify-between gap-4 border-b border-ink/10 pb-5">
              <Dialog.Title className="text-xl font-semibold tracking-[-0.04em]">
                메뉴
              </Dialog.Title>
              <Dialog.Close
                className={buttonVariants({ variant: "ghost", size: "icon" })}
                aria-label="메뉴 닫기"
              >
                <X className="size-5" aria-hidden="true" />
              </Dialog.Close>
            </div>

            <nav className="mt-6" aria-label="모바일 주요 메뉴">
              <p className="px-4 text-xs font-bold tracking-[0.12em] text-coffee uppercase">
                둘러보기
              </p>
              <ul className="mt-2 space-y-1">
                {SITE_NAVIGATION.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className={menuLinkClassName}
                      onClick={closeMenu}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="mt-6 border-t border-ink/10 pt-6" aria-label="모바일 계정 메뉴">
              <p className="px-4 text-xs font-bold tracking-[0.12em] text-coffee uppercase">
                내 계정
              </p>
              {isAuthenticated ? (
                <ul className="mt-2 space-y-1">
                  <li>
                    <Link
                      href={ROUTES.orders.list}
                      className={menuLinkClassName}
                      onClick={closeMenu}
                    >
                      주문 내역
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={ROUTES.profile}
                      className={menuLinkClassName}
                      onClick={closeMenu}
                    >
                      내 정보 수정
                    </Link>
                  </li>
                  <li>
                    <form action={logout}>
                      <button
                        type="submit"
                        className="flex w-full items-center gap-2 rounded-xl px-4 py-3.5 text-left text-base font-semibold text-ink/65 transition-colors hover:bg-cream hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coffee"
                      >
                        <LogOut className="size-4" aria-hidden="true" />
                        로그아웃
                      </button>
                    </form>
                  </li>
                </ul>
              ) : (
                <Link
                  href={ROUTES.login}
                  className={`${menuLinkClassName} mt-2`}
                  onClick={closeMenu}
                >
                  로그인
                </Link>
              )}
            </nav>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export { MobileNavigation }
