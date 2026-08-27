"use client"

import { CalendarDays } from "lucide-react"
import { Controller } from "react-hook-form"

import { dayjs } from "@/shared/lib/dayjs"
import { DatePicker, FilterForm } from "@/shared/ui/form"

import { useReportFilterForm } from "../lib/use-report-filter-form"
import type { ReportFilters } from "../model/types"

type ReportFilterProps = {
  filters: ReportFilters
  onSubmitFilters: (filters: ReportFilters) => void
  onResetFilters: () => void
  isFetching?: boolean
}

const ReportFilter = ({
  filters,
  onSubmitFilters,
  onResetFilters,
  isFetching,
}: ReportFilterProps) => {
  const { form, onSubmit, onReset } = useReportFilterForm({
    filters,
    onSubmitFilters,
    onResetFilters,
  })
  const dateFrom = form.watch("dateFrom")
  const dateTo = form.watch("dateTo")

  return (
    <FilterForm
      onSubmit={onSubmit}
      onReset={onReset}
      submitLabel="조회"
      submitIcon={<CalendarDays aria-hidden="true" />}
      isSubmitting={isFetching}
      className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-start"
      actionsClassName="sm:pt-7"
    >
      <Controller
        name="dateFrom"
        control={form.control}
        rules={{
          required: "시작일을 선택해 주세요.",
        }}
        render={({ field, fieldState }) => (
          <DatePicker
            id="report-date-from"
            label="시작일"
            value={field.value}
            onValueChange={field.onChange}
            error={fieldState.error?.message}
            disabledDates={dateTo ? { after: dayjs(dateTo).toDate() } : undefined}
            containerClassName="sm:w-48"
          />
        )}
      />
      <Controller
        name="dateTo"
        control={form.control}
        rules={{
          required: "종료일을 선택해 주세요.",
          validate: (value) =>
            value >= form.getValues("dateFrom") ||
            "종료일은 시작일보다 빠를 수 없습니다.",
        }}
        render={({ field, fieldState }) => (
          <DatePicker
            id="report-date-to"
            label="종료일"
            value={field.value}
            onValueChange={field.onChange}
            error={fieldState.error?.message}
            disabledDates={
              dateFrom ? { before: dayjs(dateFrom).toDate() } : undefined
            }
            containerClassName="sm:w-48"
          />
        )}
      />
    </FilterForm>
  )
}

export { ReportFilter }
