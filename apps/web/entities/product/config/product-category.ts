import type { ProductCategory } from "../model/types"

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  "whole-bean": "원두",
  "drip-bag": "드립백",
  capsule: "캡슐",
  "cold-brew": "콜드브루",
  gear: "홈카페 용품",
}

export const PRODUCT_CATEGORIES = Object.entries(PRODUCT_CATEGORY_LABELS).map(
  ([value, label]) => ({ value: value as ProductCategory, label }),
)
