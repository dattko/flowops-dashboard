import { LogOut, Package, UserRound } from "lucide-react";
import Link from "next/link";

import { logout } from "@/features/auth";
import { CartLink, CartSession } from "@/features/cart";
import { ProductSearchDialog } from "@/features/search-products";
import { ROUTES } from "@/shared/config/routes";
import { isSupabaseConfigured } from "@/shared/lib/supabase/config";
import { createClient } from "@/shared/lib/supabase/server";
import { BrandMark } from "@/shared/ui/brand-mark";
import { Button, buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

import { SITE_NAVIGATION } from "../model/navigation";
import { MobileNavigation } from "./mobile-navigation";

export const SiteHeader = async () => {
  let user = null;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  }

  return (
    <>
      <CartSession userId={user?.id ?? null} />
      <div className="bg-ink px-5 py-2 text-center text-[0.7rem] font-medium tracking-[0.08em] text-paper">
        첫 구매 10% 할인 · 50,000원 이상 무료배송
      </div>
      <header className="sticky top-0 z-50 border-b border-black/8 bg-paper/92 backdrop-blur-lg">
        <div className="mx-auto flex h-[4.5rem] max-w-[90rem] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link href={ROUTES.home} className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coffee">
            <BrandMark />
          </Link>

          <nav className="hidden items-center gap-9 md:flex" aria-label="주요 메뉴">
            {SITE_NAVIGATION.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-coffee focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coffee"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <ProductSearchDialog />
            <CartLink />
            {user ? (
              <>
                <Link
                  href={ROUTES.orders.list}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "ml-1 hidden px-3 md:inline-flex",
                  )}
                  aria-label="주문 내역"
                >
                  <Package className="size-[1.05rem]" strokeWidth={1.7} />
                  <span className="hidden sm:inline">주문 내역</span>
                </Link>
                <form action={logout} className="hidden md:block">
                  <Button
                    type="submit"
                    variant="ghost"
                    size="sm"
                    className="px-3"
                    aria-label="로그아웃"
                  >
                    <LogOut className="size-[1.05rem]" strokeWidth={1.7} />
                    <span className="hidden lg:inline">로그아웃</span>
                  </Button>
                </form>
              </>
            ) : (
              <Link
                href={ROUTES.login}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "ml-1 hidden px-3 md:inline-flex",
                )}
                aria-label="로그인"
              >
                <UserRound className="size-[1.05rem]" strokeWidth={1.7} />
                <span className="hidden sm:inline">로그인</span>
              </Link>
            )}
            <MobileNavigation isAuthenticated={Boolean(user)} />
          </div>
        </div>
      </header>
    </>
  );
};
