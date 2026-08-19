"use client"

import * as React from "react"
import {
  useController,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { Checkbox, type CheckboxProps } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Typography } from "@/components/ui/typography"
import { cn } from "@/lib/utils"

type FormCheckboxProps<TFieldValues extends FieldValues> = Omit<
  CheckboxProps,
  "checked" | "defaultChecked" | "name" | "onCheckedChange"
> & {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label: React.ReactNode
  containerClassName?: string
}

function FormCheckbox<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  containerClassName,
  id = name,
  size = "md",
  ...props
}: FormCheckboxProps<TFieldValues>) {
  const { field, fieldState } = useController({ control, name })
  const {
    name: fieldName,
    value,
    onBlur,
    onChange,
  } = field
  const errorId = `${id}-error`

  return (
    <div className={cn("space-y-2", containerClassName)}>
      <Label
        htmlFor={id}
        className="w-fit cursor-pointer font-normal text-muted-foreground"
      >
        <Checkbox
          {...props}
          id={id}
          name={fieldName}
          size={size}
          checked={Boolean(value)}
          onBlur={onBlur}
          onCheckedChange={onChange}
          aria-invalid={fieldState.invalid}
          aria-describedby={fieldState.error ? errorId : undefined}
        />
        <Typography as="span" variant="bodySmall" tone="muted">
          {label}
        </Typography>
      </Label>

      {fieldState.error && (
        <Typography id={errorId} variant="caption" tone="destructive" role="alert">
          {fieldState.error.message}
        </Typography>
      )}
    </div>
  )
}

export { FormCheckbox }
export type { FormCheckboxProps }
