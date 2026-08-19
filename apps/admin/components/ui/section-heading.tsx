import * as React from "react"

import { cn } from "@/lib/utils"
import { Typography } from "@/components/ui/typography"

type SectionHeadingProps = React.ComponentProps<"div"> & {
  title: React.ReactNode
  description?: React.ReactNode
  titleId?: string
}

const SectionHeading = ({
  title,
  description,
  titleId,
  className,
  ...props
}: SectionHeadingProps) => {
  return (
    <div className={cn("min-w-0", className)} {...props}>
      <Typography as="h2" id={titleId} variant="cardTitle">
        {title}
      </Typography>
      {description ? (
        <Typography variant="label" tone="muted" className="mt-1">
          {description}
        </Typography>
      ) : null}
    </div>
  )
}

export { SectionHeading }
