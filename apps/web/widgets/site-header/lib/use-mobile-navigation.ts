"use client"

import { useEffect, useState } from "react"

const useMobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 48rem)")
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false)
    }

    desktop.addEventListener("change", closeOnDesktop)
    return () => desktop.removeEventListener("change", closeOnDesktop)
  }, [])

  return {
    isOpen,
    setIsOpen,
    closeMenu: () => setIsOpen(false),
  }
}

export { useMobileNavigation }
