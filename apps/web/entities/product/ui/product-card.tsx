import Link from "next/link"

import { ROUTES } from "@/shared/config/routes"
import { formatWon } from "@/shared/lib/currency"

import { PRODUCT_CATEGORY_LABELS } from "../config/product-category"
import type { Product } from "../model/types"
import { ProductVisual } from "./product-visual"

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <article className="group min-w-0">
      <Link
        href={ROUTES.products.detail(product.slug)}
        className="block rounded-[1.5rem] outline-none focus-visible:ring-2 focus-visible:ring-coffee/50 focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
        aria-label={`${product.name} 상세 보기`}
      >
        <div className="relative grid aspect-[0.94] place-items-center overflow-hidden rounded-[1.5rem] bg-cream/65 p-6 sm:p-8">
          {product.badge ? (
            <span className="absolute left-4 top-4 z-10 rounded-full bg-paper px-3 py-1.5 text-[0.62rem] font-bold tracking-[0.12em] shadow-sm">
              {product.badge}
            </span>
          ) : null}
          {product.soldOut ? (
            <div className="absolute inset-0 z-20 grid place-items-center bg-ink/20 backdrop-blur-[1px]">
              <span className="rounded-full bg-ink px-4 py-2 text-xs font-bold tracking-[0.08em] text-paper">
                SOLD OUT
              </span>
            </div>
          ) : null}
          <ProductVisual
            tone={product.tone}
            label={product.label}
            className="transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-2"
          />
        </div>
        <div className="px-1 pt-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[0.65rem] font-bold tracking-[0.12em] text-coffee">
                {PRODUCT_CATEGORY_LABELS[product.category]}
              </p>
              <h2 className="mt-1 truncate text-base font-semibold tracking-[-0.025em]">
                {product.name}
              </h2>
            </div>
            <p className="shrink-0 pt-5 text-sm font-semibold">
              {formatWon(product.price)}
            </p>
          </div>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink/55">
            {product.description}
          </p>
          {product.notes.length > 0 ? (
            <p className="mt-2 truncate text-xs text-ink/45">
              {product.notes.join(" · ")}
            </p>
          ) : null}
        </div>
      </Link>
    </article>
  )
}
