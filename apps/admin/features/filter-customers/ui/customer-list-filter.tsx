"use client"

import { FilterForm, InputText, Select } from "@/shared/ui/form"

import { useCustomerListFilterForm } from "../lib/use-customer-list-filter-form"
import { CUSTOMER_STATUS_FILTER_OPTIONS } from "../model/constants"
import type { CustomerFilterFormValues } from "../model/types"

type CustomerListFilterProps = {
  filters: CustomerFilterFormValues
  onSubmitFilters: (filters: CustomerFilterFormValues) => void
  onResetFilters: () => void
}

const CustomerListFilter = ({
  filters,
  onSubmitFilters,
  onResetFilters,
}: CustomerListFilterProps) => {
  const { form, onSubmit, onReset } = useCustomerListFilterForm({
    filters,
    onSubmitFilters,
    onResetFilters,
  })

  return (
    <FilterForm
      onSubmit={onSubmit}
      onReset={onReset}
      className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
    >
      <InputText
        {...form.register("keyword")}
        label="고객 검색어"
        labelHidden
        containerClassName="min-w-0 flex-1 sm:max-w-md"
        placeholder="이름, 이메일 또는 연락처 검색"
      />
      <Select
        {...form.register("status")}
        label="고객 상태"
        labelHidden
        options={CUSTOMER_STATUS_FILTER_OPTIONS}
        containerClassName="sm:w-44"
      />
    </FilterForm>
  )
}

export { CustomerListFilter }
