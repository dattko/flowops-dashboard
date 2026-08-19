import { LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"

import { logout } from "../api/actions"

export function LogoutButton() {
  return (
    <form action={logout}>
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-foreground lg:size-8 lg:text-sidebar-foreground/40 lg:hover:bg-sidebar-accent lg:hover:text-sidebar-accent-foreground"
        aria-label="로그아웃"
        title="로그아웃"
      >
        <LogOut aria-hidden="true" />
      </Button>
    </form>
  )
}
