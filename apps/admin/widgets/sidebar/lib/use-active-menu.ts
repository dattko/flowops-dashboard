"use client"

import { usePathname } from "next/navigation"

export const useActiveMenu = () => {
  const pathname = usePathname()

  return (href: string) => {
    return href === "/" ? pathname === href : pathname.startsWith(href)
  }
}
