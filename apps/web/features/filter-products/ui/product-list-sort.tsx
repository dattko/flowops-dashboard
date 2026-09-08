"use client"

import { FormSelect } from "@/shared/ui/form"

import { useProductListSortForm } from "../lib/use-product-list-sort-form"
import { PRODUCT_SORT_OPTIONS } from "../model/constants"
import type { ProductSort, ProductSortFormValues } from "../model/types"

type ProductListSortProps = {
  value: ProductSort
  onValueChange: (value: ProductSort) => void
}

export const ProductListSort = ({
  value,
  onValueChange,
}: ProductListSortProps) => {
  const { form, onSortChange } = useProductListSortForm({
    value,
    onValueChange,
  })
  console.log(value)
  return (
    <FormSelect<ProductSortFormValues, ProductSort>
      control={form.control}
      name="sort"
      label="상품 정렬"
      labelHidden
      options={PRODUCT_SORT_OPTIONS}
      containerClassName="min-w-36"
      triggerClassName="h-10 rounded-full border-ink/15 bg-paper px-4"
      onValueChange={onSortChange}
    />
  )
}
