"use client"

import { useForm } from "react-hook-form"

import type { OrderFilterFormValues } from "../model/types"

type UseOrderListFilterFormParams = {
  filters: OrderFilterFormValues
  onSubmitFilters: (filters: OrderFilterFormValues) => void
  onResetFilters: () => void
}

export const useOrderListFilterForm = ({
  filters,
  onSubmitFilters,
  onResetFilters,
}: UseOrderListFilterFormParams) => {
  const form = useForm<OrderFilterFormValues>({ values: filters })

  const onSubmit = form.handleSubmit((values) => {
    onSubmitFilters({
      keyword: values.keyword.trim(),
      status: values.status,
    })
  })

  const onReset = () => {
    form.reset({ keyword: "", status: "all" })
    onResetFilters()
  }

  return {
    form,
    onSubmit,
    onReset,
  }
}
