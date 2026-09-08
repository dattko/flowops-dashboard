"use client"

import { useForm, useWatch } from "react-hook-form"

import type {
  ProductCategoryFilter,
  ProductFilterFormValues,
} from "../model/types"

type UseProductListFilterFormParams = {
  filters: ProductFilterFormValues
  onSubmitFilters: (filters: ProductFilterFormValues) => void
  onResetFilters: () => void
}

export const useProductListFilterForm = ({
  filters,
  onSubmitFilters,
  onResetFilters,
}: UseProductListFilterFormParams) => {
  const form = useForm<ProductFilterFormValues>({ values: filters })
  const selectedCategory = useWatch({
    control: form.control,
    name: "category",
  })

  const submitValues = (values: ProductFilterFormValues) => {
    onSubmitFilters({ ...values, keyword: values.keyword.trim() })
  }

  const onSubmit = form.handleSubmit(submitValues)

  const onCategoryChange = (category: ProductCategoryFilter) => {
    form.setValue("category", category)
    submitValues({ ...form.getValues(), category })
  }

  const onReset = () => {
    form.reset({ keyword: "", category: "all" })
    onResetFilters()
  }

  return {
    form,
    selectedCategory,
    onSubmit,
    onCategoryChange,
    onReset,
  }
}
