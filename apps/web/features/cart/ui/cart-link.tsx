"use client"

import { ShoppingBag } from "lucide-react"
import Link from "next/link"

import { ROUTES } from "@/shared/config/routes"
import { cn } from "@/shared/lib/utils"
import { buttonVariants } from "@/shared/ui/button"

import { useCartCount } from "../lib/use-cart-count"

export const CartLink = () => {
  const itemCount = useCartCount()

  return (
    <Link
      href={ROUTES.cart}
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        "relative",
      )}
      aria-label={`장바구니, 상품 ${itemCount}개`}
    >
      <ShoppingBag className="size-[1.15rem]" strokeWidth={1.7} />
      {itemCount > 0 ? (
        <span className="absolute right-0 top-0 grid size-4 place-items-center rounded-full bg-coral text-[0.56rem] font-bold text-white">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      ) : null}
    </Link>
  )
}
