"use client"

import { RotateCcw, Search } from "lucide-react"

import { FilterForm, InputText, Select } from "@/shared/ui/form"

import { useOrderListFilterForm } from "../lib/use-order-list-filter-form"
import { ORDER_STATUS_FILTER_OPTIONS } from "../model/constants"
import type { OrderFilterFormValues } from "../model/types"

type OrderListFilterProps = {
  filters: OrderFilterFormValues
  onSubmitFilters: (filters: OrderFilterFormValues) => void
  onResetFilters: () => void
}

export const OrderListFilter = ({
  filters,
  onSubmitFilters,
  onResetFilters,
}: OrderListFilterProps) => {
  const { form, onSubmit, onReset } = useOrderListFilterForm({
    filters,
    onSubmitFilters,
    onResetFilters,
  })
  const { register } = form

  return (
    <FilterForm
      onSubmit={onSubmit}
      className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
      onReset={onReset}
    >
      <InputText
        {...register("keyword")}
        label="주문 검색어"
        labelHidden
        containerClassName="min-w-0 flex-1 sm:max-w-md"
        placeholder="주문번호, 고객명, 이메일, 상품명 검색"
      />

      <Select
        {...register("status")}
        label="주문 상태"
        labelHidden
        options={ORDER_STATUS_FILTER_OPTIONS}
        containerClassName="sm:w-36"
      />

    </FilterForm>
  )
}
