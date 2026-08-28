import { LoaderCircle } from "lucide-react"

import { cn } from "@/shared/lib/utils"

type SpinnerProps = React.ComponentProps<typeof LoaderCircle>

const Spinner = ({ className, ...props }: SpinnerProps) => {
  return (
    <LoaderCircle
      aria-hidden="true"
      data-slot="spinner"
      className={cn("size-6 animate-spin text-primary", className)}
      {...props}
    />
  )
}

export { Spinner }
