import {
  ArrowLeft,
  ChevronRight,
  PackageCheck,
  Sparkles,
  Truck,
} from "lucide-react"
import Link from "next/link"

import {
  ProductVisual,
  type Product,
} from "@/entities/product"
import { AddToCart } from "@/features/cart"
import { ROUTES } from "@/shared/config/routes"
import { formatWon } from "@/shared/lib/currency"
import { buttonVariants } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"

import { useProductDetail } from "../lib/use-product-detail"

const PRODUCT_BENEFITS = [
  {
    icon: Sparkles,
    title: "좋은 상태 그대로",
    description: "제품의 개성이 잘 전해지도록 꼼꼼하게 준비합니다.",
  },
  {
    icon: PackageCheck,
    title: "안전한 포장",
    description: "배송 중 제품이 손상되지 않도록 세심하게 포장합니다.",
  },
  {
    icon: Truck,
    title: "무료배송 혜택",
    description: "50,000원 이상 주문하면 배송비가 무료입니다.",
  },
] as const

export const ProductDetail = ({ product }: { product: Product }) => {
  const { categoryLabel, stockLabel } = useProductDetail(product)

  return (
    <article>
      <div className="border-b border-ink/10 px-5 py-4 sm:px-8 lg:px-12">
        <nav
          className="mx-auto flex max-w-[90rem] items-center gap-2 text-xs text-ink/50"
          aria-label="현재 위치"
        >
          <Link
            href={ROUTES.products.list}
            className="transition-colors hover:text-coffee focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coffee"
          >
            전체 상품
          </Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <span className="truncate text-ink/75" aria-current="page">
            {product.name}
          </span>
        </nav>
      </div>

      <section className="px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-[90rem] gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)] lg:items-center lg:gap-16">
          <div className="relative grid min-h-[28rem] place-items-center overflow-hidden rounded-[2rem] bg-cream/70 px-8 py-14 sm:min-h-[38rem]">
            <div className="absolute -right-28 -top-28 size-72 rounded-full border-[4.5rem] border-paper/65" />
            <div className="absolute -bottom-24 -left-20 size-56 rounded-full border-[3.5rem] border-[#e6d5bd]/80" />
            {product.badge ? (
              <span className="absolute left-6 top-6 z-10 rounded-full bg-paper px-4 py-2 text-[0.65rem] font-bold tracking-[0.13em] shadow-sm">
                {product.badge}
              </span>
            ) : null}
            {product.soldOut ? (
              <span className="absolute right-6 top-6 z-10 rounded-full bg-ink px-4 py-2 text-[0.65rem] font-bold tracking-[0.1em] text-paper">
                SOLD OUT
              </span>
            ) : null}
            <ProductVisual
              tone={product.tone}
              label={product.label}
              size="detail"
              className="relative z-[1] -rotate-2"
            />
          </div>

          <div className="lg:py-8">
            <Typography variant="overline" tone="brand">
              {categoryLabel}
            </Typography>
            <Typography
              as="h1"
              variant="sectionTitle"
              className="mt-4 max-w-2xl text-pretty"
            >
              {product.name}
            </Typography>
            <Typography
              variant="bodyLarge"
              tone="muted"
              className="mt-5 max-w-xl"
            >
              {product.description}
            </Typography>

            {product.notes.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="주요 특징">
                {product.notes.map((note) => (
                  <li
                    key={note}
                    className="rounded-full border border-coffee/20 bg-cream/55 px-3 py-1.5 text-xs font-medium text-coffee"
                  >
                    {note}
                  </li>
                ))}
              </ul>
            ) : null}

            <p className="mt-9 text-2xl font-semibold tracking-[-0.03em]">
              {formatWon(product.price)}
            </p>

            <AddToCart product={product} />

            <dl className="mt-3 divide-y divide-ink/10 border-b border-ink/10 text-sm">
              <div className="flex items-center justify-between gap-6 py-4">
                <dt className="text-ink/50">상품 코드</dt>
                <dd className="font-medium">{product.label}</dd>
              </div>
              <div className="flex items-center justify-between gap-6 py-4">
                <dt className="text-ink/50">카테고리</dt>
                <dd className="font-medium">{categoryLabel}</dd>
              </div>
              <div className="flex items-center justify-between gap-6 py-4">
                <dt className="text-ink/50">판매 상태</dt>
                <dd
                  className={
                    product.soldOut
                      ? "font-semibold text-coral"
                      : "font-semibold text-leaf"
                  }
                >
                  {stockLabel}
                </dd>
              </div>
            </dl>

            <Link
              href={ROUTES.products.list}
              className={`${buttonVariants({ variant: "outline", size: "lg" })} mt-8`}
            >
              <ArrowLeft aria-hidden="true" />
              전체 상품으로
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-ink px-5 py-14 text-paper sm:px-8 sm:py-16 lg:px-12">
        <div className="mx-auto max-w-[90rem]">
          <Typography variant="overline" tone="inverse-muted">
            MORROW PROMISE
          </Typography>
          <Typography
            as="h2"
            variant="sectionTitle"
            tone="inverse"
            className="mt-3"
          >
            받는 순간까지 좋은 경험이 되도록
          </Typography>
          <div className="mt-10 grid gap-8 border-t border-paper/15 pt-9 md:grid-cols-3 md:gap-12">
            {PRODUCT_BENEFITS.map(({ icon: Icon, title, description }) => (
              <div key={title}>
                <Icon className="size-5 text-[#dca67d]" strokeWidth={1.7} />
                <h3 className="mt-5 text-base font-semibold">{title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-paper/60">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}
