"use client"

import { FilterForm, InputText, Select } from "@/shared/ui/form"

import { useInventoryListFilterForm } from "../lib/use-inventory-list-filter-form"
import { INVENTORY_STOCK_STATUS_FILTER_OPTIONS } from "../model/constants"
import type { InventoryFilterFormValues } from "../model/types"

type InventoryListFilterProps = {
  filters: InventoryFilterFormValues
  onSubmitFilters: (filters: InventoryFilterFormValues) => void
  onResetFilters: () => void
}

const InventoryListFilter = ({
  filters,
  onSubmitFilters,
  onResetFilters,
}: InventoryListFilterProps) => {
  const { form, onSubmit, onReset } = useInventoryListFilterForm({
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
        label="재고 검색어"
        labelHidden
        containerClassName="min-w-0 flex-1 sm:max-w-md"
        placeholder="원두·홈카페 상품명 또는 SKU 검색"
      />

      <Select
        {...register("stockStatus")}
        label="재고 상태"
        labelHidden
        options={INVENTORY_STOCK_STATUS_FILTER_OPTIONS}
        containerClassName="sm:w-44"
      />
    </FilterForm>
  )
}

export { InventoryListFilter }
