"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

import { useSidebarStore } from "@/shared/store/use-sidebar-store"

const useSidebar = () => {
  const pathname = usePathname()
  const isCollapsed = useSidebarStore((state) => state.isCollapsed)
  const isMobileOpen = useSidebarStore((state) => state.isMobileOpen)
  const toggleDesktopSidebar = useSidebarStore(
    (state) => state.toggleDesktopSidebar
  )
  const closeMobileSidebar = useSidebarStore(
    (state) => state.closeMobileSidebar
  )

  useEffect(() => {
    void useSidebarStore.persist.rehydrate()
  }, [])

  useEffect(() => {
    closeMobileSidebar()
  }, [pathname, closeMobileSidebar])

  useEffect(() => {
    if (!isMobileOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileSidebar()
      }
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isMobileOpen, closeMobileSidebar])

  return {
    isCollapsed,
    isMobileOpen,
    toggleDesktopSidebar,
    closeMobileSidebar,
  }
}

export { useSidebar }
