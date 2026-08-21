import type { NavigationItem } from "../model/types"

export const useNavigationSections = (
  navigationItems: readonly NavigationItem[]
) => {
  return {
    mainNavigation: navigationItems.filter((item) => item.section === "main"),
    footerNavigation: navigationItems.filter((item) => item.section === "footer"),
  }
}
