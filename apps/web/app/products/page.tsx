import type { Metadata } from "next"

import { ProductList, type ProductListProps } from "@/widgets/product-list"

export const metadata: Metadata = {
  title: "전체 상품",
  description:
    "모로우 커피의 원두, 드립백, 캡슐, 콜드브루와 홈카페 용품을 만나보세요.",
}

const ProductsPage = ({ searchParams }: ProductListProps) => (
  <ProductList searchParams={searchParams} />
)

export default ProductsPage
