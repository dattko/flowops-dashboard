export type NavigationIcon =
  | "dashboard"
  | "orders"
  | "inventory"
  | "customers"
  | "reports"
  | "settings"

export type NavigationItem = {
  code: string
  label: string
  href: string
  icon: NavigationIcon
  section: "main" | "footer"
}
