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
  actionsClassName?: string
  submitButtonProps?: FilterFormButtonProps
  resetButtonProps?: FilterFormButtonProps
  searchInput?: ReactNode
}

export const FilterForm = ({
  children,
  submitLabel = "검색",
  submitIcon,
  onReset,
  resetLabel = "초기화",
  searchInput,
  resetIcon,
  actionsClassName,
  submitButtonProps,
  resetButtonProps,
  ...props
}: FilterFormProps) => {
  return (
    <form {...props}>
      {children}
      <div className={cn("flex gap-2 w-full items-center", actionsClassName)}>
        {searchInput && (
          searchInput
        ) }
        <div className="flex gap-2">
        <Button {...submitButtonProps} type="submit">
          {submitIcon}
          {submitLabel}
        </Button>

        {onReset ? (
          <Button
            {...resetButtonProps}
            type="button"
            variant={resetButtonProps?.variant ?? "outline"}
            onClick={onReset}
          >
            {resetIcon}
            {resetLabel}
          </Button>
        ) : null}
        </div>
      </div>
    </form>
  )
}

export type { FilterFormProps }
