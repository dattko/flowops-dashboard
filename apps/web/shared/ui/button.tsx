import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border font-semibold whitespace-nowrap transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-coffee/45 focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:translate-y-px disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "border-transparent bg-ink text-paper shadow-sm hover:bg-ink/88",
        brand: "border-transparent bg-coffee text-paper shadow-sm hover:bg-coffee/88",
        secondary: "border-transparent bg-cream text-ink hover:bg-[#e9dfcf]",
        outline: "border-ink/20 bg-transparent text-ink hover:bg-cream/65",
        ghost: "border-transparent text-ink hover:bg-cream",
        link: "rounded-none border-transparent px-0 text-ink underline decoration-ink/20 underline-offset-8 hover:decoration-ink/60",
        inverse: "border-transparent bg-paper text-ink hover:bg-paper/88",
        "inverse-outline": "border-paper/30 text-paper hover:bg-paper hover:text-leaf",
      },
      size: {
        sm: "h-9 gap-1.5 px-4 text-xs",
        default: "h-11 gap-2 px-5 text-sm",
        lg: "h-12 gap-3 px-6 text-sm",
        icon: "size-10 p-0",
        "icon-sm": "size-9 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

const Button = ({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) => {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
