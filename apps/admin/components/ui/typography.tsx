import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const typographyVariants = cva("m-0", {
  variants: {
    variant: {
      display: "type-display",
      pageTitle: "type-page-title",
      sectionTitle: "type-section-title",
      cardTitle: "type-card-title",
      metric: "type-metric",
      body: "type-body",
      bodySmall: "type-body-small",
      label: "type-label",
      caption: "type-caption",
      overline: "type-overline",
    },
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      destructive: "text-destructive",
      success: "text-success",
      warning: "text-warning",
      inherit: "text-inherit",
    },
  },
  defaultVariants: {
    variant: "body",
    tone: "default",
  },
})

type TypographyElement = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div" | "strong"

type TypographyProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof typographyVariants> & {
    as?: TypographyElement
  }

function Typography({
  as: Component = "p",
  variant,
  tone,
  className,
  ...props
}: TypographyProps) {
  return React.createElement(Component, {
    "data-slot": "typography",
    className: cn(typographyVariants({ variant, tone }), className),
    ...props,
  })
}

export { Typography, typographyVariants }
export type { TypographyProps }
