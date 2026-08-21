import { BarChart3, Bell, Search } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"
import { LogoutButton } from "@/features/auth"

export const MobileHeader = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b border-[#e4e1d9] bg-[#fbfaf7]/90 px-4 backdrop-blur-sm sm:px-6 lg:hidden">
      <div className="flex items-center gap-2.5">
        <div className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
          <BarChart3 className="size-4" aria-hidden="true" />
        </div>
        <Typography as="span" variant="cardTitle">flowops</Typography>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" aria-label="검색">
          <Search aria-hidden="true" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="알림">
          <Bell aria-hidden="true" />
        </Button>
        <LogoutButton />
      </div>
    </header>
  )
}
