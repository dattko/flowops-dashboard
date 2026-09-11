import { notFound } from "next/navigation"

import { getProductServer } from "@/entities/product/server"

import { ProductDetail } from "./product-detail"

export type ProductDetailPageProps = {
  params: Promise<{ slug: string }>
}

export const ProductDetailPage = async ({
  params,
}: ProductDetailPageProps) => {
  const { slug } = await params
  const product = await getProductServer(slug)

  if (!product) notFound()

  return <ProductDetail product={product} />
}
