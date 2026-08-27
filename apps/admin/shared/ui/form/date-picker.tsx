"use client"

import * as React from "react"
import { ko } from "date-fns/locale"
import { CalendarDays } from "lucide-react"
import type { Matcher } from "react-day-picker"

import { dayjs } from "@/shared/lib/dayjs"
import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import { Calendar } from "@/shared/ui/calendar"
import { Label } from "@/shared/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/popover"
import { Typography } from "@/shared/ui/typography"

type DatePickerProps = {
  label: React.ReactNode
  value: string
  onValueChange: (value: string) => void
  id?: string
  placeholder?: string
  error?: string
  description?: string
  disabled?: boolean
  disabledDates?: Matcher | Matcher[]
  containerClassName?: string
}

const DatePicker = ({
  label,
  value,
  onValueChange,
  id = "date-picker",
  placeholder = "날짜를 선택해 주세요",
  error,
  description,
  disabled,
  disabledDates,
  containerClassName,
}: DatePickerProps) => {
  const [open, setOpen] = React.useState(false)
  const errorId = `${id}-error`
  const descriptionId = `${id}-description`
  const describedBy = error
    ? errorId
    : description
      ? descriptionId
      : undefined
  const selected = value ? dayjs(value).toDate() : undefined

  const handleSelect = (date: Date | undefined) => {
    onValueChange(date ? dayjs(date).format("YYYY-MM-DD") : "")

    if (date) {
      setOpen(false)
    }
  }

  return (
    <div className={cn("space-y-2", containerClassName)}>
      <Label htmlFor={id}>
        <Typography as="span" variant="label">
          {label}
        </Typography>
      </Label>

      <Popover open={open} onOpenChange={(nextOpen) => setOpen(nextOpen)}>
        <PopoverTrigger
          render={
            <Button
              id={id}
              type="button"
              variant="outline"
              aria-invalid={Boolean(error)}
              aria-describedby={describedBy}
              disabled={disabled}
              className={cn(
                "w-full justify-start bg-background font-normal",
                !value && "text-muted-foreground"
              )}
            />
          }
        >
          <CalendarDays aria-hidden="true" />
          {value ? dayjs(value).format("YYYY.MM.DD") : placeholder}
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            defaultMonth={selected}
            disabled={disabledDates}
            locale={ko}
          />
        </PopoverContent>
      </Popover>

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

export { DatePicker }
export type { DatePickerProps }
