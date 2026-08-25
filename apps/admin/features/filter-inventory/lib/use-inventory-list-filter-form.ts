"use client"

import { useForm } from "react-hook-form"

import type { InventoryFilterFormValues } from "../model/types"

type UseInventoryListFilterFormParams = {
  filters: InventoryFilterFormValues
  onSubmitFilters: (filters: InventoryFilterFormValues) => void
  onResetFilters: () => void
}

export const useInventoryListFilterForm = ({
  filters,
  onSubmitFilters,
  onResetFilters,
}: UseInventoryListFilterFormParams) => {
  const form = useForm<InventoryFilterFormValues>({ values: filters })

  const onSubmit = form.handleSubmit((values) => {
    onSubmitFilters({
      keyword: values.keyword.trim(),
      stockStatus: values.stockStatus,
    })
  })

  const onReset = () => {
    form.reset({ keyword: "", stockStatus: "all" })
    onResetFilters()
  }

  return {
    form,
    onSubmit,
    onReset,
  }
}
