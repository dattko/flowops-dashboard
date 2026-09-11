import {
  PRODUCT_CATEGORY_LABELS,
  type Product,
} from "@/entities/product"

const getStockLabel = (product: Product) => {
  if (product.soldOut) return "현재 품절"
  if (product.available <= 5) return `품절 임박 · ${product.available}개 남음`
  return "지금 주문 가능"
}

const useProductDetail = (product: Product) => {
  return {
    categoryLabel: PRODUCT_CATEGORY_LABELS[product.category],
    stockLabel: getStockLabel(product),
  }
}

export { useProductDetail }
