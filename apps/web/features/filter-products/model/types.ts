import type { ProductCategory } from "@/entities/product"

export type ProductCategoryFilter = "all" | ProductCategory

export type ProductSort = "featured" | "price-asc" | "price-desc" | "name"

export type ProductFilterFormValues = {
  keyword: string
  category: ProductCategoryFilter
}

export type ProductSortFormValues = {
  sort: ProductSort
}
