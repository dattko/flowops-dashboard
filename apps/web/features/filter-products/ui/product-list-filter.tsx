"use client"

import { RotateCcw, Search } from "lucide-react"

import { PRODUCT_CATEGORIES } from "@/entities/product"
import { Button } from "@/shared/ui/button"
import { FilterForm, InputText } from "@/shared/ui/form"

import { useProductListFilterForm } from "../lib/use-product-list-filter-form"
import { DEFAULT_PRODUCT_LIST_FILTERS } from "../model/product-filter-params"
import type { ProductFilterFormValues } from "../model/types"

type ProductListFilterProps = {
  filters: ProductFilterFormValues
  hasActiveFilters: boolean
  onSubmitFilters: (filters: ProductFilterFormValues) => void
  onResetFilters: () => void
}

export const ProductListFilter = ({
  filters,
  hasActiveFilters,
  onSubmitFilters,
  onResetFilters,
}: ProductListFilterProps) => {
  const {
    form,
    selectedCategory,
    onSubmit,
    onCategoryChange,
    onReset,
  } = useProductListFilterForm({
    filters,
    onSubmitFilters,
    onResetFilters,
  })
  const { register } = form

  return (
    <FilterForm
      onSubmit={onSubmit}
      onReset={hasActiveFilters ? onReset : undefined}
      submitIcon={<Search aria-hidden="true" />}
      resetIcon={<RotateCcw aria-hidden="true" />}
      className="flex flex-col gap-6 border-b border-ink/10 pb-8"
      submitButtonProps={{ size: "sm" }}
      resetButtonProps={{ size: "sm" }}
      searchInput={
        <InputText
        {...register("keyword")}
        type="search"
        label="상품 검색"
        labelHidden
        placeholder="상품을 입력해 주세요"
        containerClassName="w-full sm:max-w-sm"
        className="h-11 rounded-full border-ink/15 bg-paper"
      />
      }
    >
      <input type="hidden" {...register("category")} />
      <div className="flex flex-wrap gap-2" aria-label="상품 카테고리">
        <Button
          type="button"
          size="sm"
          variant={
            selectedCategory === DEFAULT_PRODUCT_LIST_FILTERS.category
              ? "default"
              : "outline"
          }
          onClick={() =>
            onCategoryChange(DEFAULT_PRODUCT_LIST_FILTERS.category)
          }
          aria-pressed={
            selectedCategory === DEFAULT_PRODUCT_LIST_FILTERS.category
          }
        >
          전체
        </Button>
        {PRODUCT_CATEGORIES.map((item) => (
          <Button
            key={item.value}
            type="button"
            size="sm"
            variant={selectedCategory === item.value ? "default" : "outline"}
            onClick={() => onCategoryChange(item.value)}
            aria-pressed={selectedCategory === item.value}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </FilterForm>
  )
}
