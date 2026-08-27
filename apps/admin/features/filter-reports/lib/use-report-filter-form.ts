"use client"

import { useForm } from "react-hook-form"

import type { ReportFilterFormValues, ReportFilters } from "../model/types"

type UseReportFilterFormParams = {
  filters: ReportFilters
  onSubmitFilters: (filters: ReportFilters) => void
  onResetFilters: () => void
}

const useReportFilterForm = ({
  filters,
  onSubmitFilters,
  onResetFilters,
}: UseReportFilterFormParams) => {
  const form = useForm<ReportFilterFormValues>({ values: filters })
  const onSubmit = form.handleSubmit(onSubmitFilters)
  const onReset = () => {
    onResetFilters()
  }

  return {
    form,
    onSubmit,
    onReset,
  }
}

export { useReportFilterForm }
