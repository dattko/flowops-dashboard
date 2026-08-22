"use client"

import * as React from "react"

import { cn } from "@/shared/lib/utils"
import { Input, type InputProps } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Typography } from "@/shared/ui/typography"

type InputTextProps = InputProps & {
  label: React.ReactNode
  labelAction?: React.ReactNode
  labelHidden?: boolean
  containerClassName?: string
  description?: string
  error?: string
}

const InputText = ({
  label,
  labelAction,
  labelHidden = false,
  containerClassName,
  description,
  error,
  id,
  name,
  size = "md",
  ...props
}: InputTextProps) => {
  const inputId = id ?? name
  const errorId = inputId ? `${inputId}-error` : undefined
  const descriptionId = inputId ? `${inputId}-description` : undefined
  const describedBy = error
    ? errorId
    : description
      ? descriptionId
      : undefined

  return (
    <div className={cn("space-y-2", containerClassName)}>
      <div
        className={cn(
          "flex items-center justify-between gap-4",
          labelHidden && "sr-only"
        )}
      >
        <Label htmlFor={inputId}>
          <Typography as="span" variant="label">
            {label}
          </Typography>
        </Label>
        {labelAction}
      </div>

      <Input
        {...props}
        id={inputId}
        name={name}
        size={size}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
      />

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

export { InputText }
export type { InputTextProps }
