import type { ComponentProps } from "react"

import { cn } from "@/shared/lib/utils"
import { Badge } from "@/shared/ui/badge"

export const StatusBadge = ({ className, ...props }: ComponentProps<typeof Badge>) => {
  return (
    <Badge
      variant="secondary"
      className={cn("type-caption h-6 border-0 px-2.5 font-semibold", className)}
      {...props}
    />
  )
}
