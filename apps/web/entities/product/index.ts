export {
  PRODUCT_CATEGORIES,
  PRODUCT_CATEGORY_LABELS,
} from "./config/product-category"
export { getProducts } from "./api/product-client.api"
export type {
  Product,
  ProductCategory,
  ProductListFilters,
  ProductListResponse,
  ProductTone,
} from "./model/types"
export { ProductCard } from "./ui/product-card"
export { ProductVisual } from "./ui/product-visual"
