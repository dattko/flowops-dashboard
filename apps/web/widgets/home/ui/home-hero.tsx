import { ArrowDown, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

import { ROUTES } from "@/shared/config/routes"
import { cn } from "@/shared/lib/utils"
import { buttonVariants } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"

import { CoffeeBag } from "./coffee-bag"

export const HomeHero = () => (
  <section className="relative isolate min-h-[calc(100svh-6.5rem)] overflow-hidden bg-cream px-5 sm:px-8 lg:px-12">
    <div className="absolute -right-28 -top-36 -z-10 size-[34rem] rounded-full border-[6rem] border-paper/50" />
    <div className="absolute -bottom-64 left-[38%] -z-10 size-[38rem] rounded-full border-[8rem] border-[#e8dac6]/80" />
    <div className="mx-auto grid min-h-[calc(100svh-6.5rem)] max-w-[90rem] items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-12">
      <div className="max-w-3xl">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper/55 px-4 py-2 text-xs font-semibold tracking-[0.05em]">
          <Sparkles className="size-3.5 text-coffee" aria-hidden="true" />
          9월의 새로운 커피가 도착했어요
        </div>
        <Typography as="h1" variant="hero">
          매일의 리듬을
          <br />
          위한 커피
          <span className="text-coral">.</span>
        </Typography>
        <Typography variant="bodyLarge" tone="muted" className="mt-8 max-w-lg">
          선명한 향미, 편안한 균형. 오늘의 기분과 취향에 맞는 스페셜티
          커피를 골라보세요.
        </Typography>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href={ROUTES.products.list}
            className={cn(
              buttonVariants({ size: "lg" }),
              "group hover:-translate-y-0.5",
            )}
          >
            커피 둘러보기
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
          <Link
            href={ROUTES.homeGuide}
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            내 취향 찾기
          </Link>
        </div>
      </div>

      <div className="relative flex min-h-[28rem] items-center justify-center lg:min-h-[38rem]">
        <div className="absolute left-[5%] top-[18%] size-24 rounded-full bg-coral/80 blur-[1px] sm:size-32" />
        <div className="absolute bottom-[12%] right-[4%] size-32 rounded-full border-[1.8rem] border-leaf/85 sm:size-44 sm:border-[2.4rem]" />
        <div className="absolute left-[9%] top-[14%] z-20 rotate-[-9deg] rounded-full bg-paper px-4 py-2 text-xs font-semibold shadow-lg">
          ROASTED WEEKLY
        </div>
        <Link
          href={ROUTES.products.detail("bean-house-200")}
          className="relative z-10 w-full rotate-[4deg] rounded-[1.5rem] outline-none transition-transform duration-500 hover:rotate-0 focus-visible:ring-2 focus-visible:ring-coffee/50 focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
          aria-label="모로우 하우스 블렌드 상세 보기"
        >
          <CoffeeBag tone="bg-coffee" label="HOUSE BLEND 250G" size="large" />
        </Link>
        <div className="absolute bottom-[8%] left-[5%] z-20 max-w-44 rounded-2xl bg-paper p-4 shadow-[0_18px_40px_rgba(38,29,22,0.12)] sm:left-[12%]">
          <p className="text-[0.65rem] font-bold tracking-[0.14em] text-coffee">
            TASTING NOTE
          </p>
          <p className="mt-2 text-sm font-semibold leading-5">
            캐러멜의 단맛과 고소한 여운
          </p>
        </div>
      </div>
    </div>
    <Link
      href={ROUTES.homeCoffee}
      className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-[0.62rem] font-semibold tracking-[0.16em] text-ink/50 lg:flex"
    >
      SCROLL
      <ArrowDown className="size-4" aria-hidden="true" />
    </Link>
  </section>
)
