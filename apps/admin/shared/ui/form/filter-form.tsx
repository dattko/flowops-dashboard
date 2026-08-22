import type { ComponentProps, ReactNode } from "react"

import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"

type FilterFormButtonProps = Omit<
  ComponentProps<typeof Button>,
  "children" | "type"
>

type FilterFormProps = Omit<ComponentProps<"form">, "onReset"> & {
  submitLabel?: ReactNode
  submitIcon?: ReactNode
  onReset?: () => void
  resetLabel?: ReactNode
  resetIcon?: ReactNode
  isSubmitting?: boolean
  actionsClassName?: string
  submitButtonProps?: FilterFormButtonProps
  resetButtonProps?: FilterFormButtonProps
}

const FilterForm = ({
  children,
  submitLabel = "검색",
  submitIcon,
  onReset,
  resetLabel = "초기화",
  resetIcon,
  isSubmitting = false,
  actionsClassName,
  submitButtonProps,
  resetButtonProps,
  ...props
}: FilterFormProps) => {
  return (
    <form {...props}>
      {children}

      <div className={cn("flex gap-2", actionsClassName)}>
        <Button
          {...submitButtonProps}
          type="submit"
          disabled={isSubmitting || submitButtonProps?.disabled}
        >
          {submitIcon}
          {submitLabel}
        </Button>

        {onReset && (
          <Button
            {...resetButtonProps}
            type="button"
            variant={resetButtonProps?.variant ?? "outline"}
            onClick={onReset}
          >
            {resetIcon}
            {resetLabel}
          </Button>
        )}
      </div>
    </form>
  )
}

export { FilterForm }
export type { FilterFormProps }
