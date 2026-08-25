import type { ComponentProps, ReactNode } from "react"

import { cn } from "@/shared/lib/utils"
import { Typography } from "@/shared/ui/typography"

type PageHeaderProps = Omit<ComponentProps<"div">, "title"> & {
  title: ReactNode
  description?: ReactNode
  eyebrow?: ReactNode
  titleAccessory?: ReactNode
  actions?: ReactNode
  titleId?: string
}

const PageHeader = ({
  title,
  description,
  eyebrow,
  titleAccessory,
  actions,
  titleId,
  className,
  ...props
}: PageHeaderProps) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-between gap-5 sm:flex-row sm:items-end",
        className
      )}
      {...props}
    >
      <div className="min-w-0">
        {eyebrow ? (
          <Typography variant="label" tone="muted" className="mb-1">
            {eyebrow}
          </Typography>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          <Typography as="h1" id={titleId} variant="pageTitle">
            {title}
          </Typography>
          {titleAccessory}
        </div>

        {description ? (
          <Typography variant="body" tone="muted" className="mt-2">
            {description}
          </Typography>
        ) : null}
      </div>

      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  )
}

export { PageHeader }
export type { PageHeaderProps }
