import type { Metadata } from "next"

import { getProductServer } from "@/entities/product/server"
import { ROUTES } from "@/shared/config/routes"
import {
  ProductDetailPage,
  type ProductDetailPageProps,
} from "@/widgets/product-detail"

export const generateMetadata = async ({
  params,
}: ProductDetailPageProps): Promise<Metadata> => {
  const { slug } = await params
  const product = await getProductServer(slug)

  if (!product) {
    return {
      title: "상품을 찾을 수 없습니다",
      robots: { index: false, follow: false },
      openGraph: { images: [] },
      twitter: { images: [] },
    }
  }

  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: ROUTES.products.detail(product.slug) },
    openGraph: {
      title: product.name,
      description: product.description,
      type: "website",
      images: [],
    },
    twitter: {
      card: "summary",
      title: product.name,
      description: product.description,
      images: [],
    },
  }
}

const ProductPage = (props: ProductDetailPageProps) => (
  <ProductDetailPage {...props} />
)

export default ProductPage
