"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/shared/lib/utils"
import { Label } from "@/shared/ui/label"
import { Typography } from "@/shared/ui/typography"

export type SelectOption<TValue extends string = string> = {
  label: React.ReactNode
  value: TValue
  disabled?: boolean
}

type SelectProps<TValue extends string = string> = Omit<
  React.ComponentProps<"select">,
  "value" | "defaultValue" | "size"
> & {
  label: React.ReactNode
  options: readonly SelectOption<TValue>[]
  value?: TValue
  defaultValue?: TValue
  onValueChange?: (value: TValue) => void
  labelHidden?: boolean
  containerClassName?: string
  description?: string
  error?: string
  size?: "sm" | "md" | "lg"
}

const selectSizeClassNames = {
  sm: "h-8 pl-2.5 pr-8 text-xs",
  md: "h-10 pl-3 pr-9 text-sm",
  lg: "h-11 pl-3.5 pr-10 text-base md:text-sm",
} as const

export const Select = <TValue extends string = string>({
  label,
  options,
  value,
  defaultValue,
  onValueChange,
  onChange,
  labelHidden = false,
  containerClassName,
  description,
  error,
  size = "md",
  id,
  name,
  className,
  ...props
}: SelectProps<TValue>) => {
  const selectId = id ?? name
  const errorId = selectId ? `${selectId}-error` : undefined
  const descriptionId = selectId ? `${selectId}-description` : undefined
  const describedBy = error
    ? errorId
    : description
      ? descriptionId
      : undefined

  return (
    <div className={cn("space-y-2", containerClassName)}>
      <div className={cn(labelHidden && "sr-only")}>
        <Label htmlFor={selectId}>
          <Typography as="span" variant="label">
            {label}
          </Typography>
        </Label>
      </div>

      <div className="relative">
        <select
          {...props}
          id={selectId}
          name={name}
          value={value}
          defaultValue={defaultValue}
          onChange={(event) => {
            onChange?.(event)
            onValueChange?.(event.target.value as TValue)
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(
            "w-full appearance-none rounded-lg border border-input bg-white outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
            selectSizeClassNames[size],
            className
          )}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
      </div>

      {error ? (
        <Typography id={errorId} variant="caption" tone="destructive" role="alert">
          {error}
        </Typography>
      ) : description ? (
        <Typography id={descriptionId} variant="caption" tone="muted">
          {description}
        </Typography>
      ) : null}
    </div>
  )
}

export type { SelectProps }
