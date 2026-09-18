"use client"

import { usePathname } from "next/navigation"

const useAccountNav = () => {
  const pathname = usePathname()

  return {
    isActive: (href: string) =>
      pathname === href || pathname.startsWith(`${href}/`),
  }
}

export { useAccountNav }
