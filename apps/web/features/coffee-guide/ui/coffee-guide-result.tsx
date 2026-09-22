import { ArrowRight, RotateCcw } from "lucide-react"
import Link from "next/link"

import { ProductCard, type Product } from "@/entities/product"
import { ROUTES } from "@/shared/config/routes"
import { Button, buttonVariants } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"

type CoffeeGuideResultProps = {
  products: Product[] | undefined
  includesAlternativeBrew: boolean
  isPending: boolean
  isError: boolean
  onRetry: () => void
  onRestart: () => void
}

const CoffeeGuideResult = ({
  products,
  includesAlternativeBrew,
  isPending,
  isError,
  onRetry,
  onRestart,
}: CoffeeGuideResultProps) => {
  if (isPending) {
    return (
      <div role="status" className="py-12 text-center">
        <div className="mx-auto mb-5 size-10 animate-spin rounded-full border-2 border-coffee/20 border-t-coffee" aria-hidden="true" />
        <Typography tone="muted">지금 판매 중인 상품에서 취향에 맞는 커피를 찾고 있어요.</Typography>
      </div>
    )
  }

  if (isError) {
    return (
      <div role="alert" className="rounded-2xl bg-cream/60 px-6 py-12 text-center">
        <Typography as="h2" variant="title">추천 상품을 불러오지 못했어요.</Typography>
        <Typography tone="muted" className="mt-2">잠시 후 다시 시도해 주세요.</Typography>
        <Button type="button" variant="outline" className="mt-6" onClick={onRetry}>
          다시 불러오기
        </Button>
      </div>
    )
  }

  if (!products?.length) {
    return (
      <div className="rounded-2xl bg-cream/60 px-6 py-12 text-center">
        <Typography as="h2" variant="title">지금 추천할 수 있는 상품이 없어요.</Typography>
        <Typography tone="muted" className="mt-2">전체 상품에서 다른 커피를 둘러보세요.</Typography>
        <Link href={ROUTES.products.list} className={buttonVariants({ variant: "brand", className: "mt-6" })}>
          전체 상품 보기
        </Link>
      </div>
    )
  }

  return (
    <div aria-live="polite">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Typography variant="overline" tone="brand">YOUR COFFEE</Typography>
          <Typography as="h2" variant="sectionTitle" className="mt-2 text-2xl sm:text-3xl">
            취향에 맞는 커피를 찾았어요
          </Typography>
          <Typography tone="muted" className="mt-2">
            선택한 추출 방식과 풍미를 기준으로, 현재 구매 가능한 상품을 골랐어요.
          </Typography>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={onRestart}>
          <RotateCcw className="size-4" aria-hidden="true" />
          다시 테스트하기
        </Button>
      </div>

      {includesAlternativeBrew ? (
        <Typography tone="muted" className="mt-6 rounded-xl bg-cream/70 px-4 py-3">
          선택한 방식의 디카페인 상품이 부족해 다른 방식의 상품도 함께 추천했어요.
        </Typography>
      ) : null}

      <div className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Link
        href={ROUTES.products.list}
        className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-coffee underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coffee"
      >
        전체 상품도 둘러보기
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </div>
  )
}

export { CoffeeGuideResult }
