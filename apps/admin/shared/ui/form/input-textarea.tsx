"use client"

import * as React from "react"

import { cn } from "@/shared/lib/utils"
import { Label } from "@/shared/ui/label"
import { Textarea, type TextareaProps } from "@/shared/ui/textarea"
import { Typography } from "@/shared/ui/typography"

type InputTextareaProps = TextareaProps & {
  label: React.ReactNode
  labelAction?: React.ReactNode
  labelHidden?: boolean
  containerClassName?: string
  description?: string
  error?: string
}

const InputTextarea = ({
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
}: InputTextareaProps) => {
  const textareaId = id ?? name
  const errorId = textareaId ? `${textareaId}-error` : undefined
  const descriptionId = textareaId ? `${textareaId}-description` : undefined
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
        <Label htmlFor={textareaId}>
          <Typography as="span" variant="label">
            {label}
          </Typography>
        </Label>
        {labelAction}
      </div>

      <Textarea
        {...props}
        id={textareaId}
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

export { InputTextarea }
export type { InputTextareaProps }
