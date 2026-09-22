import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { CoffeeGuideQuiz } from "@/features/coffee-guide"
import { ROUTES } from "@/shared/config/routes"
import { Typography } from "@/shared/ui/typography"

const CoffeeGuidePage = () => (
  <section className="min-h-[75svh] bg-cream/40 px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
    <div className="mx-auto max-w-5xl">
      <Link
        href={ROUTES.home}
        className="inline-flex items-center gap-2 text-sm font-semibold text-ink/65 hover:text-coffee focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coffee"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        홈으로
      </Link>
      <header className="mb-9 mt-8 sm:mb-11">
        <Typography variant="overline" tone="brand">
          COFFEE GUIDE
        </Typography>
        <Typography as="h1" variant="sectionTitle" className="mt-3">
          나에게 맞는 커피 찾기
        </Typography>
        <Typography tone="muted" className="mt-4 max-w-2xl">
          세 가지 질문에 답하면 지금 구매할 수 있는 커피 중에서 취향에 맞는 상품을 추천해드려요.
        </Typography>
      </header>
      <CoffeeGuideQuiz />
    </div>
  </section>
)

export { CoffeeGuidePage }
