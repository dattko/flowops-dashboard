import { ROUTES } from "@/shared/config/routes"

const SITE_NAVIGATION = [
  { label: "커피", href: ROUTES.products.list },
  { label: "모로우 이야기", href: ROUTES.homeStory },
  { label: "커피 가이드", href: ROUTES.homeGuide },
] as const

export { SITE_NAVIGATION }
