"use client"

import { useForm } from "react-hook-form"

import type { CustomerFilterFormValues } from "../model/types"

type UseCustomerListFilterFormParams = {
  filters: CustomerFilterFormValues
  onSubmitFilters: (filters: CustomerFilterFormValues) => void
  onResetFilters: () => void
}

const useCustomerListFilterForm = ({
  filters,
  onSubmitFilters,
  onResetFilters,
}: UseCustomerListFilterFormParams) => {
  const form = useForm<CustomerFilterFormValues>({ values: filters })
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

export { useCustomerListFilterForm }
