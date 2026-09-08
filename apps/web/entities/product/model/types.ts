export type ProductCategory =
  | "whole-bean"
  | "drip-bag"
  | "capsule"
  | "cold-brew"
  | "gear"

export type ProductTone =
  | "terracotta"
  | "forest"
  | "sand"
  | "navy"
  | "plum"
  | "mustard"
  | "sage"
  | "charcoal"

export type Product = {
  id: string
  slug: string
  name: string
  description: string
  category: ProductCategory
  price: number
  available: number
  notes: string[]
  label: string
  tone: ProductTone
  badge?: string
  soldOut?: boolean
}

export type ProductListFilters = {
  page: number
  pageSize: number
  keyword: string
  category: "all" | ProductCategory
  sort: "featured" | "price-asc" | "price-desc" | "name"
}

export type ProductListResponse = {
  items: Product[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
}
