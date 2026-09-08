"use client"

import { useForm } from "react-hook-form"

import type { ProductSort, ProductSortFormValues } from "../model/types"

type UseProductListSortFormParams = {
  value: ProductSort
  onValueChange: (value: ProductSort) => void
}

export const useProductListSortForm = ({
  value,
  onValueChange,
}: UseProductListSortFormParams) => {
  const form = useForm<ProductSortFormValues>({
    values: { sort: value },
  })

  return {
    form,
    onSortChange: onValueChange,
  }
}
