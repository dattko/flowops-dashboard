import type { ElementType, HTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

const typographyVariants = cva("text-balance", {
  variants: {
    variant: {
      hero: "text-[clamp(3.25rem,8vw,7.5rem)] font-semibold leading-[0.91] tracking-[-0.072em]",
      display: "text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[1.03] tracking-[-0.055em]",
      sectionTitle: "text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl",
      title: "text-xl font-semibold leading-7 tracking-[-0.03em]",
      bodyLarge: "text-base leading-7 sm:text-lg sm:leading-8",
      body: "text-sm leading-6",
      label: "text-sm font-semibold leading-5",
      overline: "text-xs font-bold leading-4 tracking-[0.16em] uppercase",
      caption: "text-xs leading-5",
    },
    tone: {
      default: "text-ink",
      muted: "text-ink/65",
      brand: "text-coffee",
      inverse: "text-paper",
      "inverse-muted": "text-paper/70",
    },
  },
  defaultVariants: {
    variant: "body",
    tone: "default",
  },
})

type TypographyProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof typographyVariants> & {
    as?: ElementType
  }

const Typography = ({
  as: Component = "p",
  variant = "body",
  tone = "default",
  className,
  ...props
}: TypographyProps) => {
  return (
    <Component
      data-slot="typography"
      className={cn(typographyVariants({ variant, tone, className }))}
      {...props}
    />
  )
}

export { Typography, typographyVariants }
