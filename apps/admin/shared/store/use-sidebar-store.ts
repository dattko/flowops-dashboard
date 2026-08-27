"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

type SidebarStore = {
  isCollapsed: boolean
  isMobileOpen: boolean
  toggleDesktopSidebar: () => void
  openMobileSidebar: () => void
  closeMobileSidebar: () => void
}

const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      isCollapsed: false,
      isMobileOpen: false,
      toggleDesktopSidebar: () => {
        set((state) => ({ isCollapsed: !state.isCollapsed }))
      },
      openMobileSidebar: () => {
        set({ isMobileOpen: true })
      },
      closeMobileSidebar: () => {
        set({ isMobileOpen: false })
      },
    }),
    {
      name: "flowops-sidebar",
      partialize: (state) => ({ isCollapsed: state.isCollapsed }),
      skipHydration: true,
    }
  )
)

export { useSidebarStore }
export type { SidebarStore }
