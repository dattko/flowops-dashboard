import type { ProductSort } from "./types"

export const PRODUCT_SORT_LABELS: Record<ProductSort, string> = {
  featured: "추천순",
  "price-asc": "낮은 가격순",
  "price-desc": "높은 가격순",
  name: "이름순",
}

export const PRODUCT_SORT_OPTIONS = Object.entries(PRODUCT_SORT_LABELS).map(
  ([value, label]) => ({ value: value as ProductSort, label }),
)
