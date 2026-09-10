"use client"

import { useForm, useWatch } from "react-hook-form"

import type {
  ProductCategoryFilter,
  ProductFilterFormValues,
} from "../model/types"
import { DEFAULT_PRODUCT_LIST_FILTERS } from "../model/product-filter-params"

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
    form.reset({
      keyword: DEFAULT_PRODUCT_LIST_FILTERS.keyword,
      category: DEFAULT_PRODUCT_LIST_FILTERS.category,
    })
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
