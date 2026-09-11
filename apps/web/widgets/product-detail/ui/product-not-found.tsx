import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { ROUTES } from "@/shared/config/routes"
import { buttonVariants } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"

export const ProductNotFound = () => (
  <section className="grid min-h-[65svh] place-items-center bg-cream/55 px-5 py-20 text-center">
    <div>
      <Typography variant="overline" tone="brand">
        PRODUCT NOT FOUND
      </Typography>
      <Typography as="h1" variant="sectionTitle" className="mt-4">
        상품을 찾을 수 없어요
      </Typography>
      <Typography variant="bodyLarge" tone="muted" className="mt-4">
        판매가 종료되었거나 주소가 변경된 상품일 수 있습니다.
      </Typography>
      <Link
        href={ROUTES.products.list}
        className={`${buttonVariants({ size: "lg" })} mt-8`}
      >
        <ArrowLeft aria-hidden="true" />
        전체 상품으로
      </Link>
    </div>
  </section>
)
